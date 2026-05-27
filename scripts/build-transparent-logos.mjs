/**
 * Builds hi-res platform logo PNGs (840×144) on white from scripts/logo-sources/*.png.
 * Run: npm run build:logos
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve('public/assets/platform');
const ICON_ROOT = path.resolve('src/assets/platform');
const SOURCE = path.resolve('scripts/logo-sources');
const WHITE = { r: 255, g: 255, b: 255 };
/** 3× layout size (220×44px) for sharp logos on retina displays */
const LOGO_CANVAS_W = 840;
const LOGO_CANVAS_H = 144;

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
    const chroma = max - min;

    // HQ Foundry asset: wordmark is near-black (1–15) on pure-black (#000) bg
    if (brand === 'foundry') {
        if (max === 0) return true;
        if (max > 0 && max < 120 && chroma < 40) return false;
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

/** Official brand PNGs (transparent or dark background) → white canvas */
async function brandPngToCanvas(inputPath, outputPath, brand) {
    const flattened = await flattenOnWhite(await sharp(inputPath).ensureAlpha().toBuffer(), brand);
    await fitToLogoCanvas(flattened, outputPath);
}

/** Soft matte from dark/neutral background — preserves anti-aliased edges (no halos). */
async function compositeOnWhiteSoft(inputBuffer, bgCutoff = 16, edgeSpan = 48) {
    const { data, info } = await sharp(inputBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const chroma = max - min;

        let alpha = 1;
        if (max <= bgCutoff) {
            alpha = 0;
        } else if (max < bgCutoff + edgeSpan && chroma < 32) {
            alpha = (max - bgCutoff) / edgeSpan;
        }

        const srcA = (data[i + 3] / 255) * alpha;
        data[i] = Math.round(r * srcA + 255 * (1 - srcA));
        data[i + 1] = Math.round(g * srcA + 255 * (1 - srcA));
        data[i + 2] = Math.round(b * srcA + 255 * (1 - srcA));
        data[i + 3] = 255;
    }

    return sharp(data, {
        raw: { width: info.width, height: info.height, channels: 4 },
    })
        .png()
        .toBuffer();
}

/** Foundry mark: HQ source → white matte, no harsh pixel classification */
async function brandFoundryIcon(inputPath, outputPath, size = 288) {
    const flattened = await compositeOnWhiteSoft(await sharp(inputPath).ensureAlpha().toBuffer());
    const trimmed = await sharp(flattened).trim({ threshold: 12 }).toBuffer();
    const meta = await sharp(trimmed).metadata();
    const scale = Math.min((size - 8) / meta.width, (size - 8) / meta.height);
    const w = Math.round(meta.width * scale);
    const h = Math.round(meta.height * scale);
    const padTop = Math.round((size - h) / 2);
    const padLeft = Math.round((size - w) / 2);

    await sharp(trimmed)
        .resize(w, h, { fit: 'inside', background: WHITE, kernel: sharp.kernel.lanczos3 })
        .extend({
            top: padTop,
            bottom: size - h - padTop,
            left: padLeft,
            right: size - w - padLeft,
            background: WHITE,
        })
        .png({ compressionLevel: 6 })
        .toFile(outputPath);

    const out = await sharp(outputPath).metadata();
    console.log(`  ${path.basename(outputPath)} → ${out.width}×${out.height}`);
}

const brandPngJobs = [
    ['azure-brand.png', 'azure.png', 'azure'],
    ['fastapi-brand.png', 'fastapi.png', 'fastapi'],
    ['twilio-brand.png', 'twilio.png', 'twilio'],
];

const iconJobs = [
    ['azure-ai-foundry-brand.png', 'azure-ai-foundry-icon.png', 'foundry'],
];

console.log('Building white-background platform logos…');
fs.mkdirSync(SOURCE, { recursive: true });

for (const [input, output, brand] of brandPngJobs) {
    const inPath = path.join(SOURCE, input);
    const outPath = path.join(ROOT, output);
    if (!fs.existsSync(inPath)) {
        console.warn(`  skip (missing): ${input}`);
        continue;
    }
    await brandPngToCanvas(inPath, outPath, brand);
}

for (const [input, output, brand] of iconJobs) {
    const inPath = path.join(SOURCE, input);
    if (!fs.existsSync(inPath)) {
        console.warn(`  skip (missing): ${input}`);
        continue;
    }
    fs.mkdirSync(ICON_ROOT, { recursive: true });
    await brandFoundryIcon(inPath, path.join(ICON_ROOT, output));
}

console.log('Done.');
