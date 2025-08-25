/**
 * Noor Store Theme - Main JavaScript File
 * Theme by Claude Developer
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeTheme();
    });

    // Initialize Theme
    function initializeTheme() {
        initializeLoadingScreen();
        initializeHeader();
        initializeNavigation();
        initializeHeroSlider();
        initializeAnimations();
        initializeScrollEffects();
        initializeBackToTop();
        initializeSearchModal();
        initializeCartSidebar();
        initializeLazyLoading();
        initializeParallaxEffects();
    }

    // Loading Screen
    function initializeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 1000);
        }
    }

    // Header Functionality
    function initializeHeader() {
        const header = document.querySelector('.main-header');
        const topBar = document.querySelector('.top-bar');
        
        if (header && topBar) {
            let lastScrollTop = 0;
            
            window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollTop > 100) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
                
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                
                lastScrollTop = scrollTop;
            });
        }
    }

    // Navigation Functionality
    function initializeNavigation() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navigation = document.querySelector('.main-navigation');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (mobileMenuToggle && navigation) {
            mobileMenuToggle.addEventListener('click', () => {
                navigation.classList.toggle('nav-open');
                document.body.classList.toggle('nav-open');
                
                if (overlay) {
                    overlay.classList.toggle('overlay-active');
                }
            });
        }
        
        // Close mobile menu when clicking on overlay
        if (overlay) {
            overlay.addEventListener('click', () => {
                navigation.classList.remove('nav-open');
                document.body.classList.remove('nav-open');
                overlay.classList.remove('overlay-active');
            });
        }
        
        // Close mobile menu when clicking on navigation links
        const navLinks = navigation?.querySelectorAll('a');
        if (navLinks) {
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navigation.classList.remove('nav-open');
                    document.body.classList.remove('nav-open');
                    if (overlay) overlay.classList.remove('overlay-active');
                });
            });
        }
    }

    // Hero Slider Enhancements
    function initializeHeroSlider() {
        const heroSlider = document.querySelector('.hero-slider salla-slider');
        if (heroSlider) {
            // Add custom navigation
            const customArrows = document.createElement('div');
            customArrows.className = 'custom-slider-arrows';
            customArrows.innerHTML = `
                <button class="custom-arrow custom-arrow-prev">
                    <i class="sicon-arrow-left"></i>
                </button>
                <button class="custom-arrow custom-arrow-next">
                    <i class="sicon-arrow-right"></i>
                </button>
            `;
            
            heroSlider.appendChild(customArrows);
            
            // Custom arrow functionality
            const prevArrow = customArrows.querySelector('.custom-arrow-prev');
            const nextArrow = customArrows.querySelector('.custom-arrow-next');
            
            if (prevArrow && nextArrow) {
                prevArrow.addEventListener('click', () => {
                    heroSlider.previousSlide();
                });
                
                nextArrow.addEventListener('click', () => {
                    heroSlider.nextSlide();
                });
            }
        }
    }

    // Animations
    function initializeAnimations() {
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
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.feature-item, .category-card, .quick-link-item, .feature-card');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Scroll Effects
    function initializeScrollEffects() {
        const parallaxElements = document.querySelectorAll('.hero-section, .sale-banner-section');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Back to Top Button
    function initializeBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Search Modal
    function initializeSearchModal() {
        const searchToggle = document.querySelector('.search-toggle');
        const searchModal = document.getElementById('search-modal');
        const searchCloseBtn = document.querySelector('.search-close-btn');
        
        if (searchToggle && searchModal) {
            searchToggle.addEventListener('click', () => {
                searchModal.classList.add('modal-open');
                document.body.classList.add('modal-open');
                
                // Focus on search input
                const searchInput = searchModal.querySelector('input');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            });
        }
        
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', () => {
                searchModal.classList.remove('modal-open');
                document.body.classList.remove('modal-open');
            });
        }
        
        // Close modal when clicking outside
        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    searchModal.classList.remove('modal-open');
                    document.body.classList.remove('modal-open');
                }
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchModal?.classList.contains('modal-open')) {
                searchModal.classList.remove('modal-open');
                document.body.classList.remove('modal-open');
            }
        });
    }

    // Cart Sidebar
    function initializeCartSidebar() {
        const cartToggle = document.querySelector('.cart-toggle');
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartOverlay = document.querySelector('.cart-overlay');
        
        if (cartToggle && cartSidebar) {
            cartToggle.addEventListener('click', () => {
                cartSidebar.classList.add('sidebar-open');
                document.body.classList.add('sidebar-open');
                
                if (cartOverlay) {
                    cartOverlay.classList.add('overlay-active');
                }
            });
        }
        
        // Close cart sidebar
        const closeCart = () => {
            cartSidebar.classList.remove('sidebar-open');
            document.body.classList.remove('sidebar-open');
            if (cartOverlay) {
                cartOverlay.classList.remove('overlay-active');
            }
        };
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCart);
        }
        
        // Close cart with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cartSidebar?.classList.contains('sidebar-open')) {
                closeCart();
            }
        });
    }

    // Lazy Loading
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Parallax Effects
    function initializeParallaxEffects() {
        const parallaxSections = document.querySelectorAll('.hero-section, .sale-banner-section');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxSections.forEach(section => {
                const speed = 0.3;
                const yPos = -(scrolled * speed);
                section.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Utility Functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Enhanced Scroll Performance
    const optimizedScrollHandler = throttle(() => {
        // Handle scroll events efficiently
        const scrolled = window.pageYOffset;
        
        // Update header state
        const header = document.querySelector('.main-header');
        if (header) {
            if (scrolled > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
        
        // Update back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            if (scrolled > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    }, 16); // ~60fps

    window.addEventListener('scroll', optimizedScrollHandler);

    // Enhanced Resize Handler
    const optimizedResizeHandler = debounce(() => {
        // Handle resize events efficiently
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('is-mobile', isMobile);
    }, 250);

    window.addEventListener('resize', optimizedResizeHandler);

    // Initialize on window load
    window.addEventListener('load', () => {
        // Additional initialization after all resources are loaded
        initializeLazyLoading();
        
        // Remove loading screen if still visible
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen && loadingScreen.style.display !== 'none') {
            loadingScreen.style.display = 'none';
        }
    });

    // Export for global access if needed
    window.NoorTheme = {
        initialize: initializeTheme,
        utils: {
            debounce,
            throttle
        }
    };

})();