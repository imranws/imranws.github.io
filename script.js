// ── HEADER SCROLL ──
const header = document.getElementById("main-header");

if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}


// ── HAMBURGER MENU ──
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");

if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        mobileNav.classList.toggle("open");

        document.body.style.overflow =
            mobileNav.classList.contains("open") ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            mobileNav.classList.remove("open");
            document.body.style.overflow = "";
        });
    });
}


// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
} else {
    revealEls.forEach(el => el.classList.add("visible"));
}


// ── PRICING TABS ──
function switchPricing(type) {
    const oneTime = document.getElementById("pricing-onetime");
    const monthly = document.getElementById("pricing-monthly");

    if (!oneTime || !monthly) return;

    oneTime.style.display = type === "onetime" ? "grid" : "none";
    monthly.style.display = type === "monthly" ? "grid" : "none";

    document.querySelectorAll(".pricing-tab").forEach((btn, i) => {
        btn.classList.toggle(
            "active",
            (i === 0 && type === "onetime") ||
            (i === 1 && type === "monthly")
        );
    });
}


// ── BACK TO TOP BUTTON ──
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY >= 500);
    });
}


// ── VIDEO & FIVERR REVIEWS MODALS ──
(function () {
    "use strict";

    // Video modal
    const tsModal = document.getElementById("tsModal");
    const tsModalBg = document.getElementById("tsModalBg");
    const tsClose = document.getElementById("tsModalClose");
    const tsIframe = document.getElementById("tsIframe");

    function openVideo(id) {
        if (!tsModal || !tsIframe || !id) return;

        tsIframe.src =
            "https://www.youtube.com/embed/" +
            encodeURIComponent(id) +
            "?autoplay=1&rel=0&modestbranding=1";

        tsModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeVideo() {
        if (!tsModal) return;

        tsModal.classList.remove("open");
        document.body.style.overflow = "";

        if (tsIframe) tsIframe.src = "";
    }

    document.querySelectorAll(".ts-vcard").forEach(card => {
        card.addEventListener("click", () => {
            openVideo(card.dataset.videoId);
        });
    });

    if (tsModalBg) {
        tsModalBg.addEventListener("click", closeVideo);
    }

    if (tsClose) {
        tsClose.addEventListener("click", closeVideo);
    }


    // Fiverr reviews modal
    const rvModal = document.getElementById("rvModal");
    const rvBg = document.getElementById("rvModalBg");
    const rvClose = document.getElementById("rvModalClose");

    // Supports either class or ID
    const fiverrButtons = document.querySelectorAll(
        ".ts-fiverr-btn, #fiverrReviewsBtn"
    );

    function openReviews(event) {
        event.preventDefault();

        if (!rvModal) {
            console.error("Fiverr reviews modal #rvModal was not found.");
            return;
        }

        rvModal.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeReviews() {
        if (!rvModal) return;

        rvModal.classList.remove("open");
        document.body.style.overflow = "";
    }

    fiverrButtons.forEach(button => {
        button.addEventListener("click", openReviews);
    });

    if (rvBg) {
        rvBg.addEventListener("click", closeReviews);
    }

    if (rvClose) {
        rvClose.addEventListener("click", closeReviews);
    }


    // Close modals with Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (tsModal && tsModal.classList.contains("open")) {
                closeVideo();
            }

            if (rvModal && rvModal.classList.contains("open")) {
                closeReviews();
            }
        }
    });
})();


// ── VIDEO LAZY LOAD ──
function loadVideo() {
    const thumb = document.getElementById("video-thumb");
    const container = document.getElementById("video-container");
    const iframe = document.getElementById("yt-iframe");

    if (!thumb || !container || !iframe) return;

    iframe.src =
        "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

    thumb.style.display = "none";
    container.style.display = "block";
}


// ── CHAT WIDGET ──
function toggleChat() {
    const options = document.getElementById("chat-options");
    const toggle = document.getElementById("chat-toggle");

    if (!options || !toggle) return;

    options.classList.toggle("open");
    toggle.classList.toggle("open");
}


// ── FORM SUBMIT → EMAILJS ──
function handleFormSubmit(e) {
    if (e) e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (!name || !email || !message) return;

    if (typeof emailjs === "undefined") {
        alert("Email service is not available. Please try again later.");
        return;
    }

    emailjs.send("service_99fglb5", "template_yz73d5r", {
        from_name: name.value,
        from_email: email.value,
        message: message.value
    })
    .then(() => {
        alert("Message sent successfully!");

        name.value = "";
        email.value = "";
        message.value = "";
    })
    .catch(error => {
        alert("Failed to send message.");
        console.error("EmailJS error:", error);
    });
}


// ── BOTTOM NAV ACTIVE STATE ──
const sections = document.querySelectorAll("section[id]");
const bnavItems = document.querySelectorAll(".bnav-item");

function updateBottomNav() {
    let current = "";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            current = section.id;
        }
    });

    bnavItems.forEach(item => {
        item.classList.toggle(
            "active",
            item.getAttribute("href") === `#${current}`
        );
    });
}

if (bnavItems.length && sections.length) {
    window.addEventListener("scroll", updateBottomNav, { passive: true });
    updateBottomNav();
}


// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = document.querySelector(href);

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


// ── ANIMATED COUNTER ──
function animateCounter(el, target, suffix) {
    if (!el) return;

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

const heroStats = document.querySelector(".hero-stats");

if (heroStats && "IntersectionObserver" in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = heroStats.querySelectorAll("h3");

                animateCounter(counters[0], 120, "+");
                animateCounter(counters[1], 250, "+");
                animateCounter(counters[2], 8, "+");

                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(heroStats);
}