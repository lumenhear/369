/* ---
   LUMEN Speech & Hearing - Main JavaScript File
   --- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lucide Icons
    // This function finds all elements with the `data-lucide` attribute and replaces them with SVG icons.
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ------------------------
    // 2. Header & Navigation Logic
    // ------------------------
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // Add a 'scrolled' class to the header when the user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle the mobile navigation menu
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            // Optional: Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // ------------------------
    // 3. GSAP Scroll-Triggered Animations
    // ------------------------
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- Page Load Animation ---
        // Fades in the entire page content for a smooth entry effect.
        gsap.from('body', { 
            opacity: 0, 
            duration: 0.8, 
            ease: 'power1.inOut' 
        });

        // --- Generic Fade-In Animation ---
        // Targets any element with the class '.fade-in' when it enters the viewport.
        const fadeIns = gsap.utils.toArray('.fade-in');
        fadeIns.forEach(el => {
            gsap.from(el, {
                opacity: 0,
                y: 30, // Starts 30px below its final position
                duration: 1,
                ease: 'power2.out',
                // Optional delay can be set with `data-delay` attribute in HTML
                delay: parseFloat(el.dataset.delay) || 0
            });
        });
        
        // --- Generic Slide-Up Animation ---
        // Targets any element with '.slide-up' as it becomes visible on scroll.
        const slideUps = gsap.utils.toArray('.slide-up');
        slideUps.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%', // Animation starts when the top of the element is 85% from the top of the viewport
                    toggleActions: 'play none none none' // Plays the animation once and doesn't reverse
                },
                opacity: 0,
                y: 50, // Starts 50px below its final position
                duration: 0.8,
                ease: 'power2.out',
                delay: parseFloat(el.dataset.delay) || 0
            });
        });
    }

    // ------------------------
    // 4. Active Navigation Link Highlighting
    // ------------------------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navMenuLinks = document.querySelectorAll('.nav-menu a');

    navMenuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ------------------------
    // 5. Update Footer Year
    // ------------------------
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // NOTE: The Swiper.js initialization is kept in 'testimonials.html'
    // because that's the only page that needs it. This improves performance
    // by not loading the Swiper library on every single page.

});

