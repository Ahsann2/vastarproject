// ===================================================================================
// VASTAR.AI - MAIN JAVASCRIPT LOGIC
// Versi: 2.1
// Deskripsi: Script komprehensif untuk menangani semua interaktivitas halaman.
//            (Canvas background logic removed).
// ===================================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ---[ MODUL 1: INISIALISASI UTAMA ]----------------------------------------------
    function initializePage() {
        console.log("Vastar.AI: Halaman sedang diinisialisasi...");
        initPreloader();
        initHeaderBehavior();
        initMobileMenu();
        initScrollAnimations();
        initFaqAccordion();
        initMouseSpotlight();
        initLazyLoading(); 
        lucide.createIcons();
        console.log("Vastar.AI: Inisialisasi selesai. Halaman siap.");
    }

    // ---[ MODUL 2: PRELOADER ]-------------------------------------------------------
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 500);
        });
    }

    // ---[ MODUL 3: PERILAKU HEADER ]-------------------------------------------------
    function initHeaderBehavior() {
        const header = document.getElementById('header');
        if (!header) return;
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }
    
    // ---[ MODUL 4: MENU MOBILE ]-----------------------------------------------------
    function initMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuLinks = document.querySelectorAll('.mobile-menu-link');
        if (!menuButton || !mobileMenu) return;
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ---[ MODUL 5: ANIMASI SAAT SCROLL ]---------------------------------------------
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length === 0) return;
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // ---[ MODUL 6: FAQ ACCORDION ]---------------------------------------------------
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length === 0) return;
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                });
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // ---[ MODUL BARU: INTERAKSI MOUSE SPOTLIGHT ]-----------------------------------
function initMouseSpotlight() {
    const spotlight = document.getElementById('mouse-spotlight');
    if (!spotlight) return;

    document.body.addEventListener('mouseenter', () => {
        spotlight.style.opacity = '1';
    });

    document.body.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });

    window.addEventListener('mousemove', (e) => {
        spotlight.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    });
}

// ---[ MODUL BARU: LAZY LOADING ]---------------------------------------------------
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy');
    if (lazyImages.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => observer.observe(img));
}

    // --- Panggil fungsi inisialisasi utama ---
    initializePage();
});