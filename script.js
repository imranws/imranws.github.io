// ── HEADER SCROLL ──
const header = document.getElementById("main-header");

if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {

    // Open / close menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');

        document.body.style.overflow =
            mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a menu item is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ── PRICING TABS ──
function switchPricing(type) {
    document.getElementById('pricing-onetime').style.display = type === 'onetime' ? 'grid' : 'none';
    document.getElementById('pricing-monthly').style.display = type === 'monthly' ? 'grid' : 'none';
    document.querySelectorAll('.pricing-tab').forEach((btn, i) => {
        btn.classList.toggle('active', (i === 0 && type === 'onetime') || (i === 1 && type === 'monthly'));
    });
}


// ── BACK TO TOP BUTTON ──
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', () => {

        if (window.scrollY >= 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

    });
}


/* =============================================
   reviews-modal.js
   Fiverr Reviews popup — add to existing JS
   ============================================= */

(function () {
    'use strict';

    /* ── Video modal (existing) ── */
    var tsModal = document.getElementById('tsModal');
    var tsModalBg = document.getElementById('tsModalBg');
    var tsClose = document.getElementById('tsModalClose');
    var tsIframe = document.getElementById('tsIframe');

    function openVideo(id) {
        tsIframe.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
        tsModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(function () { tsClose.focus(); }, 280);
    }
    function closeVideo() {
        tsModal.classList.remove('open');
        document.body.style.overflow = '';
        tsIframe.src = '';
    }

    if (tsModal) {
        document.querySelectorAll('.ts-vcard').forEach(function (card) {
            card.addEventListener('click', function () {
                var id = card.dataset.videoId;
                if (id) openVideo(id);
            });
        });
        tsModalBg.addEventListener('click', closeVideo);
        tsClose.addEventListener('click', closeVideo);
    }

    /* ── Reviews modal ── */
    var rvModal = document.getElementById('rvModal');
    var rvBg = document.getElementById('rvModalBg');
    var rvClose = document.getElementById('rvModalClose');

    /* The Fiverr Reviews button — find by href or add id="fiverrReviewsBtn" */
    var fiverrBtn = document.querySelector('.ts-fiverr-btn');

    function openReviews(e) {
        e.preventDefault();
        rvModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(function () { rvClose.focus(); }, 280);
    }
    function closeReviews() {
        rvModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (rvModal && fiverrBtn) {
        fiverrBtn.addEventListener('click', openReviews);
        rvBg.addEventListener('click', closeReviews);
        rvClose.addEventListener('click', closeReviews);
    }

    /* Escape closes whichever modal is open */
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (tsModal && tsModal.classList.contains('open')) closeVideo();
        if (rvModal && rvModal.classList.contains('open')) closeReviews();
    });

})();

// ── VIDEO LAZY LOAD ──
function loadVideo() {
    const thumb = document.getElementById('video-thumb');
    const container = document.getElementById('video-container');
    const iframe = document.getElementById('yt-iframe');
    // Replace with actual YouTube video ID
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    thumb.style.display = 'none';
    container.style.display = 'block';
}

// ── CHAT WIDGET ──
function toggleChat() {
    const options = document.getElementById('chat-options');
    const toggle = document.getElementById('chat-toggle');
    options.classList.toggle('open');
    toggle.classList.toggle('open');
}

// ── FORM SUBMIT → WHATSAPP ──
// function handleFormSubmit() {
//     const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
//     const name = inputs[0].value || 'অজানা';
//     const phone = inputs[1].value || '';
//     const service = inputs[2].value || '';
//     const budget = inputs[3].value || '';
//     const message = inputs[4].value || '';
//     const text = `নমস্কার Imran ভাই! আমি আপনার ওয়েবসাইট থেকে যোগাযোগ করছি।%0A%0Aনাম: ${name}%0Aফোন: ${phone}%0Aসেবা: ${service}%0Aবাজেট: ${budget}%0Aবিস্তারিত: ${message}`;
//     window.open(`https://wa.me/8801885078858?text=${text}`, '_blank');
// }


function handleFormSubmit(e) {

    e.preventDefault();

    emailjs.send("service_99fglb5", "template_yz73d5r", {
        from_name: document.getElementById("name").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    })
        .then(() => {
            alert("Message sent successfully!");

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        })
        .catch((error) => {
            alert("Failed to send message.");
            console.log(error);
        });
}

// ── BOTTOM NAV ACTIVE STATE ──
const sections = document.querySelectorAll('section[id]');
const bnavItems = document.querySelectorAll('.bnav-item');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
    });
    bnavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) item.classList.add('active');
    });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── ANIMATED COUNTER ──
function animateCounter(el, target, suffix) {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
    }, 25);
}
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const h3s = document.querySelectorAll('.hero-stat h3');
            animateCounter(h3s[0], 120, '+');
            animateCounter(h3s[1], 250, '+');
            animateCounter(h3s[2], 8, '+');
            // animateCounter(h3s[2], 119, '★');
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);