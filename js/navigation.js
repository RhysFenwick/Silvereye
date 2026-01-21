/**
 * Navigation Module
 * ============================================================================
 * Handles navigation functionality, mobile menu toggle, and smooth scrolling.
 * 
 * Features:
 * - Mobile menu toggle functionality
 * - Smooth scroll to sections
 * - Active section highlighting
 * - Sticky navbar behavior
 */

const Navigation = (() => {
    // Configuration
    const config = {
        menuToggleSelector: '#menu-toggle',
        navMenuSelector: '#nav-menu',
        navbarSelector: '#navbar',
        navItemSelector: '.nav-menu a',
        activeClass: 'active',
        scrollBehavior: 'smooth'
    };

    /**
     * Initialize navigation module
     */
    const init = () => {
        setupMenuToggle();
        setupSmoothScroll();
        setupScrollTracking();
    };

    /**
     * Setup mobile menu toggle functionality
     */
    const setupMenuToggle = () => {
        const menuToggle = document.querySelector(config.menuToggleSelector);
        const navMenu = document.querySelector(config.navMenuSelector);

        if (!menuToggle || !navMenu) return;

        // Toggle menu on button click
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle(config.activeClass);
            navMenu.classList.toggle(config.activeClass);
        });

        // Close menu when a link is clicked
        document.querySelectorAll(config.navItemSelector).forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove(config.activeClass);
                navMenu.classList.remove(config.activeClass);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInside = event.target.closest(config.navbarSelector);
            if (!isClickInside && navMenu.classList.contains(config.activeClass)) {
                menuToggle.classList.remove(config.activeClass);
                navMenu.classList.remove(config.activeClass);
            }
        });
    };

    /**
     * Setup smooth scrolling for navigation links
     */
    const setupSmoothScroll = () => {
        document.querySelectorAll(config.navItemSelector).forEach(link => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                
                // Check if it's an internal link
                if (href && href.startsWith('#')) {
                    event.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: config.scrollBehavior,
                            block: 'start'
                        });
                    }
                }
            });
        });
    };

    /**
     * Setup scroll tracking to highlight active section
     */
    const setupScrollTracking = () => {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll(config.navItemSelector);

        window.addEventListener('scroll', throttle(() => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                // Check if section is in viewport
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });

            // Update active link
            navLinks.forEach(link => {
                link.classList.remove(config.activeClass);
                if (link.getAttribute('data-section') === current) {
                    link.classList.add(config.activeClass);
                }
            });
        }, 100));
    };

    /**
     * Throttle function to limit event firing
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    const throttle = (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        };
    };

    // Public API
    return {
        init
    };
})();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Navigation.init();
});
