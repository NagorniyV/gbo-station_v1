// Инициализация бургер-меню и навигации
window.initHeader = function() {
    console.log('🔧 Инициализация хедера...');
    
    // ========== БУРГЕР-МЕНЮ ==========
    const burger = document.getElementById('burgerMenu');
    const header = document.getElementById('header');
    const overlay = document.getElementById('overlay');
    
    if (burger && header && overlay) {
        burger.addEventListener('click', () => {
            const isActive = burger.classList.toggle('active');
            header.classList.toggle('active', isActive);
            overlay.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
        
        overlay.addEventListener('click', () => {
            burger.classList.remove('active');
            header.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Выпадающие меню на мобильных
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    toggle.parentElement.classList.toggle('active');
                }
            });
        });
    }

    // ========== ПЛАВНАЯ ПРОКРУТКА ==========
    document.querySelectorAll('.nav-item a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const top = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top, behavior: 'smooth' });
                
                // Закрыть меню на мобильных
                if (window.innerWidth <= 768 && burger) {
                    burger.classList.remove('active');
                    header.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // ========== АНИМАЦИЯ ХИРО ==========
    setTimeout(() => {
        const title = document.getElementById('animated-title');
        const subtitle = document.getElementById('animated-subtitle');
        
        if (title) title.classList.add('visible');
        if (subtitle) setTimeout(() => subtitle.classList.add('visible'), 500);
    }, 1000);
    
    console.log('✅ Хедер инициализирован');
};