// ========================================
// Noor Store Theme JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Noor Store Theme Loaded! 🎉');
    
    // Initialize theme components
    initLoadingScreen();
    initBackToTop();
    initMobileMenu();
    initSearchModal();
    initCartSidebar();
    
    // Add smooth scrolling
    addSmoothScrolling();
    
    // Add animations
    addScrollAnimations();
});

// ========================================
// Loading Screen
// ========================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Hide loading screen after page loads
        window.addEventListener('load', function() {
            setTimeout(function() {
                loadingScreen.classList.add('hidden');
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                }, 300);
            }, 1000);
        });
    }
}

// ========================================
// Back to Top Button
// ========================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========================================
// Mobile Menu
// ========================================

function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });
    }
}

// ========================================
// Search Modal
// ========================================

function initSearchModal() {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchCloseBtn = document.querySelector('.search-close-btn');
    
    if (searchToggle && searchModal) {
        // Open search modal
        searchToggle.addEventListener('click', function() {
            searchModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
        
        // Close search modal
        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function() {
                searchModal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
        
        // Close modal when clicking outside
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchModal.classList.contains('show')) {
                searchModal.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    }
}

// ========================================
// Cart Sidebar
// ========================================

function initCartSidebar() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    
    if (cartToggle && cartSidebar) {
        cartToggle.addEventListener('click', function() {
            cartSidebar.classList.toggle('open');
            document.body.classList.toggle('cart-open');
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', function(e) {
            if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
                cartSidebar.classList.remove('open');
                document.body.classList.remove('cart-open');
            }
        });
    }
}

// ========================================
// Smooth Scrolling
// ========================================

function addSmoothScrolling() {
    // Smooth scroll for anchor links
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

// ========================================
// Scroll Animations
// ========================================

function addScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-item, .quick-link-item, .category-card, .testimonial-card, .feature-card').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// Utility Functions
// ========================================

// Debounce function for performance
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

// Throttle function for scroll events
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

// ========================================
// Theme Settings
// ========================================

// Get theme settings from CSS variables
function getThemeSetting(setting) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${setting}`).trim();
}

// Set theme setting
function setThemeSetting(setting, value) {
    document.documentElement.style.setProperty(`--${setting}`, value);
}

// ========================================
// Performance Optimizations
// ========================================

// Lazy load images
function initLazyLoading() {
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
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// ========================================
// Error Handling
// ========================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Theme Error:', e.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ========================================
// Theme Ready Event
// ========================================

// Dispatch theme ready event
window.dispatchEvent(new CustomEvent('themeReady', {
    detail: {
        theme: 'Noor Store',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    }
}));

console.log('🎨 Noor Store Theme JavaScript Initialized Successfully!');