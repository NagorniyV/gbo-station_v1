window.initAnimations = function() {
    console.log('🔧 Инициализация анимаций...');

    if (!window.utils) {
        console.error('❌ Утилиты не загружены');
        return;
    }

    const animateOnScroll = () => {
        // Анимация первого SEO блока
        document.querySelectorAll('.seo-block:first-child h2, .seo-block:first-child .seo-content p')
            .forEach(el => {
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            });

        // Секция "Опыт"
        const experienceSection = document.getElementById('experience');
        if (experienceSection && window.utils.inViewport(experienceSection)) {
            const title = document.getElementById('experience-title');
            if (title && !title.classList.contains('visible')) title.classList.add('visible');

            document.querySelectorAll('.counter').forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    const target = parseInt(counter.getAttribute('data-target'));
                    window.utils.animateCounter(counter, target);
                }
            });
        }

        // Секция "О нас"
        document.querySelectorAll('#about-title, .about-section h3, .animate-text, .animate-item')
            .forEach(el => {
                if (!el.classList.contains('visible')) {
                    setTimeout(() => el.classList.add('visible'), Math.random() * 300 + 200);
                }
            });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    animateOnScroll();

    console.log('✅ Анимации инициализированы');
};

// Утилиты
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

// Определение мобильного
window.isMobile = window.innerWidth <= 720;
