// 主要 JavaScript 功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initScrollEffects();
    initSmoothScroll();
    initShareButtons();
    initLoadingAnimations();
    initMobileMenu();
});

// 導航欄功能
function initNavbar() {
    const navbar = document.querySelector('.site-header');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    // 滾動時導航欄樣式變化
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 滾動方向檢測
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // 移動端菜單切換
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
        
        // 點擊菜單項目後關閉菜單
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            });
        });
        
        // 點擊外部關閉菜單
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                navbarMenu.classList.remove('active');
                navbarToggle.classList.remove('active');
            }
        });
    }
}

// 移動端菜單
function initMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // 防止背景滾動
            if (menu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 視窗大小改變時重置菜單
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// 滾動效果
function initScrollEffects() {
    // 滾動顯示動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // 延遲動畫
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.animationDelay = `${delay}ms`;
            }
        });
    }, observerOptions);
    
    // 觀察需要動畫的元素
    const animatedElements = document.querySelectorAll('.post-card, .category-card, .hero-content');
    animatedElements.forEach((el, index) => {
        el.dataset.delay = index * 100; // 階梯式動畫
        observer.observe(el);
    });
    
    // 視差滾動效果（輕微）
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-section');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// 平滑滾動
function initSmoothScroll() {
    // 處理錨點連結
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 返回頂部按鈕
    createBackToTopButton();
}

// 建立返回頂部按鈕
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTop.setAttribute('aria-label', '返回頂部');
    
    // 樣式
    Object.assign(backToTop.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--gradient)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
        opacity: '0',
        transform: 'translateY(100px)',
        transition: 'all 0.3s ease',
        zIndex: '1000',
        boxShadow: '0 4px 20px rgba(0, 245, 255, 0.3)'
    });
    
    document.body.appendChild(backToTop);
    
    // 滾動顯示/隱藏
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(100px)';
        }
    });
    
    // 點擊返回頂部
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 懸停效果
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform += ' scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = backToTop.style.transform.replace(' scale(1.1)', '');
    });
}

// 分享功能
function initShareButtons() {
    // 複製連結功能
    window.copyToClipboard = function(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('連結已複製到剪貼板！', 'success');
            }).catch(() => {
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    };
    
    // 備用複製方法
    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('連結已複製到剪貼板！', 'success');
        } catch (err) {
            showNotification('複製失敗，請手動複製連結', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    // 分享按鈕增強
    const shareButtons = document.querySelectorAll('.share-button');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 添加點擊動畫
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 通知系統
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 樣式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // 類型樣式
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #2196f3, #1976d2)';
    }
    
    document.body.appendChild(notification);
    
    // 顯示動畫
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自動消失
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 載入動畫
function initLoadingAnimations() {
    // 圖片懶載入
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.classList.add('loading');
        imageObserver.observe(img);
    });
    
    // 內容載入動畫
    const contentBlocks = document.querySelectorAll('.post-card, .category-card');
    contentBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            block.style.transition = 'all 0.6s ease';
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 搜索功能（如果需要）
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
        
        // 點擊外部關閉搜索結果
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}

// 執行搜索
function performSearch(query) {
    // 這裡可以實現客戶端搜索或調用搜索 API
    console.log('搜索:', query);
}

// 表單增強
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // 表單驗證
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
        
        // 輸入框聚焦效果
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    });
}

// 表單驗證
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// 鍵盤導航
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC 鍵關閉模態框或菜單
        if (e.key === 'Escape') {
            const activeMenu = document.querySelector('.navbar-menu.active');
            if (activeMenu) {
                activeMenu.classList.remove('active');
                document.querySelector('.navbar-toggle').classList.remove('active');
            }
        }
        
        // 空格鍵和回車鍵處理
        if (e.key === ' ' || e.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('post-card')) {
                const link = focusedElement.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        }
    });
}

// 性能優化
function initPerformanceOptimizations() {
    // 圖片預載入
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach(img => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = img.src;
        document.head.appendChild(preloadLink);
    });
    
    // 字體預載入
    const fontUrls = [
        'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap'
    ];
    
    fontUrls.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

// 主題切換（如果需要亮色主題）
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
        
        // 載入保存的主題
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// 錯誤處理
window.addEventListener('error', function(e) {
    console.error('JavaScript 錯誤:', e.error);
    // 可以在這裡發送錯誤報告到分析服務
});

// 頁面載入完成後的初始化
window.addEventListener('load', function() {
    // 移除載入指示器
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // 初始化其他功能
    initKeyboardNavigation();
    initPerformanceOptimizations();
    initForms();
});

// Service Worker 註冊（如果有）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW 註冊成功:', registration);
            })
            .catch(registrationError => {
                console.log('SW 註冊失敗:', registrationError);
            });
    });
}

// 導出功能供外部使用
window.BlogTheme = {
    showNotification,
    copyToClipboard: window.copyToClipboard,
    initSearch,
    performSearch
};
