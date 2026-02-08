document.addEventListener('DOMContentLoaded', function () {

    // --------------------------------------------------------------------------
    // 1. Mobile Menu Logic (Slide Over)
    // --------------------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            // Toggle State
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');

            // Lock body scroll when menu is open
            if (!isExpanded) {
                body.style.overflow = 'hidden';
                menuToggle.innerHTML = '<i data-lucide="x"></i>'; // Change icon to X
            } else {
                body.style.overflow = '';
                menuToggle.innerHTML = '<i data-lucide="menu"></i>'; // Back to hamburger
            }
            lucide.createIcons();
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
                menuToggle.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            });
        });
    }

    // --------------------------------------------------------------------------
    // 2. Scroll Header Effect (Glassmorphism trigger)
    // --------------------------------------------------------------------------
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // --------------------------------------------------------------------------
    // 3. ScrollSpy (Active Link Indicator)
    // --------------------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for header height
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href*="' + sectionId + '"]');

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial check

    // --------------------------------------------------------------------------
    // 4. Intersection Observer (Scroll Reveal Animation)
    // --------------------------------------------------------------------------
    const revealOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Add active class
            entry.target.classList.add('active');

            // Handle stagger children explicitly if useful
            if (entry.target.classList.contains('stagger-wrapper')) {
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach(item => item.classList.add('active'));
            }

            // Stop observing once revealed
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    // Observe generic reveal elements
    document.querySelectorAll('.reveal').forEach(el => revealOnScroll.observe(el));
    // Observe specific stagger wrappers that might not have .reveal
    document.querySelectorAll('.stagger-wrapper').forEach(el => revealOnScroll.observe(el));


    // --------------------------------------------------------------------------
    // 5. Accordion Logic (Smooth Height)
    // --------------------------------------------------------------------------
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            const isActive = this.getAttribute('aria-expanded') === 'true';

            // Close all others (Accordion behavior)
            accordions.forEach(otherAcc => {
                if (otherAcc !== this) {
                    otherAcc.setAttribute('aria-expanded', 'false');
                    otherAcc.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current
            this.setAttribute('aria-expanded', !isActive);
            const content = this.nextElementSibling;

            if (!isActive) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --------------------------------------------------------------------------
    // 6. Toasts Handling (Auto Dismiss)
    // --------------------------------------------------------------------------
    const toasts = document.querySelectorAll('.alert'); // Using Flask flash categories
    if (toasts.length > 0) {
        toasts.forEach((toast, index) => {
            // Auto dismiss after 5s
            setTimeout(() => {
                toast.style.transition = "opacity 0.5s ease";
                toast.style.opacity = "0";
                setTimeout(() => toast.remove(), 500);
            }, 5000 + (index * 1000));
        });
    }

});
