document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен, инициализация...');

    // Проверяем мобильное устройство
    const isMobile = window.innerWidth <= 720;
    
    // ========== ОБЩИЕ УТИЛИТЫ ==========
    const utils = {
        inViewport: (el) => {
            const rect = el.getBoundingClientRect();
            return rect.top <= (window.innerHeight * 0.8) && rect.bottom >= 0;
        },
        
        animateCounter: (element, target, duration = 1500) => {
            if (isMobile) {
                // На мобильных оптимизируем анимацию счетчика
                let start = 0;
                const increment = target / (duration / 32); // Медленнее для мобильных
                let current = start;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    element.textContent = Math.floor(current);
                }, 32); // Реже обновляем на мобильных
            } else {
                // На десктопе оригинальная анимация
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
            }
        }
    };

    // ========== БУРГЕР-МЕНЮ ==========
    const burger = document.getElementById('burgerMenu');
    const header = document.getElementById('header');
    const overlay = document.getElementById('overlay');
    
    if (burger && header && overlay) {
        burger.addEventListener('click', () => {
            const isActive = burger.classList.toggle('active');
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
        
        // Выпадающие меню на мобильных
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    toggle.parentElement.classList.toggle('active');
                }
            });
        });
    }

    // ========== ПЛАВНАЯ ПРОКРУТКА ==========
    document.querySelectorAll('.nav-item a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const top = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top, behavior: 'smooth' });
                
                // Закрыть меню на мобильных
                if (window.innerWidth <= 768 && burger) {
                    burger.classList.remove('active');
                    header.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // ========== АНИМАЦИЯ ХИРО ==========
    setTimeout(() => {
        const title = document.getElementById('animated-title');
        const subtitle = document.getElementById('animated-subtitle');
        
        if (title) title.classList.add('visible');
        if (subtitle) setTimeout(() => subtitle.classList.add('visible'), 500);
    }, 1000);

    // ========== ФОРМА TELEGRAM ==========
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

    // ========== АНИМАЦИИ ПРИ СКРОЛЛЕ ==========
    const animateOnScroll = () => {
        // ========== SEO БЛОК (ТОЛЬКО ПЕРВЫЙ) ==========
        // Если мобильное устройство, не добавляем классы анимации для pro-nas секции
        if (!isMobile) {
            // SEO блок (только первый)
            document.querySelectorAll('.seo-block:first-child h2, .seo-block:first-child .seo-content p').forEach(el => {
                if (utils.inViewport(el) && !el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            });
            
            // О нас в pro-nas
            document.querySelectorAll('.pro-nas #about-title, .pro-nas .about-section h3, .pro-nas .animate-text, .pro-nas .animate-item').forEach(el => {
                if (utils.inViewport(el) && !el.classList.contains('visible')) {
                    setTimeout(() => el.classList.add('visible'), Math.random() * 300 + 200);
                }
            });
        } else {
            // На мобильных устройствах сразу показываем все элементы в pro-nas
            document.querySelectorAll('.pro-nas .seo-block:first-child h2, .pro-nas .seo-block:first-child .seo-content p').forEach(el => {
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            });
            
            document.querySelectorAll('.pro-nas #about-title, .pro-nas .about-section h3, .pro-nas .animate-text, .pro-nas .animate-item').forEach(el => {
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            });
        }
        
        // ========== СЕКЦИЯ ОПЫТ (ОБЯЗАТЕЛЬНО РАБОТАЕТ НА ВСЕХ УСТРОЙСТВАХ) ==========
        const experienceSection = document.getElementById('experience');
        if (experienceSection && utils.inViewport(experienceSection)) {
            const title = document.getElementById('experience-title');
            if (title && !title.classList.contains('visible')) {
                title.classList.add('visible');
            }
            
            // Анимация счетчиков
            document.querySelectorAll('.counter').forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    const target = parseInt(counter.getAttribute('data-target'));
                    utils.animateCounter(counter, target);
                }
            });
        }
        
        // ========== ДРУГИЕ АНИМАЦИИ (только на десктопе) ==========
        if (!isMobile) {
            document.querySelectorAll('#about-title, .about-section h3, .animate-text, .animate-item').forEach(el => {
                if (utils.inViewport(el) && !el.classList.contains('visible')) {
                    setTimeout(() => el.classList.add('visible'), Math.random() * 300 + 200);
                }
            });
        }
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    animateOnScroll();

    // ========== КАЛЬКУЛЯТОР ГБО ==========
    const calculatorInputs = ['petrol-price', 'gas-price', 'monthly-mileage', 'fuel-consumption', 'gbo-kit'];
    
    const calculatePayback = () => {
        const values = calculatorInputs.map(id => {
            const el = document.getElementById(id);
            return el ? parseFloat(el.value) : 0;
        });
        
        if (values.some(v => isNaN(v) || v <= 0)) {
            document.getElementById('result').textContent = 'Введіть коректні дані';
            return;
        }
        
        const [petrol, gas, mileage, consumption, gboPrice] = values;
        const monthlyConsumption = (mileage / 100) * consumption;
        const monthlySavings = (monthlyConsumption * petrol) - (monthlyConsumption * gas);
        
        if (monthlySavings <= 0) {
            document.getElementById('result').textContent = 'Не окупиться';
            return;
        }
        
        const months = gboPrice / monthlySavings;
        document.getElementById('result').textContent = 
            months < 1 ? 'Менше 1 місяця' : 
            months > 120 ? 'Більше 10 років' : 
            Math.ceil(months) + ' місяців';
    };
    
    calculatorInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', calculatePayback);
    });
    if (document.getElementById('gbo-kit')) calculatePayback();

    // ========== FAQ ==========
    document.querySelectorAll('.faq-item').forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                document.querySelectorAll('.faq-item').forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });
                item.classList.toggle('active');
            });
            
            // Открыть первый вопрос
            if (index === 0) item.classList.add('active');
        }
    });

    // ========== ЛИПКИЕ КНОПКИ ==========
    const phoneBtn = document.getElementById('phoneButton');
    const phonePanel = document.getElementById('phonePanel');
    const scrollBtn = document.getElementById('scrollTopButton');
    
    if (phoneBtn && phonePanel) {
        phoneBtn.addEventListener('click', () => {
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        const toggleScrollBtn = () => {
            scrollBtn.classList.toggle('visible', window.pageYOffset > 300);
            if (phonePanel) phonePanel.classList.remove('active');
        };
        
        toggleScrollBtn();
        window.addEventListener('scroll', toggleScrollBtn);
    }

    // ========== ГАЛЕРЕЯ ==========
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        let currentImages = [];
        let currentIndex = 0;
        
        const updateGallery = () => {
            const img = document.getElementById('modalImage');
            const counter = document.getElementById('imageCounter');
            const thumbs = document.getElementById('modalThumbnails');
            
            if (!img || !counter) return;
            
            if (currentImages.length > 0) {
                img.src = currentImages[currentIndex].src;
                img.alt = currentImages[currentIndex].alt;
                counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
            }
            
            if (thumbs) {
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
        };
        
        // Открытие галереи
        document.querySelectorAll('.gallery-container img').forEach((img, index, images) => {
            img.addEventListener('click', () => {
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
        
        // Клавиатура
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

    console.log('✅ Все модули инициализированы');
});