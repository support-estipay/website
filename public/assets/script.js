document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // ============================================
    // SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
    // ============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));

    // Auto-add animation classes to sections
    const sections = document.querySelectorAll('section, .impact-section, .assistant-box');
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        section.style.animationDelay = `${index * 0.1}s`;
        observer.observe(section);
    });

    // Animate damage points
    const pointItems = document.querySelectorAll('.point-item');
    pointItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Animate feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Animate metric rows
    const metricRows = document.querySelectorAll('.metric-row');
    metricRows.forEach((row, index) => {
        row.classList.add('fade-in');
        row.style.animationDelay = `${index * 0.1}s`;
        observer.observe(row);
    });

    // Animate compliance points
    const compPoints = document.querySelectorAll('.comp-points li');
    compPoints.forEach((point, index) => {
        point.classList.add('fade-in');
        point.style.animationDelay = `${index * 0.15}s`;
        observer.observe(point);
    });

    // Animate assistant list items
    const assistantListItems = document.querySelectorAll('.assistant-left ul li');
    assistantListItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // NUMBER COUNTING ANIMATION
    // ============================================

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);

            // Format numbers with % or other suffixes
            if (element.textContent.includes('%')) {
                element.textContent = current + '%';
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end + (element.textContent.includes('%') ? '%' : '');
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observe metric values for counting animation
    const metricObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent.trim();

                // Check if it's a percentage
                if (text.includes('%')) {
                    const num = parseInt(text);
                    if (!isNaN(num)) {
                        element.textContent = '0%';
                        animateValue(element, 0, num, 2000);
                    }
                }

                metricObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    // Observe percentage values
    const percentageElements = document.querySelectorAll('.metric-before, .metric-after');
    percentageElements.forEach(el => {
        if (el.textContent.includes('%')) {
            metricObserver.observe(el);
        }
    });

    // ============================================
    // PARALLAX EFFECT
    // ============================================

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-right img, .assistant-right img, .edge-right img, .impact-left img');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================

    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const buttons = document.querySelectorAll('.demo-btn, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // ============================================
    // IMAGE LAZY LOADING WITH FADE-IN
    // ============================================

    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease-in';

                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.addEventListener('load', function () {
                        img.style.opacity = '1';
                    });
                }

                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================
    // TEXT TYPING ANIMATION (Optional - for hero)
    // ============================================

    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // ============================================
    // CURSOR FOLLOW EFFECT (Optional)
    // ============================================

    let cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // ============================================
    // ADD ANIMATION CLASSES TO ELEMENTS
    // ============================================

    // Hero elements
    const heroTitle = document.querySelector('.hero-left h1');
    const heroSubtext = document.querySelector('.hero-left .subtext');
    const heroImage = document.querySelector('.hero-right img');

    if (heroTitle) heroTitle.classList.add('fade-in');
    if (heroSubtext) heroSubtext.classList.add('fade-in');
    if (heroImage) heroImage.classList.add('slide-in-right');

    // Damage section
    const damageTitle = document.querySelector('.damage-section h2');
    const damageSubtext = document.querySelector('.damage-subtext');

    if (damageTitle) damageTitle.classList.add('fade-in');
    if (damageSubtext) damageSubtext.classList.add('fade-in');

    // Assistant section
    const assistantBox = document.querySelector('.assistant-box');
    if (assistantBox) assistantBox.classList.add('scale-in');

    // Edge section
    const edgeTitle = document.querySelector('.edge-left h2');
    if (edgeTitle) edgeTitle.classList.add('fade-in');

    // Impact section
    const impactTitle = document.querySelector('.impact-right h2');
    if (impactTitle) impactTitle.classList.add('fade-in');

    // Compliance section
    const complianceTitle = document.querySelector('.compliance-content h2');
    if (complianceTitle) complianceTitle.classList.add('fade-in');

    // ============================================
    // ENSURE EDGE-RIGHT IMAGE IS VISIBLE
    // ============================================

    const edgeRightContainer = document.querySelector('.edge-right');
    const edgeRightImg = document.querySelector('.edge-right img');

    if (edgeRightContainer) {
        edgeRightContainer.style.display = 'flex';
        edgeRightContainer.style.visibility = 'visible';
        edgeRightContainer.style.opacity = '1';
    }

    if (edgeRightImg) {
        edgeRightImg.style.display = 'block';
        edgeRightImg.style.visibility = 'visible';
        edgeRightImg.style.opacity = '1';
        edgeRightImg.style.width = '100%';
        edgeRightImg.style.maxWidth = '600px';
        edgeRightImg.style.height = 'auto';

        // Force visibility
        edgeRightImg.setAttribute('style',
            'display: block !important; ' +
            'visibility: visible !important; ' +
            'opacity: 1 !important; ' +
            'width: 100% !important; ' +
            'max-width: 600px !important; ' +
            'height: auto !important;'
        );

        // Check if image loads
        edgeRightImg.onerror = function () {
            console.warn('Edge right image failed to load:', this.src);
            this.style.border = '2px dashed #ccc';
            this.style.minHeight = '400px';
            this.style.backgroundColor = '#f5f5f5';
            this.style.display = 'block';
            this.style.visibility = 'visible';
        };

        edgeRightImg.onload = function () {
            this.style.opacity = '1';
            this.style.visibility = 'visible';
            this.style.display = 'block';
        };

        // Ensure it's visible even if already loaded
        if (edgeRightImg.complete) {
            edgeRightImg.style.opacity = '1';
            edgeRightImg.style.visibility = 'visible';
            edgeRightImg.style.display = 'block';
        }
    }

    // ============================================
    // GOOGLE SHEETS SUBSCRIPTION FORM
    // ============================================

    // const subscribeForm = document.getElementById('subscribe-form');
    // const subscribeBtn = document.getElementById('subscribe-btn');
    // // const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzz7jMitJ5f115ZrV--RY1Pcbeq5du3IKVYyUOXDDg8xAAajBRL_j10qvvVHCh3lnJR/exec';
    // const SCRIPT_URL = 'https://defaultca6e3ab58f4a4f0f99c00cef53c7ae.6d.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/e72179c31b884d0ca19172e7c5dd8369/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=lUAPRK9F2VEmo7Kie4jur_mi71rTVleF3_0CKzWFcP0';
    // if (subscribeForm) {
    //     subscribeForm.addEventListener('submit', async function (e) {
    //         e.preventDefault();

    //         // UI Feedback: Disable button and show loading icon
    //         subscribeBtn.disabled = true;
    //         const originalContent = subscribeBtn.innerHTML;
    //         subscribeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

    //         try {
    //             const email = document.getElementById('subscribe-email').value;
    //             console.log('Attempting to subscribe:', email);

    //             // Switching to GET for better reliability with Google Apps Script
    //             const finalUrl = `${SCRIPT_URL}?email=${encodeURIComponent(email)}`;

    //             // await fetch(SCRIPT_URL, {
    //             //     method: 'POST',
    //             //     mode: 'no-cors'
    //             // });
    //             await fetch(SCRIPT_URL, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     email: email
    //                 })
    //             });

    //             console.log('Subscription request sent.');

    //             subscribeForm.reset();
    //         } catch (error) {
    //             console.error('Fetch error:', error);
    //             alert('Connection error. Please try again.');
    //         } finally {
    //             subscribeBtn.disabled = false;
    //             subscribeBtn.innerHTML = originalContent;
    //         }
    //     });
    // }


    (window.EhDynamicRef ||= []).push(() => {
        EhForms.create({
            "formId": "6529917257515008", // Required: The unique ID of your form
            "target": "", // Optional: Use a selector like ".class" or "#id"
            "onFormReady": function (el, setValue) { // Optional
                // Example: Automatically fill the email field
                // setValue("email", "hello@example.com");

                // Write your custom code below
            }
        });
    });

});

