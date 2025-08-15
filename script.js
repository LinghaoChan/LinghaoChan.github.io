// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const isActive = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            
            // 只控制侧边栏和遮罩层
            if (sidebar) {
                sidebar.classList.toggle('active');
            }
            if (mobileOverlay) {
                mobileOverlay.classList.toggle('active');
            }
        });
    }

    // 点击遮罩层关闭菜单
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            mobileOverlay.classList.remove('active');
        });
    }

    // 点击导航链接后关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) hamburger.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            
            // 更新活动状态
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 监听窗口大小变化，处理菜单状态
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            // 桌面端：关闭所有移动端菜单
            if (hamburger) hamburger.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // 滚动时更新导航状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 数字计数动画
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent.replace(/\D/g, ''));
                const count = parseInt(counter.innerText.replace(/\D/g, ''));

                if (count < target) {
                    const increment = target / speed;
                    counter.innerText = Math.ceil(count + increment) + '+';
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target + '+';
                }
            };

            // 设置初始值
            counter.setAttribute('data-target', counter.textContent.replace(/\D/g, ''));
            counter.innerText = '0+';
            updateCount();
        });
    }

    // 监听滚动，当统计数字区域进入视口时触发动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about-stats')) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
                // 为其他元素添加淡入动画
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.about-stats, .research-card, .project-card, .publication-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;

            // 简单的表单验证
            if (!name || !email || !subject || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }

            // 模拟发送邮件
            showNotification('正在发送消息...', 'info');
            
            setTimeout(() => {
                showNotification('消息发送成功！我会尽快回复您。', 'success');
                this.reset();
            }, 2000);
        });
    }

    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 通知函数
    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // 样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
        `;

        // 根据类型设置背景色
        switch (type) {
            case 'success':
                notification.style.background = '#10b981';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            case 'info':
                notification.style.background = '#3b82f6';
                break;
            default:
                notification.style.background = '#6b7280';
        }

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });



    // 懒加载图片
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src || img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // 页面加载完成后的初始化动画
    window.addEventListener('load', function() {
        // 主页标题动画
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');

        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
        }

        if (heroSubtitle) {
            heroSubtitle.style.opacity = '0';
            heroSubtitle.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 500);
        }

        if (heroDescription) {
            heroDescription.style.opacity = '0';
            heroDescription.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroDescription.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, 700);
        }

        if (heroButtons) {
            heroButtons.style.opacity = '0';
            heroButtons.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroButtons.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroButtons.style.opacity = '1';
                heroButtons.style.transform = 'translateY(0)';
            }, 900);
        }
    });

    // 添加打字机效果到主标题
    function typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // 为技能标签添加随机动画延迟
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.style.animation = 'fadeInUp 0.6s ease forwards';
    });

    // 添加CSS关键帧动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .skill-tag {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

    console.log('个人学术主页已加载完成！');
    
    // 动态侧边栏宽度调整
    initSidebarResizer();
});

// 动态侧边栏宽度调整功能
function initSidebarResizer() {
    // 只在桌面端启用
    if (window.innerWidth <= 768) return;
    
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    // 恢复用户偏好的宽度
    const savedWidth = localStorage.getItem('sidebar-width');
    if (savedWidth) {
        document.documentElement.style.setProperty('--sidebar-width', savedWidth + 'px');
    }
    
    // 创建调整器
    const resizer = document.createElement('div');
    resizer.className = 'sidebar-resizer';
    resizer.innerHTML = '<span></span>';
    sidebar.appendChild(resizer);
    
    let isResizing = false;
    let startX = 0;
    let startWidth = 0;
    
    resizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = parseInt(window.getComputedStyle(sidebar).width, 10);
        document.body.style.cursor = 'col-resize';
        document.addEventListener('mousemove', doResize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    });
    
    function doResize(e) {
        if (!isResizing) return;
        
        const width = startWidth + e.clientX - startX;
        const minWidth = 280;
        const maxWidth = Math.min(600, window.innerWidth * 0.4);
        const newWidth = Math.max(minWidth, Math.min(maxWidth, width));
        
        document.documentElement.style.setProperty('--sidebar-width', newWidth + 'px');
    }
    
    function stopResize() {
        isResizing = false;
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', doResize);
        document.removeEventListener('mouseup', stopResize);
        
        // 保存用户偏好
        const currentWidth = parseInt(window.getComputedStyle(sidebar).width, 10);
        localStorage.setItem('sidebar-width', currentWidth);
    }
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (resizer.parentNode) {
                resizer.remove();
            }
        } else if (!document.querySelector('.sidebar-resizer')) {
            initSidebarResizer();
        }
    });
}

// 移动端触摸手势支持
if ('ontouchstart' in window) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    // 侧边栏滑动手势
    if (sidebar) {
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchEndX - touchStartX;
            
            // 从左向右滑动打开侧边栏
            if (swipeDistance > swipeThreshold && touchStartX < 50 && window.innerWidth <= 768) {
                if (hamburger) hamburger.classList.add('active');
                if (sidebar) sidebar.classList.add('active');
                if (mobileOverlay) mobileOverlay.classList.add('active');
            }
            
            // 从右向左滑动关闭侧边栏
            if (swipeDistance < -swipeThreshold && sidebar && sidebar.classList.contains('active')) {
                if (hamburger) hamburger.classList.remove('active');
                if (sidebar) sidebar.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
            }
        }
    }
}    // 背景样式切换功能
    const backgroundOptions = [
        '', // 默认渐变
        'geometric-bg',
        'academic-bg', 
        'tech-bg',
        'wave-bg',
        'hexagon-bg',
        'particles-bg',
        'tsinghua-bg',
        'personal-bg',
        'personal-light-bg',
        'personal-glass-bg'
    ];

let currentBgIndex = 0;

// 创建背景切换按钮（可选，用于测试）
function createBackgroundSwitcher() {
    const switcher = document.createElement('div');
    switcher.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255,255,255,0.9);
        padding: 10px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 9999;
        font-size: 12px;
        color: #333;
        cursor: pointer;
        user-select: none;
        display: none; /* 默认隐藏，可以通过控制台显示 */
    `;
    switcher.textContent = '切换背景';
    switcher.addEventListener('click', switchBackground);
    document.body.appendChild(switcher);
    
    // 在控制台显示切换器的方法
    window.showBackgroundSwitcher = () => {
        switcher.style.display = 'block';
    };
}

function switchBackground() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    // 移除当前背景类
    backgroundOptions.forEach(bg => {
        if (bg) sidebar.classList.remove(bg);
    });
    
    // 切换到下一个背景
    currentBgIndex = (currentBgIndex + 1) % backgroundOptions.length;
    if (backgroundOptions[currentBgIndex]) {
        sidebar.classList.add(backgroundOptions[currentBgIndex]);
    }
    
    console.log(`切换到背景: ${backgroundOptions[currentBgIndex] || '默认渐变'}`);
}

// 应用指定的背景样式
function applyBackground(backgroundName) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    // 移除所有背景类
    backgroundOptions.forEach(bg => {
        if (bg) sidebar.classList.remove(bg);
    });
    
    // 应用新背景
    if (backgroundName && backgroundOptions.includes(backgroundName)) {
        sidebar.classList.add(backgroundName);
    }
}

// 初始化背景切换器
createBackgroundSwitcher();

});