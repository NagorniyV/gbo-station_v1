// Инициализация формы Telegram
window.initForms = function() {
    console.log('🔧 Инициализация форм...');
    
    const form = document.querySelector('.callback-form .form');
    if (!form) {
        console.log('⚠️ Форма не найдена');
        return;
    }
    
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
        
        // Отправка в Telegram
        const botToken = '8567006740:AAEjnWs1YgLfzhiedvEIoEL_9jFJD8_gzKc';
        const chatIds = ['398501551', '600710233'];
        
        let success = false;
        
        for (const chatId of chatIds) {
            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`);
                if (response.ok) {
                    success = true;
                }
            } catch (error) {
                console.error('Ошибка отправки в Telegram:', error);
            }
        }
        
        if (success) {
            form.reset();
            alert('Дякуємо! Ваша заявка відправлена.');
            console.log('✅ Форма отправлена успешно');
        } else {
            alert('Помилка відправки. Спробуйте ще раз.');
        }
    });
    
    console.log('✅ Формы инициализированы');
};