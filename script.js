document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = anchor.getAttribute('href');
        if (href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const feedback = contactForm.querySelector('.form-feedback');
        feedback.style.display = 'block';
        feedback.textContent = 'Thank you for reaching out! I will get back to you soon.';
        contactForm.reset();
        setTimeout(() => {
            feedback.style.display = 'none';
            feedback.textContent = '';
        }, 4000);
    });
}

const menuToggle = document.querySelector('.menu-toggle');
const menuWrapper = document.querySelector('.menu-wrapper');
const menuOverlay = document.querySelector('.menu-overlay');
const focusableSelectors = 'a, button, input, textarea, [tabindex]:not([tabindex="-1"])';

function openMenu() {
    menuToggle.classList.add('active');
    menuWrapper.classList.add('open');
    menuOverlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const focusables = menuWrapper.querySelectorAll(focusableSelectors);
    if (focusables.length) focusables[0].focus();
}
function closeMenu() {
    menuToggle.classList.remove('active');
    menuWrapper.classList.remove('open');
    menuOverlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
}
menuToggle && menuToggle.addEventListener('click', function() {
    if (menuWrapper.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});
menuOverlay && menuOverlay.addEventListener('click', closeMenu);

window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuWrapper.classList.contains('open')) {
        closeMenu();
    }
});

menuWrapper && menuWrapper.addEventListener('keydown', function(e) {
    if (!menuWrapper.classList.contains('open')) return;
    const focusables = menuWrapper.querySelectorAll(focusableSelectors);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }
});

if (menuWrapper) {
    menuWrapper.addEventListener('click', function(e) {
        if (!menuWrapper.classList.contains('open')) return;
        const target = e.target.closest('a');
        if (target) {
            closeMenu();
        }
    });
}


const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

