document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен, оптимизированная инициализация...');

    // ========== ОПТИМИЗАЦИЯ ДЛЯ МОБИЛЬНЫХ ==========
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    let scrollTimeout = null;

    // ========== ОБЩИЕ УТИЛИТЫ (оптимизированные) ==========
    const utils = {
        inViewport: (el) => {
            const rect = el.getBoundingClientRect();
            return rect.top <= (window.innerHeight * 0.8) && rect.bottom >= 0;
        },
        
        // Упрощенная анимация счетчика
        animateCounter: (element, target, duration = 1000) => {
            if (!element || isMobile) {
                element.textContent = target;
                return;
            }
            
            let start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        },
        
        // Отложенная функция для throttle
        debounce: (func, wait) => {
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
    };

    // ========== БУРГЕР-МЕНЮ (оптимизированный) ==========
    const burger = document.getElementById('burgerMenu');
    const header = document.getElementById('header');
    const overlay = document.getElementById('overlay');
    
    if (burger && header && overlay) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = !burger.classList.contains('active');
            
            burger.classList.toggle('active', isActive);
            header.classList.toggle('active', isActive);
            overlay.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
        
        overlay.addEventListener('click', () => {
            burger.classList.remove('active');
            header.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Оптимизация для Android
        if (isMobile) {
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle.parentElement.classList.toggle('active');
                });
            });
        }
    }

    // ========== ПЛАВНАЯ ПРОКРУТКА (оптимизированная) ==========
    if (!isMobile) { // На Android отключаем плавную прокрутку
        document.querySelectorAll('.nav-item a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const top = target.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top, behavior: 'smooth' });
                    
                    if (window.innerWidth <= 768 && burger) {
                        burger.classList.remove('active');
                        header.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
    }

    // ========== АНИМАЦИЯ ХИРО (упрощенная для Android) ==========
    if (!isMobile) {
        setTimeout(() => {
            const title = document.getElementById('animated-title');
            const subtitle = document.getElementById('animated-subtitle');
            
            if (title) title.classList.add('visible');
            if (subtitle) setTimeout(() => subtitle.classList.add('visible'), 500);
        }, 1000);
    } else {
        // На Android сразу показываем без задержки
        const title = document.getElementById('animated-title');
        const subtitle = document.getElementById('animated-subtitle');
        if (title) title.classList.add('visible');
        if (subtitle) subtitle.classList.add('visible');
    }

    // ========== ФОРМА TELEGRAM (оставляем без изменений) ==========
    const form = document.querySelector('.callback-form .form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const data = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                car: document.getElementById('car').value,
                service: document.getElementById('service').value
            };
            
            if (!data.phone) {
                alert('Будь ласка, введіть номер телефону');
                return;
            }
            
            const serviceType = data.service === 'gbo' ? 'Обслуговування ГБО' : 
                             data.service === 'lights' ? 'Обслуговування фар' : 'Не вказано';
            
            const text = `📞 Нова заявка з сайту!\n\n👤 Ім'я: ${data.name || 'Не вказано'}\n📱 Телефон: ${data.phone}\n🚗 Авто: ${data.car || 'Не вказано'}\n🔧 Послуга: ${serviceType}\n⏰ Час: ${new Date().toLocaleString('uk-UA')}`;
            
            const botToken = '8567006740:AAEjnWs1YgLfzhiedvEIoEL_9jFJD8_gzKc';
            const chatIds = ['398501551', '600710233'];
            
            for (const chatId of chatIds) {
                try {
                    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                } catch (error) {
                    console.error('Ошибка отправки:', error);
                }
            }
            
            form.reset();
            alert('Дякуємо! Ваша заявка відправлена.');
        });
    }

    // ========== АНИМАЦИИ ПРИ СКРОЛЛЕ (оптимизированные) ==========
    const animateOnScroll = utils.debounce(() => {
        // На Android отключаем сложные анимации при скролле
        if (isMobile) return;
        
        // SEO блок
        const firstSeoBlock = document.querySelector('.seo-block:first-child');
        if (firstSeoBlock && utils.inViewport(firstSeoBlock)) {
            firstSeoBlock.querySelectorAll('h2, .seo-content p').forEach(el => {
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            });
        }
        
        // Опыт
        const experienceSection = document.getElementById('experience');
        if (experienceSection && utils.inViewport(experienceSection)) {
            const title = document.getElementById('experience-title');
            if (title && !title.classList.contains('visible')) {
                title.classList.add('visible');
            }
            
            document.querySelectorAll('.counter').forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    const target = parseInt(counter.getAttribute('data-target'));
                    utils.animateCounter(counter, target);
                }
            });
        }
        
        // О нас
        document.querySelectorAll('#about-title, .about-section h3, .animate-text, .animate-item').forEach(el => {
            if (utils.inViewport(el) && !el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, isMobile ? 100 : 50); // Больший debounce на мобильных
    
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    window.addEventListener('load', animateOnScroll);
    if (!isMobile) animateOnScroll();

    // ========== КАЛЬКУЛЯТОР ГБО (упрощенный) ==========
    const calculatePayback = utils.debounce(() => {
        const petrol = parseFloat(document.getElementById('petrol-price')?.value) || 0;
        const gas = parseFloat(document.getElementById('gas-price')?.value) || 0;
        const mileage = parseFloat(document.getElementById('monthly-mileage')?.value) || 0;
        const consumption = parseFloat(document.getElementById('fuel-consumption')?.value) || 0;
        const gboPrice = parseFloat(document.getElementById('gbo-kit')?.value) || 0;
        const result = document.getElementById('result');
        
        if (!result || petrol <= 0 || gas <= 0 || mileage <= 0 || consumption <= 0 || gboPrice <= 0) {
            if (result) result.textContent = 'Введіть коректні дані';
            return;
        }
        
        const monthlyConsumption = (mileage / 100) * consumption;
        const monthlySavings = (monthlyConsumption * petrol) - (monthlyConsumption * gas);
        
        if (monthlySavings <= 0) {
            result.textContent = 'Не окупиться';
            return;
        }
        
        const months = gboPrice / monthlySavings;
        result.textContent = 
            months < 1 ? 'Менше 1 місяця' : 
            months > 120 ? 'Більше 10 років' : 
            Math.ceil(months) + ' місяців';
    }, 300);
    
    ['petrol-price', 'gas-price', 'monthly-mileage', 'fuel-consumption', 'gbo-kit'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculatePayback);
    });
    if (document.getElementById('gbo-kit')) calculatePayback();

    // ========== FAQ (оптимизированный) ==========
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                document.querySelectorAll('.faq-item').forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });
                item.classList.toggle('active');
            });
            
            if (index === 0) item.classList.add('active');
        }
    });

    // ========== ЛИПКИЕ КНОПКИ (оптимизированные) ==========
    const phoneBtn = document.getElementById('phoneButton');
    const phonePanel = document.getElementById('phonePanel');
    const scrollBtn = document.getElementById('scrollTopButton');
    
    if (phoneBtn && phonePanel) {
        phoneBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            phonePanel.classList.toggle('active');
        });
        
        // Закрыть при клике вне
        document.addEventListener('click', (e) => {
            if (!phonePanel.contains(e.target) && !phoneBtn.contains(e.target)) {
                phonePanel.classList.remove('active');
            }
        });
    }
    
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: isMobile ? 'auto' : 'smooth' });
        });
        
        const toggleScrollBtn = utils.debounce(() => {
            scrollBtn.classList.toggle('visible', window.pageYOffset > 300);
            if (phonePanel) phonePanel.classList.remove('active');
        }, 150);
        
        toggleScrollBtn();
        window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    }

    // ========== ГАЛЕРЕЯ (упрощенная для Android) ==========
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        let currentImages = [];
        let currentIndex = 0;
        
        const updateGallery = () => {
            const img = document.getElementById('modalImage');
            const counter = document.getElementById('imageCounter');
            const thumbs = document.getElementById('modalThumbnails');
            
            if (!img || !counter || currentImages.length === 0) return;
            
            img.src = currentImages[currentIndex].src;
            img.alt = currentImages[currentIndex].alt;
            counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
            
            if (thumbs) {
                // На Android упрощаем миниатюры
                if (!isMobile) {
                    thumbs.innerHTML = '';
                    currentImages.forEach((image, i) => {
                        const thumb = document.createElement('img');
                        thumb.src = image.src;
                        thumb.alt = image.alt;
                        thumb.classList.toggle('active', i === currentIndex);
                        thumb.addEventListener('click', () => {
                            currentIndex = i;
                            updateGallery();
                        });
                        thumbs.appendChild(thumb);
                    });
                }
            }
        };
        
        // Открытие галереи
        document.querySelectorAll('.gallery-container img').forEach((img, index, images) => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                currentImages = Array.from(images);
                currentIndex = index;
                updateGallery();
                galleryModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Закрытие
        document.getElementById('modalClose')?.addEventListener('click', () => {
            galleryModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        galleryModal.addEventListener('click', (e) => {
            if (e.target === galleryModal || e.target.classList.contains('modal-overlay')) {
                galleryModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Навигация
        document.getElementById('modalPrev')?.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
            updateGallery();
        });
        
        document.getElementById('modalNext')?.addEventListener('click', () => {
            currentIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
            updateGallery();
        });
        
        // Клавиатура только на десктопе
        if (!isMobile) {
            document.addEventListener('keydown', (e) => {
                if (!galleryModal.classList.contains('active')) return;
                
                if (e.key === 'Escape') {
                    galleryModal.classList.remove('active');
                    document.body.style.overflow = '';
                } else if (e.key === 'ArrowLeft') {
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : currentImages.length - 1;
                    updateGallery();
                } else if (e.key === 'ArrowRight') {
                    currentIndex = currentIndex < currentImages.length - 1 ? currentIndex + 1 : 0;
                    updateGallery();
                }
            });
        }
    }

    // ========== ОПТИМИЗАЦИЯ ДЛЯ ANDROID ==========
    if (isMobile) {
        // Отключаем сложные CSS эффекты
        document.querySelectorAll('*').forEach(el => {
            el.style.willChange = 'auto';
        });
        
        // Упрощаем анимации
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Предотвращаем двойной тап для масштабирования
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Оптимизация свайпов
        let touchStartY = 0;
        let touchStartX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        document.addEventListener('touchmove', (e) => {
            // Предотвращаем вертикальный скролл при горизонтальном свайпе в галерее
            if (galleryModal && galleryModal.classList.contains('active')) {
                const touchEndY = e.touches[0].clientY;
                const touchEndX = e.touches[0].clientX;
                const diffX = Math.abs(touchEndX - touchStartX);
                const diffY = Math.abs(touchEndY - touchStartY);
                
                if (diffX > diffY) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    }

    console.log(`✅ Инициализация завершена (${isMobile ? 'Мобильный' : 'Десктоп'} режим)`);
});