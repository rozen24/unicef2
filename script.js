// ===================================
// Youth Health Ambassador Program
// Custom JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===================================
    // Mobile Menu Auto-Close
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: true
                });
            }
        });
    });

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for collapse toggles
            if (href === '#' || this.getAttribute('data-bs-toggle')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Scroll Reveal Animation
    // ===================================
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            revealOnScroll();
        });
    });

    // ===================================
    // Scroll to Top Button
    // ===================================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // Age Chart Hover Effect
    // ===================================
    const ageRanges = document.querySelectorAll('.age-range');
    
    ageRanges.forEach(range => {
        range.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        range.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // ===================================
    // Component Cards Animation Enhancement
    // ===================================
    const componentCards = document.querySelectorAll('.component-card');
    
    componentCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // ===================================
    // Statistics Counter Animation
    // ===================================
    const statBoxes = document.querySelectorAll('.stat-box');
    let hasAnimated = false;
    
    const animateCounter = (element, target, suffix) => {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, duration / steps);
    };
    
    const checkStatBoxes = () => {
        if (hasAnimated) return;
        
        const windowHeight = window.innerHeight;
        
        statBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            
            if (boxTop < windowHeight - 100) {
                hasAnimated = true;
                const h3 = box.querySelector('h3');
                const text = h3.textContent;
                
                if (text.includes('1.8B')) {
                    h3.textContent = '0B';
                    setTimeout(() => animateCounter(h3, 1.8, 'B'), 100);
                } else if (text.includes('50%')) {
                    h3.textContent = '0%';
                    setTimeout(() => animateCounter(h3, 50, '%'), 100);
                } else if (text.includes('20%')) {
                    h3.textContent = '0%';
                    setTimeout(() => animateCounter(h3, 20, '%'), 100);
                }
            }
        });
    };
    
    window.addEventListener('scroll', checkStatBoxes);
    checkStatBoxes(); // Initial check

    // ===================================
    // Hero Stats Counter Animation
    // ===================================
    const heroStats = document.querySelectorAll('.stat-card h3');
    let heroStatsAnimated = false;
    
    const animateHeroStats = () => {
        if (heroStatsAnimated) return;
        
        heroStats.forEach(stat => {
            const text = stat.textContent;
            heroStatsAnimated = true;
            
            if (text.includes('1000+')) {
                stat.textContent = '0+';
                setTimeout(() => animateCounter(stat, 1000, '+'), 100);
            } else if (text.includes('50+')) {
                stat.textContent = '0+';
                setTimeout(() => animateCounter(stat, 50, '+'), 100);
            } else if (text.includes('64')) {
                stat.textContent = '0';
                setTimeout(() => {
                    let current = 0;
                    const timer = setInterval(() => {
                        current++;
                        stat.textContent = current;
                        if (current >= 64) clearInterval(timer);
                    }, 30);
                }, 100);
            }
        });
    };
    
    // Trigger hero stats animation after page load
    setTimeout(animateHeroStats, 500);

    // ===================================
    // Form Validation (if forms are added)
    // ===================================
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // ===================================
    // Parallax Effect on Hero Image
    // ===================================
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ===================================
    // Add Active State to Current Section
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNavLink = () => {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', highlightNavLink);

    // ===================================
    // Card Tilt Effect (Optional Enhancement)
    // ===================================
    const tiltCards = document.querySelectorAll('.component-card, .reason-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // Loading Animation
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===================================
    // Console Message
    // ===================================
    console.log('%c Youth Health Ambassador Program ', 'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
    console.log('%c Powered by UNICEF Bangladesh & MOHFW ', 'color: #3b82f6; font-size: 12px;');
});

// ===================================
// Intersection Observer for Better Performance
// ===================================
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all reveal elements
    document.querySelectorAll('[data-reveal]').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
document.documentElement.style.visibility = 'visible';
