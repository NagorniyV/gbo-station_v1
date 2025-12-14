// Главный файл - инициализация всех модулей
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен, начинаем инициализацию модулей...');
    
    // Проверяем, что все необходимые модули загружены
    const requiredModules = [
        'utils',
        'initHeader',
        'initForms',
        'initAnimations',
        'initCalculator',
        'initFAQ',
        'initStickyButtons'
    ];
    
    let missingModules = [];
    
    requiredModules.forEach(module => {
        if (module === 'utils' && !window.utils) {
            missingModules.push(module);
        } else if (module !== 'utils' && typeof window[module] !== 'function') {
            missingModules.push(module);
        }
    });
    
    if (missingModules.length > 0) {
        console.error('❌ Отсутствуют модули:', missingModules);
        return;
    }
    
    // Инициализируем модули в правильном порядке
    try {
        // 1. Утилиты (уже загружены)
        console.log('🔧 utils ✓');
        
        // 2. Хедер и навигация
        if (typeof window.initHeader === 'function') {
            window.initHeader();
        }
        
        // 3. Формы
        if (typeof window.initForms === 'function') {
            window.initForms();
        }
        
        // 4. Анимации
        if (typeof window.initAnimations === 'function') {
            window.initAnimations();
        }
        
        // 5. Калькулятор
        if (typeof window.initCalculator === 'function') {
            window.initCalculator();
        }
        
        // 6. FAQ
        if (typeof window.initFAQ === 'function') {
            window.initFAQ();
        }
        
        // 7. Липкие кнопки
        if (typeof window.initStickyButtons === 'function') {
            window.initStickyButtons();
        }
        
        console.log('🎉 Все модули успешно инициализированы!');
        
    } catch (error) {
        console.error('❌ Ошибка при инициализации:', error);
    }
});