// JavaScript for Oceanica website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize responsive behavior
    handleResponsiveLayout();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize form handling
    initFormHandling();
    
    // Initialize hover effects
    initHoverEffects();
});

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.mobile-hamburger');
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle mobile menu
            const menu = document.querySelector('.mobile-menu-items');
            if (menu) {
                menu.classList.toggle('active');
            } else {
                // Create mobile menu if it doesn't exist
                createMobileMenu();
            }
        });
    }
}

function createMobileMenu() {
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    if (mobileNavMenu) {
        const menuItems = document.createElement('div');
        menuItems.className = 'mobile-menu-items';
        menuItems.innerHTML = `
            <ul class="mobile-nav-list">
                <li><a href="#" class="mobile-nav-link">Home</a></li>
                <li><a href="#" class="mobile-nav-link">Tours</a></li>
                <li><a href="#" class="mobile-nav-link">Contact</a></li>
                <li><a href="#" class="mobile-nav-cta">Start a Journey</a></li>
            </ul>
        `;
        mobileNavMenu.parentNode.insertBefore(menuItems, mobileNavMenu.nextSibling);
        
        // Add styles for mobile menu
        const style = document.createElement('style');
        style.textContent = `
            .mobile-menu-items {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: var(--rich-black);
                z-index: 1000;
                padding: 20px;
                border-top: 1px solid #333;
            }
            
            .mobile-menu-items.active {
                display: block;
            }
            
            .mobile-nav-list {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            
            .mobile-nav-list li {
                margin-bottom: 15px;
            }
            
            .mobile-nav-link,
            .mobile-nav-cta {
                color: white;
                text-decoration: none;
                font-family: "Manrope-Regular", Helvetica;
                font-size: 18px;
                display: block;
                padding: 10px 0;
            }
            
            .mobile-nav-cta {
                color: var(--moonstone-blue);
                font-family: "Manrope-Bold", Helvetica;
                font-weight: 700;
            }
            
            .mobile-nav-link:hover,
            .mobile-nav-cta:hover {
                color: var(--moonstone-blue);
            }
        `;
        document.head.appendChild(style);
    }
}

// Handle responsive layout changes
function handleResponsiveLayout() {
    function checkScreenSize() {
        const width = window.innerWidth;
        const body = document.body;
        
        // Remove existing classes
        body.classList.remove('is-mobile', 'is-tablet', 'is-desktop');
        
        // Add appropriate class based on screen size
        if (width <= 767) {
            body.classList.add('is-mobile');
        } else if (width >= 768 && width <= 1023) {
            body.classList.add('is-tablet');
        } else {
            body.classList.add('is-desktop');
        }
    }
    
    // Check on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Scroll animations
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements with animation class
        document.querySelectorAll('.hover-section, .packages, .frame-wrapper-2').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-on-scroll.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Form handling
function initFormHandling() {
    const form = document.querySelector('.newsletter-sign-up');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const gdpr = form.querySelector('input[type="checkbox"]').checked;
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!gdpr) {
                alert('Please accept the GDPR statement.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for subscribing! You will receive 10% off your first package deal.');
            form.reset();
        });
    }
}

// Hover effects
function initHoverEffects() {
    // Add hover effects to hover sections
    const hoverSections = document.querySelectorAll('.hover-section');
    hoverSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effects to packages
    const packages = document.querySelectorAll('.packages');
    packages.forEach(pkg => {
        pkg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        pkg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
function toggleMenu() {
    const menu = document.querySelector('.mobile-menu-items');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Export functions for global use
window.toggleMenu = toggleMenu;

// Initialize smooth scrolling
initSmoothScrolling();
