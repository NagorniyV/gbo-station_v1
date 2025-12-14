// FAQ аккордеон
window.initFAQ = function() {
    console.log('🔧 Инициализация FAQ...');
    
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
    
    console.log('✅ FAQ инициализирован');
};