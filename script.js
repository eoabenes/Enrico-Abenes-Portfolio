document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) link.classList.add('active');
                else link.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // Reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.highlight-card, .cert-card, .course-card, .education-card, .org-card, .project-card, .contact-card')
        .forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
});

// ===== Image protection =====
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
});
document.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));

// ===== Image Lightbox =====
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <img src="" alt="Preview">
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
}

document.querySelectorAll('.cert-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (img) openLightbox(img.src, img.alt);
    });
});

document.querySelectorAll('.org-photos img, .profile-img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// ===== PDF Modal =====
const pdfModal = document.getElementById('pdf-modal');
const pdfFrame = pdfModal ? pdfModal.querySelector('iframe') : null;
const pdfClose = pdfModal ? pdfModal.querySelector('.pdf-close') : null;

function openPdf(src) {
    if (!pdfModal || !pdfFrame) return;
    pdfFrame.src = src;
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePdf() {
    if (!pdfModal || !pdfFrame) return;
    pdfModal.classList.remove('active');
    pdfFrame.src = '';
    document.body.style.overflow = '';
}

document.querySelectorAll('.pdf-preview').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const src = btn.getAttribute('data-pdf');
        if (src) openPdf(src);
    });
});

if (pdfClose) {
    pdfClose.addEventListener('click', closePdf);
}
if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
        if (e.target === pdfModal) closePdf();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closePdf();
    }
});

// Reveal CSS
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);