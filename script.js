// ==========================================
//  KapturbyT Portfolio — script.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR: scroll effect & hamburger ──
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });


  // ── PORTFOLIO FILTER ───────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.type === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeUp 0.4s ease both';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  // ── VIDEO: play on hover ───────────────
  portfolioItems.forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;

    item.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });

    item.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });


  // ── SCROLL REVEAL ─────────────────────
  const revealElements = document.querySelectorAll(
    '.service-card, .portfolio-item, .review-card, .about-grid, .contact-grid, .about-stats .stat'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each visible element slightly
        entry.target.style.animationDelay = `${i * 0.07}s`;
        entry.target.style.animation = 'fadeUp 0.6s ease both';
        entry.target.style.opacity = '1';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
  });


  // ── ACTIVE NAV LINK ON SCROLL ──────────
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkItems.forEach(link => {
          link.classList.remove('active-nav');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));


  // ── SMOOTH SCROLL for nav links ────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
