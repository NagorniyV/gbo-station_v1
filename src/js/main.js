// ОБЪЕДИНЕННЫЙ ФАЙЛ JS - ВСЕ ФУНКЦИИ В ОДНОМ DOMContentLoaded

document.addEventListener('DOMContentLoaded', function() {
    // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
    
    // Функция для проверки видимости элемента в viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // ========== АНИМАЦИЯ ПЕРВОГО SEO БЛОКА ==========
    function initFirstSEOAnimation() {
        const firstSeoBlock = document.querySelector('.seo-block:first-child');
        if (!firstSeoBlock) {
            console.log('❌ Первый SEO блок не найден');
            return;
        }
        
        const elementsToAnimate = firstSeoBlock.querySelectorAll('h2, .seo-content p');
        
        if (elementsToAnimate.length === 0) {
            console.log('❌ Элементы для анимации в первом SEO блоке не найдены');
            return;
        }
        
        function checkAnimation() {
            elementsToAnimate.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('visible')) {
                    element.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', checkAnimation);
        window.addEventListener('load', checkAnimation);
        checkAnimation();
        
        console.log('✅ Анимация первого SEO блока инициализирована');
    }

    // ========== БУРГЕР-МЕНЮ И НАВИГАЦИЯ ==========
    function initBurgerMenu() {
        const burgerMenu = document.getElementById('burgerMenu');
        const header = document.getElementById('header');
        const overlay = document.getElementById('overlay');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        if (!burgerMenu || !header || !overlay) {
            console.log('❌ Элементы бургер-меню не найдены');
            return;
        }
        
        // Открытие/закрытие меню на мобильных
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            header.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = header.classList.contains('active') ? 'hidden' : '';
        });
        
        // Закрытие меню при клике на оверлей
        overlay.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            header.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Обработка выпадающих меню на мобильных
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const dropdown = this.parentElement;
                    dropdown.classList.toggle('active');
                }
            });
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !header.contains(e.target) && 
                !burgerMenu.contains(e.target) && 
                header.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                header.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Закрытие выпадающих меню при изменении размера окна
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                burgerMenu.classList.remove('active');
                header.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // Сброс активных выпадающих меню
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
        
        console.log('✅ Бургер-меню инициализировано');
    }

    // ========== ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРЯМ ==========
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-item a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const href = this.getAttribute('href');
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем меню на мобильных
                    if (window.innerWidth <= 768) {
                        const burgerMenu = document.getElementById('burgerMenu');
                        const header = document.getElementById('header');
                        const overlay = document.getElementById('overlay');
                        
                        burgerMenu?.classList.remove('active');
                        header?.classList.remove('active');
                        overlay?.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        console.log('✅ Плавная прокрутка инициализирована');
    }

// ========== АНИМАЦИЯ ЗАГОЛОВКА ХИРО ==========
function initHeroAnimation() {
    setTimeout(function() {
        const animatedTitle = document.getElementById('animated-title');
        const animatedSubtitle = document.getElementById('animated-subtitle');
        
        if (animatedTitle) {
            animatedTitle.classList.add('visible');
            console.log('✅ Анимация заголовка активирована');
            
            // Ждем завершения анимации заголовка, затем показываем субтитл
            setTimeout(() => {
                if (animatedSubtitle) {
                    animatedSubtitle.classList.add('visible');
                    console.log('✅ Анимация субтитра активирована');
                }
            }, 500); // Задержка 500ms (соответствует CSS задержке)
        }
    }, 1000); // Общая задержка для начала анимации
}

    // ========== ОТПРАВКА ФОРМЫ В TELEGRAM ==========
    function initTelegramForm() {
        const form = document.querySelector('.callback-form .form');
        
        if (!form) {
            console.log('❌ Форма не найдена');
            return;
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные из формы
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                car: document.getElementById('car').value,
                service: document.getElementById('service').value
            };
            
            console.log('📝 Данные формы:', formData);
            
            // Проверяем обязательные поля
            if (!formData.phone) {
                alert('Будь ласка, введіть номер телефону');
                return;
            }
            
            // Отправляем в Telegram
            sendToTelegram(formData);
            
            // Очищаем форму после отправки
            form.reset();
            
            // Показываем сообщение об успехе
            alert('Дякуємо! Ваша заявка відправлена. Ми зв\'яжемося з вами найближчим часом.');
        });
        
        console.log('✅ Форма Telegram инициализирована');
    }

    // Функция отправки в Telegram
    function sendToTelegram(data) {
        console.log('🟢 sendToTelegram ВЫЗВАНА!', data);
        
        const botToken = '8567006740:AAEjnWs1YgLfzhiedvEIoEL_9jFJD8_gzKc';
        const chatIds = ['398501551', '600710233'];
        
        // Определяем тип услуги
        let serviceType = 'Не вказано';
        if (data.service === 'gbo') serviceType = 'Обслуговування ГБО';
        if (data.service === 'lights') serviceType = 'Обслуговування фар';
        
        // Кодируем сообщение для URL
        const text = encodeURIComponent(
            `📞 Нова заявка з сайту!\n\n👤 Ім'я: ${data.name || 'Не вказано'}\n📱 Телефон: ${data.phone}\n🚗 Авто: ${data.car || 'Не вказано'}\n🔧 Послуга: ${serviceType}\n⏰ Час: ${new Date().toLocaleString('uk-UA')}`
        );
        
        console.log('🟡 Закодированное сообщение:', text);

        // Отправляем сообщение всем в массиве
        chatIds.forEach((chatId, index) => {
            console.log(`🟡 Отправка ${index + 1}/${chatIds.length} для chat_id: ${chatId}`);
            
            const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}&parse_mode=HTML`;
            
            console.log('🟡 URL запроса:', url);
            
            // Используем fetch с обработкой ошибок
            fetch(url)
                .then(response => {
                    console.log(`🟡 Ответ получен для ${chatId}, статус:`, response.status);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    console.log(`✅ Результат для ${chatId}:`, result);
                    if (result.ok) {
                        console.log(`✅ УСПЕХ: Сообщение отправлено в Telegram для ${chatId}`);
                    } else {
                        console.error(`❌ ОШИБКА Telegram для ${chatId}:`, result.description);
                    }
                })
                .catch(error => {
                    console.error(`❌ ОШИБКА сети для ${chatId}:`, error);
                });
        });
        
        console.log('🟢 sendToTelegram ЗАВЕРШЕНА');
    }

    // ========== АНИМАЦИИ СЕКЦИИ ОПЫТА ==========
    function initExperienceAnimations() {
        const experienceSection = document.getElementById('experience');
        const title = document.getElementById('experience-title');
        const counters = document.querySelectorAll('.counter');
        
        if (!experienceSection || !title) {
            console.log('❌ Секция опыта не найдена');
            return;
        }
        
        let animated = false;

        function checkAnimation() {
            if (!animated && isElementInViewport(experienceSection)) {
                animated = true;
                
                // Анимация заголовка через 1 секунду
                setTimeout(() => {
                    title.classList.add('visible');
                }, 1000);
                
                // Анимация счетчиков через 1.5 секунды (после заголовка)
                setTimeout(() => {
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        animateCounter(counter, target, 1500);
                    });
                }, 1500);
                
                console.log('✅ Анимации опыта активированы');
            }
        }

        // Проверяем при загрузке и скролле
        window.addEventListener('scroll', checkAnimation);
        window.addEventListener('load', checkAnimation);
        checkAnimation(); // Проверить сразу
    }

    // Функция для анимации счетчика
    function animateCounter(counterElement, targetNumber, duration = 2000) {
        let startNumber = 0;
        const increment = targetNumber / (duration / 16); // 60 FPS
        let currentNumber = startNumber;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            counterElement.textContent = Math.floor(currentNumber);
        }, 16);
    }

    // ========== АНИМАЦИИ СЕКЦИИ "О НАС" ==========
    function initAboutAnimations() {
        const elementsToAnimate = document.querySelectorAll('#about-title, .about-section h3, .animate-text, .animate-item');
        
        if (elementsToAnimate.length === 0) {
            console.log('❌ Элементы для анимации "О нас" не найдены');
            return;
        }
        
        function checkAnimation() {
            elementsToAnimate.forEach(element => {
                if (isElementInViewport(element) && !element.classList.contains('visible')) {
                    // Добавляем небольшую случайную задержку для естественности
                    const delay = Math.random() * 300 + 200; // 200-500ms
                    setTimeout(() => {
                        element.classList.add('visible');
                    }, delay);
                }
            });
        }

        // Проверяем при загрузке и скролле
        window.addEventListener('scroll', checkAnimation);
        window.addEventListener('load', checkAnimation);
        checkAnimation(); // Проверить сразу
        
        console.log('✅ Анимации "О нас" инициализированы');
    }

    // ========== КАЛЬКУЛЯТОР ОКУПАЕМОСТИ ГБО ==========
    function initCalculator() {
        const petrolInput = document.getElementById('petrol-price');
        const gasInput = document.getElementById('gas-price');
        const mileageInput = document.getElementById('monthly-mileage');
        const consumptionInput = document.getElementById('fuel-consumption');
        const gboKitSelect = document.getElementById('gbo-kit');
        
        if (!petrolInput || !gasInput || !mileageInput || !consumptionInput || !gboKitSelect) {
            console.log('❌ Элементы калькулятора не найдены');
            return;
        }
        
        // Добавляем обработчики событий для всех полей ввода
        petrolInput.addEventListener('input', calculatePayback);
        gasInput.addEventListener('input', calculatePayback);
        mileageInput.addEventListener('input', calculatePayback);
        consumptionInput.addEventListener('input', calculatePayback);
        gboKitSelect.addEventListener('change', calculatePayback);
        
        // Выполняем первоначальный расчет
        calculatePayback();
        
        console.log('✅ Калькулятор инициализирован');
    }

    // Функция для расчета окупаемости
    function calculatePayback() {
        // Получаем значения из полей ввода
        const petrolPrice = parseFloat(document.getElementById('petrol-price').value);
        const gasPrice = parseFloat(document.getElementById('gas-price').value);
        const monthlyMileage = parseFloat(document.getElementById('monthly-mileage').value);
        const fuelConsumption = parseFloat(document.getElementById('fuel-consumption').value);
        const gboKitPrice = parseFloat(document.getElementById('gbo-kit').value);
        
        // Проверяем корректность введенных данных
        if (isNaN(petrolPrice) || isNaN(gasPrice) || isNaN(monthlyMileage) || 
            isNaN(fuelConsumption) || isNaN(gboKitPrice) || 
            petrolPrice <= 0 || gasPrice <= 0 || monthlyMileage <= 0 || 
            fuelConsumption <= 0 || gboKitPrice <= 0) {
            document.getElementById('result').textContent = 'Введіть коректні дані';
            return;
        }
        
        // Рассчитываем расход топлива в месяц
        const monthlyFuelConsumption = (monthlyMileage / 100) * fuelConsumption;
        
        // Рассчитываем стоимость топлива в месяц
        const monthlyPetrolCost = monthlyFuelConsumption * petrolPrice;
        const monthlyGasCost = monthlyFuelConsumption * gasPrice;
        
        // Рассчитываем экономию в месяц
        const monthlySavings = monthlyPetrolCost - monthlyGasCost;
        
        // Рассчитываем окупаемость (в месяцах)
        if (monthlySavings <= 0) {
            document.getElementById('result').textContent = 'Не окупиться';
            return;
        }
        
        const paybackMonths = gboKitPrice / monthlySavings;
        
        // Отображаем результат
        if (paybackMonths < 1) {
            document.getElementById('result').textContent = 'Менше 1 місяця';
        } else if (paybackMonths > 120) { // 10 лет
            document.getElementById('result').textContent = 'Більше 10 років';
        } else {
            document.getElementById('result').textContent = Math.ceil(paybackMonths) + ' місяців';
        }
    }

    // ========== FAQ СЕКЦИЯ ==========
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            console.log('❌ FAQ элементы не найдены');
            return;
        }
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Закриваємо всі інші відкриті питання
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Перемикаємо поточний елемент
                item.classList.toggle('active');
            });
        });
        
        // Відкриваємо перше питання за замовчуванням
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
        
        console.log('✅ FAQ инициализирован');
    }

    // ========== ЛИПКИЕ КНОПКИ ==========
function initStickyButtons() {
    const phoneButton = document.getElementById('phoneButton');
    const phonePanel = document.getElementById('phonePanel');
    const scrollTopButton = document.getElementById('scrollTopButton');
    
    if (!phoneButton || !scrollTopButton) {
        console.log('❌ Липкие кнопки не найдены');
        return;
    }
    
    // Обработка кнопки телефона
    phoneButton.addEventListener('click', function() {
        phonePanel.classList.toggle('active');
        
        // Закрываем панель при клике вне ее
        if (phonePanel.classList.contains('active')) {
            setTimeout(() => {
                document.addEventListener('click', closePhonePanelOnClickOutside);
            }, 10);
        } else {
            document.removeEventListener('click', closePhonePanelOnClickOutside);
        }
    });
    
    // Функция для закрытия панели телефона при клике вне ее
    function closePhonePanelOnClickOutside(e) {
        if (!phonePanel.contains(e.target) && !phoneButton.contains(e.target)) {
            phonePanel.classList.remove('active');
            document.removeEventListener('click', closePhonePanelOnClickOutside);
        }
    }
    
    // Обработка кнопки прокрутки вверх
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Показывать/скрывать кнопку прокрутки вверх при скролле
    function toggleScrollTopButton() {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    }
    
    // Закрывать панель телефона при скролле
    function closePhonePanelOnScroll() {
        if (phonePanel.classList.contains('active')) {
            phonePanel.classList.remove('active');
            document.removeEventListener('click', closePhonePanelOnClickOutside);
        }
    }
    
    // Начальное состояние и обработчики событий
    toggleScrollTopButton();
    window.addEventListener('scroll', function() {
        toggleScrollTopButton();
        closePhonePanelOnScroll();
    });
    
    console.log('✅ Липкие кнопки инициализированы');
}

    // ========== ЗАПУСК ВСЕХ ИНИЦИАЛИЗАЦИЙ ==========
    
    // Запускаем все функции инициализации
    initFirstSEOAnimation(); // ДОБАВЬ ЭТУ СТРОЧКУ ВНУТРЬ DOMContentLoaded
    initBurgerMenu();
    initSmoothScroll();
    initHeroAnimation();
    initTelegramForm();
    initExperienceAnimations();
    initAboutAnimations();
    initCalculator();
    initFAQ();
    initStickyButtons();
    
    console.log('✅ Все модули JavaScript инициализированы');
});