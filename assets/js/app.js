/**
 * Noor Store Theme - Main JavaScript File
 * Theme by Claude Developer
 */

(function() {
    'use strict';

    // Theme Configuration
    const Theme = {
        name: 'Noor Store',
        version: '1.0.0',
        
        // Theme Settings
        settings: {
            animationDuration: 300,
            scrollOffset: 100,
            autoSlideInterval: 5000,
            lazyLoadOffset: 50
        },

        // Initialize theme
        init() {
            this.bindEvents();
            this.initComponents();
            this.hideLoadingScreen();
            console.log(`${this.name} v${this.version} initialized`);
        },

        // Bind event listeners
        bindEvents() {
            document.addEventListener('DOMContentLoaded', () => {
                this.initBackToTop();
                this.initMobileMenu();
                this.initSearch();
                this.initCart();
                this.initAnnouncement();
                this.initLazyLoading();
                this.initSmoothScroll();
                this.initFormValidation();
            });

            window.addEventListener('scroll', this.throttle(() => {
                this.handleScroll();
            }, 100));

            window.addEventListener('resize', this.throttle(() => {
                this.handleResize();
            }, 250));
        },

        // Initialize components
        initComponents() {
            // Initialize Salla components when they're available
            if (typeof Salla !== 'undefined') {
                this.initSallaComponents();
            } else {
                // Wait for Salla to load
                document.addEventListener('SallaLoaded', () => {
                    this.initSallaComponents();
                });
            }
        },

        // Initialize Salla specific components
        initSallaComponents() {
            // Product quick view
            this.initProductQuickView();
            
            // Cart updates
            this.initCartUpdates();
            
            // Wishlist functionality
            this.initWishlist();
            
            // Compare functionality
            this.initCompare();
            
            // Newsletter subscription
            this.initNewsletter();
        },

        // Hide loading screen
        hideLoadingScreen() {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.remove();
                    }, 500);
                }, 1000);
            }
        },

        // Initialize Back to Top button
        initBackToTop() {
            const backToTopBtn = document.getElementById('back-to-top');
            if (!backToTopBtn) return;

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        },

        // Handle scroll events
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Back to top button visibility
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                if (scrollTop > this.settings.scrollOffset) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }

            // Header scroll effect
            const header = document.querySelector('.main-header');
            if (header) {
                if (scrollTop > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        },

        // Initialize mobile menu
        initMobileMenu() {
            const menuToggle = document.getElementById('mobile-menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');
            
            if (menuToggle) {
                menuToggle.addEventListener('click', () => {
                    menuToggle.classList.toggle('active');
                    if (mobileMenu) {
                        mobileMenu.classList.toggle('open');
                    }
                    document.body.classList.toggle('menu-open');
                });
            }

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                        mobileMenu.classList.remove('open');
                        menuToggle.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
            });
        },

        // Initialize search functionality
        initSearch() {
            const searchToggle = document.getElementById('search-toggle');
            const searchModal = document.getElementById('search-modal');
            const searchClose = document.querySelector('.search-close-btn');

            if (searchToggle && searchModal) {
                searchToggle.addEventListener('click', () => {
                    searchModal.classList.add('open');
                    const searchInput = searchModal.querySelector('input[type="search"]');
                    if (searchInput) {
                        setTimeout(() => searchInput.focus(), 100);
                    }
                });
            }

            if (searchClose && searchModal) {
                searchClose.addEventListener('click', () => {
                    searchModal.classList.remove('open');
                });
            }

            // Close search modal on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && searchModal && searchModal.classList.contains('open')) {
                    searchModal.classList.remove('open');
                }
            });

            // Close search modal when clicking outside
            if (searchModal) {
                searchModal.addEventListener('click', (e) => {
                    if (e.target === searchModal) {
                        searchModal.classList.remove('open');
                    }
                });
            }
        },

        // Initialize cart functionality
        initCart() {
            const cartToggle = document.getElementById('cart-toggle');
            const cartSidebar = document.getElementById('cart-sidebar');

            if (cartToggle && cartSidebar) {
                cartToggle.addEventListener('click', () => {
                    cartSidebar.classList.toggle('open');
                    document.body.classList.toggle('cart-open');
                });
            }

            // Close cart when clicking outside
            document.addEventListener('click', (e) => {
                if (cartSidebar && cartSidebar.classList.contains('open')) {
                    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
                        cartSidebar.classList.remove('open');
                        document.body.classList.remove('cart-open');
                    }
                }
            });
        },

        // Initialize announcement bar
        initAnnouncement() {
            const announcementClose = document.querySelector('.announcement-close');
            const announcementBar = document.querySelector('.announcement-bar');

            if (announcementClose && announcementBar) {
                announcementClose.addEventListener('click', () => {
                    announcementBar.style.display = 'none';
                    localStorage.setItem('announcement-closed', 'true');
                });

                // Check if announcement was previously closed
                if (localStorage.getItem('announcement-closed') === 'true') {
                    announcementBar.style.display = 'none';
                }
            }
        },

        // Initialize lazy loading
        initLazyLoading() {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: `${this.settings.lazyLoadOffset}px`
            });

            images.forEach(img => imageObserver.observe(img));
        },

        // Initialize smooth scroll
        initSmoothScroll() {
            const links = document.querySelectorAll('a[href^="#"]');
            
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') return;
                    
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        },

        // Initialize form validation
        initFormValidation() {
            const forms = document.querySelectorAll('form[data-validate]');
            
            forms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    if (!this.validateForm(form)) {
                        e.preventDefault();
                    }
                });

                // Real-time validation
                const inputs = form.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => {
                        this.validateField(input);
                    });
                });
            });
        },

        // Validate form
        validateForm(form) {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        },

        // Validate individual field
        validateField(field) {
            const value = field.value.trim();
            const type = field.type;
            let isValid = true;
            let message = '';

            // Check if required field is empty
            if (field.hasAttribute('required') && !value) {
                isValid = false;
                message = 'هذا الحقل مطلوب';
            }
            // Email validation
            else if (type === 'email' && value && !this.isValidEmail(value)) {
                isValid = false;
                message = 'يرجى إدخال بريد إلكتروني صحيح';
            }
            // Phone validation
            else if (type === 'tel' && value && !this.isValidPhone(value)) {
                isValid = false;
                message = 'يرجى إدخال رقم هاتف صحيح';
            }
            // Password strength
            else if (type === 'password' && value && value.length < 8) {
                isValid = false;
                message = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
            }

            this.showFieldError(field, isValid, message);
            return isValid;
        },

        // Show field error
        showFieldError(field, isValid, message) {
            const errorElement = field.parentNode.querySelector('.field-error');
            
            if (errorElement) {
                errorElement.remove();
            }

            if (!isValid && message) {
                const error = document.createElement('div');
                error.className = 'field-error';
                error.textContent = message;
                error.style.color = 'var(--danger-color)';
                error.style.fontSize = 'var(--font-size-sm)';
                error.style.marginTop = 'var(--spacing-xs)';
                field.parentNode.appendChild(error);
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        },

        // Email validation
        isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },

        // Phone validation
        isValidPhone(phone) {
            const regex = /^[\+]?[0-9\s\-\(\)]+$/;
            return regex.test(phone) && phone.replace(/\D/g, '').length >= 10;
        },

        // Initialize product quick view
        initProductQuickView() {
            const quickViewButtons = document.querySelectorAll('.quick-view-btn');
            
            quickViewButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productId = button.dataset.productId;
                    this.showProductQuickView(productId);
                });
            });
        },

        // Show product quick view
        showProductQuickView(productId) {
            // Create and show quick view modal
            const modal = this.createModal('product-quick-view');
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>معاينة سريعة</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="loading-spinner">
                            <div class="spinner"></div>
                            <p>جاري التحميل...</p>
                        </div>
                    </div>
                </div>
            `;
            
            // Load product data
            this.loadProductData(productId, modal);
        },

        // Load product data
        loadProductData(productId, modal) {
            // Simulate API call (replace with actual Salla API call)
            setTimeout(() => {
                const modalBody = modal.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div class="product-quick-view">
                        <div class="product-images">
                            <img src="/assets/images/product-${productId}.jpg" alt="Product">
                        </div>
                        <div class="product-details">
                            <h3>اسم المنتج</h3>
                            <div class="product-price">299 ريال</div>
                            <div class="product-description">
                                <p>وصف المنتج يظهر هنا...</p>
                            </div>
                            <div class="product-actions">
                                <button class="btn btn-primary add-to-cart-btn">إضافة للسلة</button>
                                <button class="btn btn-secondary add-to-wishlist-btn">المفضلة</button>
                            </div>
                        </div>
                    </div>
                `;
            }, 1000);
        },

        // Initialize cart updates
        initCartUpdates() {
            // Listen for Salla cart events
            document.addEventListener('salla:cart.updated', (event) => {
                this.updateCartCount(event.detail);
                this.showCartNotification('تم تحديث السلة بنجاح');
            });

            document.addEventListener('salla:cart.item.added', (event) => {
                this.updateCartCount(event.detail);
                this.showCartNotification('تم إضافة المنتج للسلة');
            });

            document.addEventListener('salla:cart.item.removed', (event) => {
                this.updateCartCount(event.detail);
                this.showCartNotification('تم حذف المنتج من السلة');
            });
        },

        // Update cart count
        updateCartCount(cartData) {
            const cartCounts = document.querySelectorAll('.action-count[type="cart"]');
            const count = cartData.items_count || 0;
            
            cartCounts.forEach(countElement => {
                countElement.textContent = count;
                countElement.style.display = count > 0 ? 'flex' : 'none';
            });
        },

        // Show cart notification
        showCartNotification(message) {
            const notification = this.createNotification(message, 'success');
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        },

        // Initialize wishlist
        initWishlist() {
            document.addEventListener('salla:wishlist.updated', (event) => {
                this.updateWishlistCount(event.detail);
            });

            document.addEventListener('salla:wishlist.item.added', (event) => {
                this.showCartNotification('تم إضافة المنتج للمفضلة');
            });

            document.addEventListener('salla:wishlist.item.removed', (event) => {
                this.showCartNotification('تم حذف المنتج من المفضلة');
            });
        },

        // Update wishlist count
        updateWishlistCount(wishlistData) {
            const wishlistCounts = document.querySelectorAll('.action-count[type="wishlist"]');
            const count = wishlistData.items_count || 0;
            
            wishlistCounts.forEach(countElement => {
                countElement.textContent = count;
                countElement.style.display = count > 0 ? 'flex' : 'none';
            });
        },

        // Initialize compare
        initCompare() {
            document.addEventListener('salla:compare.updated', (event) => {
                this.updateCompareCount(event.detail);
            });
        },

        // Update compare count
        updateCompareCount(compareData) {
            const compareCounts = document.querySelectorAll('.action-count[type="compare"]');
            const count = compareData.items_count || 0;
            
            compareCounts.forEach(countElement => {
                countElement.textContent = count;
                countElement.style.display = count > 0 ? 'flex' : 'none';
            });
        },

        // Initialize newsletter
        initNewsletter() {
            const newsletterForms = document.querySelectorAll('.newsletter-form form');
            
            newsletterForms.forEach(form => {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = form.querySelector('input[type="email"]').value;
                    
                    if (this.isValidEmail(email)) {
                        this.subscribeNewsletter(email, form);
                    } else {
                        this.showCartNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
                    }
                });
            });
        },

        // Subscribe to newsletter
        subscribeNewsletter(email, form) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'جاري الإرسال...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                this.showCartNotification('تم الاشتراك بنجاح في النشرة البريدية', 'success');
                form.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        },

        // Create modal
        createModal(id) {
            const modal = document.createElement('div');
            modal.id = id;
            modal.className = 'modal-overlay';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1003;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);

            // Close modal functionality
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-close')) {
                    this.closeModal(modal);
                }
            });

            return modal;
        },

        // Close modal
        closeModal(modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
            }, 300);
        },

        // Create notification
        createNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--info-color)'};
                color: white;
                padding: var(--spacing-md) var(--spacing-lg);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                z-index: 1004;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
            `;
            
            notification.innerHTML = `
                <div class="notification-content">
                    <span>${message}</span>
                    <button class="notification-close" style="background: none; border: none; color: white; margin-right: 10px; cursor: pointer;">&times;</button>
                </div>
            `;

            const closeBtn = notification.querySelector('.notification-close');
            closeBtn.addEventListener('click', () => {
                notification.classList.remove('show');
            });

            notification.classList.add('show');
            return notification;
        },

        // Handle resize
        handleResize() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth >= 768) {
                const mobileMenu = document.querySelector('.mobile-menu');
                const menuToggle = document.getElementById('mobile-menu-toggle');
                
                if (mobileMenu && mobileMenu.classList.contains('open')) {
                    mobileMenu.classList.remove('open');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        },

        // Throttle function
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        },

        // Debounce function
        debounce(func, wait, immediate) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    };

    // Additional utility functions
    const Utils = {
        // Format price
        formatPrice(price, currency = 'SAR') {
            return new Intl.NumberFormat('ar-SA', {
                style: 'currency',
                currency: currency
            }).format(price);
        },

        // Format date
        formatDate(date) {
            return new Intl.DateTimeFormat('ar-SA').format(new Date(date));
        },

        // Get cookie
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },

        // Set cookie
        setCookie(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
        },

        // Remove cookie
        removeCookie(name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
        }
    };

    // Initialize theme when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            Theme.init();
        });
    } else {
        Theme.init();
    }

    // Make theme and utils globally available
    window.NoorTheme = Theme;
    window.ThemeUtils = Utils;

    // Additional CSS for dynamic elements
    const additionalCSS = `
        .notification.show {
            transform: translateX(0);
        }
        
        .modal-content {
            background: white;
            border-radius: var(--border-radius-lg);
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .modal-header {
            padding: var(--spacing-lg);
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-body {
            padding: var(--spacing-lg);
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: var(--font-size-xl);
            cursor: pointer;
            color: var(--text-secondary);
        }
        
        .product-quick-view {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xl);
        }
        
        .product-images img {
            width: 100%;
            border-radius: var(--border-radius);
        }
        
        .product-price {
            font-size: var(--font-size-xl);
            font-weight: 600;
            color: var(--primary-color);
            margin: var(--spacing-md) 0;
        }
        
        .product-actions {
            display: flex;
            gap: var(--spacing-md);
            margin-top: var(--spacing-lg);
        }
        
        @media (max-width: 768px) {
            .product-quick-view {
                grid-template-columns: 1fr;
            }
        }
    `;

    // Inject additional CSS
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);

})();