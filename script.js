// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------
// 1. Lenis Smooth Scroll (Anti-Gravity feel)
// -----------------------------------------
const lenis = new Lenis({
    duration: 1.5, // Soft floaty anti-gravity feel
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Anchor Links Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target && target !== '#') {
            lenis.scrollTo(target, { offset: -80 });
        }
    });
});

// -----------------------------------------
// 3. GSAP Animations
// -----------------------------------------

// A. Parallax Background Scrub
gsap.to('.parallax-bg', {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// Global and Skills animations removed. Only Experience and Education timelines remain.

// D. Centered Timeline (Alternating left/right)
const timelineItemsLeft = document.querySelectorAll('.timeline-item.left .timeline-content');
const timelineItemsRight = document.querySelectorAll('.timeline-item.right .timeline-content');

// Initial states for timeline content
gsap.set(timelineItemsLeft, { x: -60, opacity: 0 });
gsap.set(timelineItemsRight, { x: 60, opacity: 0 });

timelineItemsLeft.forEach(item => {
    gsap.to(item, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });
});

timelineItemsRight.forEach(item => {
    gsap.to(item, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });
});

// -----------------------------------------
// 4. Mobile Menu & Navbar Highlights
// -----------------------------------------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Navbar Highlights on Scroll
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    const vanillaSections = document.querySelectorAll('section');
    vanillaSections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});