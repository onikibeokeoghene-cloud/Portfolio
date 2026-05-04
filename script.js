// ==========================================
//  KapturbyT Portfolio — script.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR ─────────────────────────────
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ── DETECT TOUCH DEVICE ────────────────
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  // ── PORTFOLIO FILTER ───────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.type === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
          const v = item.querySelector('video');
          if (v) { v.pause(); v.currentTime = 0; item.classList.remove('playing'); }
        }
      });
    });
  });

  // ── VIDEO HANDLING ─────────────────────
  portfolioItems.forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;

    if (isTouchDevice()) {
      // MOBILE: tap the play button or item to play/pause
      item.addEventListener('click', () => {
        if (video.paused) {
          document.querySelectorAll('.portfolio-item video').forEach(v => {
            if (v !== video) {
              v.pause(); v.currentTime = 0;
              v.closest('.portfolio-item').classList.remove('playing');
            }
          });
          video.play().catch(() => {});
        } else {
          video.pause(); video.currentTime = 0;
          item.classList.remove('playing');
        }
      });
    } else {
      // DESKTOP: hover to play
      item.addEventListener('mouseenter', () => video.play().catch(() => {}));
      item.addEventListener('mouseleave', () => {
        video.pause(); video.currentTime = 0;
      });
    }

    video.addEventListener('playing', () => item.classList.add('playing'));
    video.addEventListener('pause', () => item.classList.remove('playing'));
  });

  // ── SCROLL REVEAL ──────────────────────
  const revealEls = document.querySelectorAll('.service-card, .portfolio-item, .stat, .contact-info-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });

  // ── SMOOTH SCROLL ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

});
