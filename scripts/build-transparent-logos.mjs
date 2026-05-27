/**
 * Builds platform logo PNGs on a solid white background from JPEG sources.
 * Run: npm run build:logos
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve('public/assets/platform');
const SOURCE = path.join(ROOT, 'sources');
const WHITE = { r: 255, g: 255, b: 255 };
const LOGO_CANVAS_W = 280;
const LOGO_CANVAS_H = 48;

function isBrandPixel(r, g, b, brand) {
    if (brand === 'twilio') {
        return r > 150 && r > g + 35 && r > b + 35;
    }
    if (brand === 'fastapi') {
        return g > 70 && g >= r && g >= b && r < 140;
    }
    if (brand === 'azure') {
        return b > 80 && b >= r && b >= g;
    }
    if (brand === 'foundry') {
        return (
            (b > 90 && r < 220) ||
            (r > 130 && b > 90) ||
            (r > 180 && g < 120) ||
            (g > 80 && b > 80 && r < 160)
        );
    }
    return false;
}

function shouldFlattenToWhite(r, g, b, brand) {
    if (isBrandPixel(r, g, b, brand)) return false;
    const sum = r + g + b;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (brand === 'foundry' && max < 120 && max - min < 35 && max > 20) {
        return false;
    }
    if (max < 110) return true;
    if (sum < 200 && max < 160) return true;
    return false;
}

async function flattenOnWhite(inputBuffer, brand) {
    const { data, info } = await sharp(inputBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (shouldFlattenToWhite(r, g, b, brand)) {
            data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
            data[i + 3] = 255;
            continue;
        }

        const a = data[i + 3] / 255;
        data[i] = Math.round(r * a + 255 * (1 - a));
        data[i + 1] = Math.round(g * a + 255 * (1 - a));
        data[i + 2] = Math.round(b * a + 255 * (1 - a));
        data[i + 3] = 255;
    }

    return sharp(data, {
        raw: { width: info.width, height: info.height, channels: 4 },
    })
        .png()
        .toBuffer();
}

async function fitToLogoCanvas(inputBuffer, outputPath, canvasW = LOGO_CANVAS_W, canvasH = LOGO_CANVAS_H) {
    const trimmed = await sharp(inputBuffer).trim({ threshold: 20 }).toBuffer();
    const meta = await sharp(trimmed).metadata();
    const scale = Math.min(
        (canvasW - 4) / meta.width,
        (canvasH - 4) / meta.height,
    );
    const w = Math.round(meta.width * scale);
    const h = Math.round(meta.height * scale);
    const left = Math.round((canvasW - w) / 2);
    const top = Math.round((canvasH - h) / 2);

    await sharp(trimmed)
        .resize(w, h, { fit: 'inside', background: WHITE, kernel: sharp.kernel.lanczos3 })
        .sharpen({ sigma: 0.6, m1: 0.5, m2: 0.25 })
        .extend({
            top,
            bottom: canvasH - h - top,
            left,
            right: canvasW - w - left,
            background: WHITE,
        })
        .flatten({ background: WHITE })
        .png()
        .toFile(outputPath);

    const out = await sharp(outputPath).metadata();
    console.log(`  ${path.basename(outputPath)} → ${out.width}×${out.height}`);
}

async function jpegToWhitePng(inputPath, outputPath, brand) {
    const flattened = await flattenOnWhite(await sharp(inputPath).toBuffer(), brand);
    await fitToLogoCanvas(flattened, outputPath);
}

async function normalizeIconMark(inputPath, outputPath, brand = 'azure') {
    const trimmedBuf = await flattenOnWhite(await sharp(inputPath).toBuffer(), brand);
    await fitToLogoCanvas(trimmedBuf, outputPath);
}

/** Snap Foundry wordmark to solid black before downscale (stops grey halos) */
async function binarizeFoundryText(inputBuffer) {
    const { data, info } = await sharp(inputBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (isBrandPixel(r, g, b, 'foundry')) continue;

        const max = Math.max(r, g, b);
        if (max < 210) {
            data[i] = 23;
            data[i + 1] = 23;
            data[i + 2] = 23;
            data[i + 3] = 255;
        }
    }

    return sharp(data, {
        raw: { width: info.width, height: info.height, channels: 4 },
    })
        .png()
        .toBuffer();
}

/** Official brand PNGs (transparent) → white canvas */
async function brandPngToCanvas(inputPath, outputPath, brand) {
    let flattened = await sharp(inputPath).flatten({ background: WHITE }).png().toBuffer();

    if (brand === 'azure') {
        flattened = await flattenOnWhite(flattened, brand);
        await fitToLogoCanvas(flattened, outputPath);
        return;
    }

    if (brand === 'foundry') {
        flattened = await binarizeFoundryText(flattened);
        await fitToLogoCanvas(flattened, outputPath, LOGO_CANVAS_W * 2, LOGO_CANVAS_H * 2);
        return;
    }

    await fitToLogoCanvas(flattened, outputPath);
}

const jobs = [
    ['twilio.jpg', 'twilio.png', 'twilio'],
    ['fastapi.jpg', 'fastapi.png', 'fastapi'],
];

const brandPngJobs = [
    ['azure-brand.png', 'azure.png', 'azure'],
    ['azure-ai-foundry-brand.png', 'azure-ai-foundry.png', 'foundry'],
];

console.log('Building white-background platform logos…');
fs.mkdirSync(SOURCE, { recursive: true });

for (const [input, output, brand] of jobs) {
    const inSource = path.join(SOURCE, input);
    const inRoot = path.join(ROOT, input);
    const inPath = fs.existsSync(inSource) ? inSource : inRoot;
    const outPath = path.join(ROOT, output);

    if (!fs.existsSync(inPath)) {
        console.warn(`  skip (missing): ${input}`);
        continue;
    }

    if (inPath === inRoot && !fs.existsSync(inSource)) {
        fs.copyFileSync(inRoot, inSource);
    }

    await jpegToWhitePng(inPath, outPath, brand);
}

for (const [input, output, brand] of brandPngJobs) {
    const inPath = path.join(SOURCE, input);
    const outPath = path.join(ROOT, output);
    if (!fs.existsSync(inPath)) {
        console.warn(`  skip (missing): ${input}`);
        continue;
    }
    await brandPngToCanvas(inPath, outPath, brand);
}

console.log('Done.');
