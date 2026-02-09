document.addEventListener('DOMContentLoaded', function () {

    // --------------------------------------------------------------------------
    // 1. Robust Mobile Menu (Toggle, Scroll Lock, Resize)
    // --------------------------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    function openMenu() {
        menuToggle.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('active');
        body.classList.add('no-scroll');
        menuToggle.innerHTML = '<i data-lucide="x"></i>';
        lucide.createIcons();
    }

    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        body.classList.remove('no-scroll');
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
    }

    if (menuToggle && navMenu) {
        // Toggle Click
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on Link Click
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close on Click Outside (optional robustness)
        document.addEventListener('click', function (e) {
            if (navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on Resize > 900px
        window.addEventListener('resize', function () {
            if (window.innerWidth > 900 && navMenu.classList.contains('active')) {
                closeMenu();
            }
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
            const sectionTop = current.offsetTop - 100;
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
    scrollSpy();

    // --------------------------------------------------------------------------
    // 4. Intersection Observer (Scroll Reveal Animation)
    // --------------------------------------------------------------------------
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('active');

            if (entry.target.classList.contains('stagger-wrapper')) {
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach(item => item.classList.add('active'));
            }

            observer.unobserve(entry.target);
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealOnScroll.observe(el));
    document.querySelectorAll('.stagger-wrapper').forEach(el => revealOnScroll.observe(el));


    // --------------------------------------------------------------------------
    // 5. Accordion Logic (Smooth Height)
    // --------------------------------------------------------------------------
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            const isActive = this.getAttribute('aria-expanded') === 'true';

            accordions.forEach(otherAcc => {
                if (otherAcc !== this) {
                    otherAcc.setAttribute('aria-expanded', 'false');
                    otherAcc.nextElementSibling.style.maxHeight = null;
                }
            });

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
    const toasts = document.querySelectorAll('.alert');
    if (toasts.length > 0) {
        toasts.forEach((toast, index) => {
            setTimeout(() => {
                toast.style.transition = "opacity 0.5s ease";
                toast.style.opacity = "0";
                setTimeout(() => toast.remove(), 500);
            }, 5000 + (index * 1000));
        });
    }

});
