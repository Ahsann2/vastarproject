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
    initAuthPopup(); // <-- TAMBAHKAN BARIS INI
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
    
    // ▼▼▼ GANTI FUNGSI LAMA DENGAN VERSI BARU YANG MEMILIKI EFEK MENGETIK ▼▼▼
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    let typingInterval; // Variabel untuk menyimpan proses mengetik yang sedang berjalan

    // Fungsi untuk menampilkan teks dengan efek ketikan
    const typeText = (element, text) => {
        let index = 0;
        element.textContent = ''; // Kosongkan teks sebelum mulai
        clearInterval(typingInterval); // Hentikan efek ketik lain yang mungkin berjalan

        typingInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval); // Hentikan jika teks sudah selesai
            }
        }, 6); // Kecepatan mengetik dalam milidetik (makin kecil, makin cepat)
    };

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const answerParagraph = answer.querySelector('p');
        
        if (!answerParagraph) return; // Lewati jika tidak ada paragraf jawaban

        const fullText = answerParagraph.textContent; // Simpan teks asli
        answerParagraph.setAttribute('data-full-text', fullText);

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Hentikan interval pengetikan yang sedang berjalan
            clearInterval(typingInterval);

            // Tutup semua item lain dan kembalikan teksnya ke versi lengkap
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    const p = otherItem.querySelector('.faq-answer p');
                    if (p) {
                        p.textContent = p.getAttribute('data-full-text');
                    }
                }
            });

            // Buka atau tutup item yang diklik
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                typeText(answerParagraph, fullText); // Mulai efek mengetik
            } else {
                item.classList.remove('open');
                answer.style.maxHeight = null;
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

// ▼▼▼ TAMBAHKAN FUNGSI BARU INI SEBELUM 'initializePage()' ▼▼▼

// ---[ MODUL BARU: POPUP AUTENTIKASI ]---------------------------------------------
function initAuthPopup() {
    const showBtn = document.getElementById('show-login-popup-btn');
    const overlay = document.getElementById('auth-popup-overlay');
    const closeBtn = document.getElementById('close-auth-popup-btn');
    
    // Jika salah satu elemen tidak ada di halaman, hentikan fungsi ini
    if (!showBtn || !overlay || !closeBtn) return;

    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Fungsi untuk menampilkan popup
    showBtn.addEventListener('click', () => {
        overlay.classList.remove('hidden');
    });

    // Fungsi untuk menyembunyikan popup
    const hidePopup = () => {
        overlay.classList.add('hidden');
    };

    closeBtn.addEventListener('click', hidePopup);
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            hidePopup();
        }
    });

    // Logika untuk beralih tab
    if (loginTab && signupTab && loginForm && signupForm) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active-tab');
            signupTab.classList.remove('active-tab');
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        });

        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active-tab');
            loginTab.classList.remove('active-tab');
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }
}



    // --- Panggil fungsi inisialisasi utama ---
    initializePage();
});