document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
    const typingText = document.getElementById('typing-text');
    const roles = ["Full-Stack Developer", "BE CSE Student", "Problem Solver", "Software Engineer"];
    let roleIndex = 0; let charIndex = 0; let isDeleting = false; let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        typingText.textContent = isDeleting ? currentRole.substring(0, charIndex - 1) : currentRole.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true; typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typingSpeed = 500;
        }
        setTimeout(type, typingSpeed);
    }
    type();

    // Number Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const countUp = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText;
        const speed = target / 50;
        if (count < target) {
            el.innerText = Math.ceil(count + speed);
            setTimeout(() => countUp(el), 30);
        } else {
            el.innerText = target + (el.innerText.includes('%') ? '' : '+');
        }
    };

    // Scroll Observer
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('expertise-section')) {
                    stats.forEach(stat => countUp(stat));
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

    // Scrolled State
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // Flying Avatar Animation Logic
    const flyingAvatar = document.getElementById('flying-avatar');
    const heroTarget = document.getElementById('hero-avatar-target');
    const navTarget = document.getElementById('nav-avatar');
    let hasFlown = false;

    function updateFlyingAvatarPosition(targetEl) {
        if (!targetEl) return;
        const rect = targetEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        flyingAvatar.style.left = `${centerX}px`;
        flyingAvatar.style.top = `${centerY}px`;
        flyingAvatar.style.width = `${rect.width}px`;
        flyingAvatar.style.height = `${rect.height}px`;
    }

    if (flyingAvatar && heroTarget) {
        updateFlyingAvatarPosition(heroTarget);
    }

    function triggerFlight() {
        if (hasFlown) return;
        hasFlown = true;

        if (flyingAvatar && navTarget) {
            flyingAvatar.classList.add('at-nav');
            updateFlyingAvatarPosition(navTarget);

            setTimeout(() => {
                navTarget.style.opacity = '1';
                flyingAvatar.style.opacity = '0';
                setTimeout(() => {
                    flyingAvatar.style.display = 'none';
                }, 300);
            }, 1200);
        }
    }

    window.addEventListener('scroll', triggerFlight, { once: true });

    window.addEventListener('resize', () => {
        if (!hasFlown) {
            updateFlyingAvatarPosition(heroTarget);
        } else if (flyingAvatar.style.display !== 'none') {
            updateFlyingAvatarPosition(navTarget);
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinksList = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinksList.classList.toggle('active');
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinksList.classList.contains('active') && !navLinksList.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Image Enlargement Logic
    const overlay = document.getElementById('image-overlay');

    function openOverlay(e) {
        e.stopPropagation();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeOverlay() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    if (flyingAvatar) flyingAvatar.addEventListener('click', openOverlay);
    if (navTarget) navTarget.addEventListener('click', openOverlay);
    if (overlay) overlay.addEventListener('click', closeOverlay);
});
