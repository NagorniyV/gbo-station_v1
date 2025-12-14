// Липкие кнопки (телефон и скролл вверх)
window.initStickyButtons = function() {
    console.log('🔧 Инициализация липких кнопок...');
    
    const phoneBtn = document.getElementById('phoneButton');
    const phonePanel = document.getElementById('phonePanel');
    const scrollBtn = document.getElementById('scrollTopButton');
    
    // Кнопка телефона
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
    
    // Кнопка скролла вверх
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
    
    console.log('✅ Липкие кнопки инициализированы');
};