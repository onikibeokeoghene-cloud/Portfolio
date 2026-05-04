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
          stopVideo(item);
        }
      });
    });
  });

  // ── VIDEO HELPERS ──────────────────────
  function stopVideo(item) {
    const video = item.querySelector('video');
    if (!video) return;
    video.pause();
    video.removeAttribute('src');
    video.load();
    item.classList.remove('playing');
  }

  function stopAllVideos(except) {
    document.querySelectorAll('.portfolio-item.video').forEach(item => {
      if (item !== except) stopVideo(item);
    });
  }

  function loadAndPlay(item) {
    const video = item.querySelector('video');
    const src = item.dataset.src;
    if (!video || !src) return;

    // Always set src fresh to force load
    video.src = src;
    video.load();

    video.play().then(() => {
      item.classList.add('playing');
    }).catch(err => {
      // On mobile first tap may be blocked — try once more on next interaction
      console.warn('Playback blocked:', err.message);
      item.classList.remove('playing');
    });
  }

  // ── VIDEO INTERACTIONS ─────────────────
  const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

  document.querySelectorAll('.portfolio-item.video').forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;

    if (isTouchDevice()) {
      item.addEventListener('click', () => {
        if (item.classList.contains('playing')) {
          stopVideo(item);
        } else {
          stopAllVideos(item);
          loadAndPlay(item);
        }
      });
    } else {
      item.addEventListener('mouseenter', () => {
        stopAllVideos(item);
        loadAndPlay(item);
      });
      item.addEventListener('mouseleave', () => stopVideo(item));
    }

    video.addEventListener('playing', () => item.classList.add('playing'));
    video.addEventListener('pause', () => item.classList.remove('playing'));
    video.addEventListener('error', () => {
      console.warn('Video error for:', item.dataset.src);
      item.classList.remove('playing');
    });
  });

  // ── SCROLL REVEAL ──────────────────────
  const revealEls = document.querySelectorAll(
    '.service-card, .portfolio-item, .stat, .contact-info-item, .about-grid'
  );

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
  }, { threshold: 0.08 });

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
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
