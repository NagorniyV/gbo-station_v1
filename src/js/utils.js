// Общие утилиты и константы
window.utils = {
    inViewport: (el) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight * 0.8) && rect.bottom >= 0;
    },
    
    animateCounter: (element, target, duration = 1500) => {
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
};

// Глобальная проверка на мобильное устройство
window.isMobile = window.innerWidth <= 720;