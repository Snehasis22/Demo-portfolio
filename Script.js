// Data
const VARIANTS = {
    'web-dev': {
        headline: 'Building Responsive\nWeb Experiences',
        tagline: 'Crafting modern, accessible, and performant user interfaces.',
        accent: '#00d4ff'
    },
    'sys-ops': {
        headline: 'Optimizing System\nOperations',
        tagline: 'Ensuring stable, secure, and efficient environments.',
        accent: '#00ff88'
    },
    'prog': {
        headline: 'Engineering Software\nSolutions',
        tagline: 'Writing clean, robust, and scalable code in C, C++, and Java.',
        accent: '#ffaa00'
    }
};

let activeVariant = 'web-dev';
let mousePos = { x: -300, y: -300 };

// Set CSS variable for accent color
function setAccentColor(color) {
    document.documentElement.style.setProperty('--accent-color', color);
}

// Cursor Glow & Video Parallax
const cursorGlow = document.getElementById('cursor-glow');
const videoWrapper = document.getElementById('video-wrapper');
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
    cursorGlow.style.transform = `translate(${mousePos.x - 300}px, ${mousePos.y - 300}px)`;

    if (videoWrapper) {
        targetX = (e.clientX / window.innerWidth - 0.5) * 30;
        targetY = (e.clientY / window.innerHeight - 0.5) * 30;
    }
});

// Smooth Parallax for Video Wrapper
function smoothParallax() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    if (videoWrapper) {
        videoWrapper.style.transform = `scale(1.05) translate(${-currentX}px, ${-currentY}px)`;
    }
    requestAnimationFrame(smoothParallax);
}
smoothParallax();


function updateCursorGlow() {
    const variant = VARIANTS[activeVariant];
    cursorGlow.style.background = `radial-gradient(circle, ${variant.accent}15 0%, transparent 65%)`;
}

// Parallax Background
const parallaxBg = document.getElementById('parallax-bg');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxBg.style.transform = `translateY(${scrollY * 0.5}px)`;
}, { passive: true });

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// Mobile Menu Toggle
const mobileBurger = document.getElementById('mobile-burger');
const mobileMenu = document.getElementById('mobile-menu');

mobileBurger.addEventListener('click', () => {
    mobileBurger.classList.toggle('burger-open');
    mobileMenu.classList.toggle('open');
});

// Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        const target = document.getElementById(section);
        if (target) target.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu
        mobileBurger.classList.remove('burger-open');
        mobileMenu.classList.remove('open');
    });
});

// Active Section Tracking
const sections = ['about', 'education', 'skills', 'experience', 'contact'];
window.addEventListener('scroll', () => {
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && window.scrollY >= section.offsetTop - 150) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sections[i]) {
                    link.classList.add('active');
                }
            });
            break;
        }
    }
}, { passive: true });

// Typewriter Effect
function typewriter(text, element, callback) {
    let i = 0;
    element.innerHTML = '';

    const interval = setInterval(() => {
        const currentText = text.slice(0, i).replace(/\n/g, '<br>');
        element.innerHTML = currentText + '<span class="cursor"></span>';
        i++;

        if (i > text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 30);
}

// Variant Selector
function updateVariant(variant) {
    activeVariant = variant;
    const v = VARIANTS[variant];

    setAccentColor(v.accent);
    updateCursorGlow();

    const headline = document.getElementById('headline');
    const tagline = document.getElementById('tagline');

    typewriter(v.headline, headline);
    tagline.textContent = v.tagline;
}

document.querySelectorAll('.variant-selector').forEach(selector => {
    selector.addEventListener('change', (e) => {
        updateVariant(e.target.value);
        // Sync both selectors
        document.querySelectorAll('.variant-selector').forEach(s => {
            s.value = e.target.value;
        });
    });
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
});

// Dynamic Lighting
const dynamicLighting = document.getElementById('dynamic-lighting');
document.addEventListener('mousemove', (e) => {
    if (dynamicLighting) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        dynamicLighting.style.setProperty('--mouse-x', `${x}%`);
        dynamicLighting.style.setProperty('--mouse-y', `${y}%`);
    }
});

// Optional fade-in for background video
const bgVideo = document.getElementById('bg-video');
if (bgVideo) {
    bgVideo.style.opacity = '0';
    bgVideo.style.transition = 'opacity 2s ease-in-out';
    bgVideo.addEventListener('canplaythrough', () => {
        bgVideo.style.opacity = '1';
    });
    // In case event fires before listener attached
    if (bgVideo.readyState > 3) {
        bgVideo.style.opacity = '1';
    }
}

// Initialize
updateVariant('web-dev');
updateCursorGlow();