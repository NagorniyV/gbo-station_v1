// Анимации при скролле
window.initAnimations = function() {
    console.log('🔧 Инициализация анимаций...');
    
    if (!window.utils) {
        console.error('❌ Утилиты не загружены');
        return;
    }
    
    const animateOnScroll = () => {
        // SEO блок
        document.querySelectorAll('.seo-block:first-child h2, .seo-block:first-child .seo-content p').forEach(el => {
            if (window.utils.inViewport(el) && !el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
        
        // Опыт
        const experienceSection = document.getElementById('experience');
        if (experienceSection && window.utils.inViewport(experienceSection)) {
            const title = document.getElementById('experience-title');
            if (title && !title.classList.contains('visible')) {
                title.classList.add('visible');
            }
            
            document.querySelectorAll('.counter').forEach(counter => {
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    const target = parseInt(counter.getAttribute('data-target'));
                    window.utils.animateCounter(counter, target);
                }
            });
        }
        
        // О нас
        document.querySelectorAll('#about-title, .about-section h3, .animate-text, .animate-item').forEach(el => {
            if (window.utils.inViewport(el) && !el.classList.contains('visible')) {
                setTimeout(() => el.classList.add('visible'), Math.random() * 300 + 200);
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    animateOnScroll();
    
    console.log('✅ Анимации инициализированы');
};