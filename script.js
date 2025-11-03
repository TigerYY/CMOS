// ===== 全局变量 =====
let isScrolling = false;

// ===== DOM 加载完成后执行 =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ===== 网站初始化 =====
function initializeWebsite() {
    // 初始化导航栏
    initNavigation();
    
    // 初始化滚动效果
    initScrollEffects();
    
    // 初始化动画观察器
    initAnimationObserver();
    
    // 初始化数据动画
    initDataAnimations();
    
    // 初始化表单
    initContactForm();
    
    // 初始化返回顶部按钮
    initBackToTop();
    
    // 初始化进度条动画
    initProgressBars();
    
    // 初始化浮动元素动画
    initFloatingElements();
    
    // 初始化渐变动画
    initGradientAnimations();
    
    console.log('🌊 海洋数字化生态网站已加载完成');
}

// ===== 导航栏功能 =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // 汉堡菜单切换
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 导航链接点击
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 关闭移动端菜单
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                
                // 平滑滚动到目标区域
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
}

// ===== 滚动效果 =====
function initScrollEffects() {
    // 平滑滚动到指定区域
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // 滚动视差效果
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        isScrolling = true;
        requestAnimationFrame(() => {
            updateParallaxEffects();
            updateScrollIndicators();
            isScrolling = false;
        });
    });
}

// ===== 视差效果更新 =====
function updateParallaxEffects() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// ===== 滚动指示器更新 =====
function updateScrollIndicators() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const opacity = Math.max(0, 1 - window.pageYOffset / 500);
        scrollIndicator.style.opacity = opacity;
    }
}

// ===== 动画观察器 =====
function initAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // 特殊处理某些元素
                if (entry.target.hasAttribute('data-counter')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // 观察所有带有 data-aos 属性的元素
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
    
    // 观察其他需要动画的元素
    document.querySelectorAll('.concept-item, .pain-item, .feature-card, .benefit-card, .scenario-card, .mode-card').forEach(element => {
        observer.observe(element);
    });
}

// ===== 数据动画 =====
function initDataAnimations() {
    // 数字计数动画
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        counter.setAttribute('data-counter', 'true');
    });
}

// ===== 计数器动画 =====
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2秒
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===== 时间线动画 =====
function animateTimelineItem(element) {
    const progressBar = element.querySelector('.progress-bar');
    if (progressBar) {
        const progress = progressBar.getAttribute('data-progress');
        setTimeout(() => {
            progressBar.style.width = progress + '%';
        }, 300);
    }
}

// ===== 进度条动画 =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = progress + '%';
                }, 500);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ===== 浮动元素动画 =====
function initFloatingElements() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const delay = card.getAttribute('data-delay') || index * 200;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, delay);
        
        // 添加鼠标悬停效果
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== 联系表单 =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // 表单验证
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// ===== 表单提交处理 =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // 表单验证
    if (!validateForm(data)) {
        return;
    }
    
    // 显示加载状态
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    submitBtn.disabled = true;
    
    // 模拟发送请求
    setTimeout(() => {
        showNotification('消息发送成功！我们会尽快与您联系。', 'success');
        e.target.reset();
        
        // 恢复按钮状态
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// ===== 表单验证 =====
function validateForm(data) {
    let isValid = true;
    
    // 验证必填字段
    const requiredFields = ['name', 'email', 'subject', 'message'];
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            showFieldError(field, '此字段为必填项');
            isValid = false;
        }
    });
    
    // 验证邮箱格式
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', '请输入有效的邮箱地址');
        isValid = false;
    }
    
    return isValid;
}

// ===== 字段验证 =====
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // 清除之前的错误
    clearFieldError(e);
    
    // 验证必填字段
    if (field.hasAttribute('required') && !value) {
        showFieldError(field.name, '此字段为必填项');
        return false;
    }
    
    // 验证邮箱
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field.name, '请输入有效的邮箱地址');
        return false;
    }
    
    return true;
}

// ===== 显示字段错误 =====
function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    // 移除之前的错误信息
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加错误样式
    field.style.borderColor = '#f44336';
    
    // 添加错误信息
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
        color: #f44336;
        font-size: 0.8rem;
        margin-top: 5px;
        animation: fadeIn 0.3s ease;
    `;
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

// ===== 清除字段错误 =====
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '';
}

// ===== 邮箱验证 =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== 通知系统 =====
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 自动移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== 返回顶部按钮 =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // 滚动时显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // 点击返回顶部
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== 卡片悬停效果 =====
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.concept-item, .pain-item, .feature-card, .benefit-card, .scenario-card, .mode-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== 波浪动画 =====
function initWaveAnimation() {
    const waves = document.querySelectorAll('.wave');
    
    waves.forEach((wave, index) => {
        wave.style.animationDelay = `${index * -2}s`;
    });
}

// ===== 技术架构图交互 =====
function initArchitectureDiagram() {
    const archLayers = document.querySelectorAll('.arch-layer');
    
    archLayers.forEach((layer, index) => {
        layer.addEventListener('mouseenter', () => {
            // 高亮当前层
            layer.style.borderColor = 'var(--secondary-blue)';
            layer.style.boxShadow = 'var(--shadow-medium)';
            
            // 淡化其他层
            archLayers.forEach((otherLayer, otherIndex) => {
                if (otherIndex !== index) {
                    otherLayer.style.opacity = '0.6';
                }
            });
        });
        
        layer.addEventListener('mouseleave', () => {
            // 恢复所有层的样式
            archLayers.forEach(otherLayer => {
                otherLayer.style.borderColor = '';
                otherLayer.style.boxShadow = '';
                otherLayer.style.opacity = '1';
            });
        });
    });
}

// ===== 数据可视化动画 =====
function initDataVisualization() {
    // 创建动态数据展示
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateBenefitCard(card);
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(card);
    });
}

// ===== 效益卡片动画 =====
function animateBenefitCard(card) {
    const statNumbers = card.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateStat = () => {
            current += increment;
            if (current < target) {
                statNumber.textContent = Math.floor(current);
                requestAnimationFrame(updateStat);
            } else {
                statNumber.textContent = target;
            }
        };
        
        setTimeout(updateStat, Math.random() * 500);
    });
}

// ===== 响应式处理 =====
function handleResponsive() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaQueryChange(e) {
        if (e.matches) {
            // 移动端处理
            adjustMobileLayout();
        } else {
            // 桌面端处理
            adjustDesktopLayout();
        }
    }
    
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);
}

// ===== 移动端布局调整 =====
function adjustMobileLayout() {
    // 调整浮动元素布局
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
        floatingElements.style.display = 'flex';
        floatingElements.style.flexDirection = 'column';
        floatingElements.style.gap = '20px';
        floatingElements.style.height = 'auto';
    }
    
    // 调整时间线布局
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.flexDirection = 'row';
    });
}

// ===== 桌面端布局调整 =====
function adjustDesktopLayout() {
    // 恢复浮动元素布局
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
        floatingElements.style.display = '';
        floatingElements.style.flexDirection = '';
        floatingElements.style.gap = '';
        floatingElements.style.height = '';
    }
}

// ===== 性能优化 =====
function optimizePerformance() {
    // 图片懒加载
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // 防抖滚动事件
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // 滚动结束后的处理
        }, 100);
    });
}

// ===== 错误处理 =====
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('网站运行错误:', e.error);
        // 可以在这里添加错误上报逻辑
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('未处理的Promise拒绝:', e.reason);
        // 可以在这里添加错误上报逻辑
    });
}

// ===== 添加CSS动画样式 =====
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .navbar.scrolled {
            background: rgba(10, 25, 41, 0.98);
            box-shadow: 0 2px 20px rgba(79, 195, 247, 0.1);
        }
        
        .field-error {
            animation: fadeIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// ===== 初始化所有功能 =====
document.addEventListener('DOMContentLoaded', () => {
    // 添加动态样式
    addDynamicStyles();
    
    // 初始化各种功能
    initCardHoverEffects();
    initWaveAnimation();
    initArchitectureDiagram();
    initDataVisualization();
    handleResponsive();
    optimizePerformance();
    initErrorHandling();
    
    // 初始化渐变相关功能
    initMouseGradientEffect();
    initScrollGradientEffect();
    initTimeBasedGradients();
    
    console.log('🚀 所有功能模块已初始化完成');
});

// ===== 工具函数 =====
// 节流函数
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

// 防抖函数
function debounce(func, wait, immediate) {
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

// 获取随机数
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 格式化数字
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ===== 渐变动画初始化 =====
function initGradientAnimations() {
    // 为卡片添加动态渐变效果
    const cards = document.querySelectorAll('.concept-item, .feature-card, .benefit-card, .scenario-card, .mode-card');
    
    cards.forEach((card, index) => {
        // 添加随机延迟的渐变动画
        const delay = index * 0.5;
        card.style.animationDelay = `${delay}s`;
        
        // 鼠标进入时改变渐变方向
        card.addEventListener('mouseenter', () => {
            card.style.background = `linear-gradient(${Math.random() * 360}deg, 
                rgba(79, 195, 247, 0.15) 0%, 
                rgba(25, 118, 210, 0.1) 50%, 
                rgba(0, 188, 212, 0.08) 100%)`;
        });
        
        // 鼠标离开时恢复原始渐变
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
    
    // 动态改变背景渐变
    setInterval(() => {
        updateBackgroundGradient();
    }, 10000); // 每10秒更新一次背景
}

// ===== 更新背景渐变 =====
function updateBackgroundGradient() {
    const body = document.body;
    const hue1 = Math.random() * 60 + 200; // 蓝色系
    const hue2 = Math.random() * 60 + 180; // 蓝绿色系
    const hue3 = Math.random() * 60 + 220; // 蓝紫色系
    
    const newGradient = `linear-gradient(135deg, 
        hsl(${hue1}, 70%, 15%) 0%, 
        hsl(${hue2}, 60%, 20%) 25%, 
        hsl(${hue3}, 65%, 18%) 50%, 
        hsl(${hue1}, 55%, 12%) 75%, 
        hsl(${hue2}, 70%, 10%) 100%)`;
    
    body.style.background = newGradient;
}

// ===== 鼠标跟踪渐变效果 =====
function initMouseGradientEffect() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        // 更新CSS变量
        document.documentElement.style.setProperty('--mouse-x', mouseX);
        document.documentElement.style.setProperty('--mouse-y', mouseY);
    });
    
    // 为某些元素添加鼠标跟踪效果
    const trackingElements = document.querySelectorAll('.hero-background, .section-dark');
    trackingElements.forEach(element => {
        element.style.background = `radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
            rgba(79, 195, 247, 0.1) 0%, 
            rgba(25, 118, 210, 0.05) 50%, 
            transparent 100%)`;
    });
}

// ===== 滚动渐变效果 =====
function initScrollGradientEffect() {
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        
        // 根据滚动位置改变导航栏渐变
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const hue = 200 + (scrollPercent * 60); // 从蓝色到青色
            navbar.style.background = `linear-gradient(135deg, 
                hsla(${hue}, 70%, 15%, 0.95) 0%, 
                hsla(${hue + 20}, 60%, 25%, 0.1) 100%)`;
        }
        
        // 更新页脚渐变
        const footer = document.querySelector('.footer');
        if (footer && scrollPercent > 0.8) {
            const intensity = (scrollPercent - 0.8) * 5; // 0-1
            footer.style.background = `linear-gradient(135deg, 
                rgba(19, 47, 76, ${0.8 + intensity * 0.2}) 0%, 
                rgba(13, 71, 161, ${0.5 + intensity * 0.3}) 50%, 
                rgba(1, 87, 155, ${0.8 + intensity * 0.2}) 100%)`;
        }
    }, 100));
}

// ===== 时间基础的渐变动画 =====
function initTimeBasedGradients() {
    setInterval(() => {
        const time = Date.now() * 0.001; // 转换为秒
        
        // 更新波浪渐变
        const waves = document.querySelectorAll('.wave');
        waves.forEach((wave, index) => {
            const offset = index * 120; // 每个波浪120度偏移
            const hue = (time * 10 + offset) % 360;
            wave.style.background = `linear-gradient(90deg, 
                hsla(${hue}, 70%, 60%, 0.4) 0%, 
                hsla(${hue + 30}, 65%, 55%, 0.3) 50%, 
                hsla(${hue + 60}, 70%, 60%, 0.4) 100%)`;
        });
        
        // 更新浮动卡片渐变
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const offset = index * 90;
            const hue = (time * 5 + offset) % 360;
            card.style.background = `linear-gradient(135deg, 
                hsla(${hue}, 60%, 70%, 0.15) 0%, 
                hsla(${hue + 45}, 55%, 65%, 0.08) 100%)`;
        });
    }, 100); // 每100ms更新一次
}

// ===== 导出函数供全局使用 =====
window.MarineDigital = {
    scrollToSection,
    showNotification,
    throttle,
    debounce,
    getRandomNumber,
    formatNumber,
    updateBackgroundGradient,
    initMouseGradientEffect,
    initScrollGradientEffect,
    initTimeBasedGradients
};