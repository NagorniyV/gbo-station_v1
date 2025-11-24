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
                    animateCounter(counter, target, 2000);
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
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Функция для запуска анимаций
function initAboutAnimations() {
    const aboutSection = document.getElementById('gbo-station');
    const elementsToAnimate = document.querySelectorAll('#about-title, .about-section h3, .animate-text, .animate-item');
    let animated = false;

    function checkAnimation() {
        if (!animated && isElementInViewport(aboutSection)) {
            animated = true;
            
            // Добавляем класс visible всем элементам с задержками
            elementsToAnimate.forEach(element => {
                element.classList.add('visible');
            });
        }
    }

    // Проверяем при загрузке и скролле
    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('load', checkAnimation);
    checkAnimation(); // Проверить сразу
}

// Запускаем при загрузке DOM
document.addEventListener('DOMContentLoaded', initAboutAnimations);