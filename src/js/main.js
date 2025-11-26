// ЗАГОЛОВОК ХИРО
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function() {
        document.getElementById('animated-title').classList.add('visible');
    }, 1000);
});


// Функция отправки в Telegram - адаптированная для вашей формы
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

// Обработчик отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.callback-form .form');
    
    if (form) {
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
    }
});

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

// Функция для проверки видимости секции
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Основная функция для запуска анимаций
function initExperienceAnimations() {
    const experienceSection = document.getElementById('experience');
    const title = document.getElementById('experience-title');
    const counters = document.querySelectorAll('.counter');
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
        }
    }

    // Проверяем при загрузке и скролле
    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('load', checkAnimation);
    checkAnimation(); // Проверить сразу
}

// Запускаем при загрузке DOM
document.addEventListener('DOMContentLoaded', initExperienceAnimations);

// СБОР ТЕКСТА
// Функция для проверки видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

// Функция для запуска анимаций
function initAboutAnimations() {
    const elementsToAnimate = document.querySelectorAll('#about-title, .about-section h3, .animate-text, .animate-item');
    
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
}

// Запускаем при загрузке DOM
document.addEventListener('DOMContentLoaded', initAboutAnimations);

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
        
        // Добавляем обработчики событий для всех полей ввода
        document.getElementById('petrol-price').addEventListener('input', calculatePayback);
        document.getElementById('gas-price').addEventListener('input', calculatePayback);
        document.getElementById('monthly-mileage').addEventListener('input', calculatePayback);
        document.getElementById('fuel-consumption').addEventListener('input', calculatePayback);
        document.getElementById('gbo-kit').addEventListener('change', calculatePayback);
        
        // Выполняем первоначальный расчет
        calculatePayback();

// FAQ СЕКЦИЯ

document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
        
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
    });