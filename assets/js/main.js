/**
 * =================================================================
 * MAIN APPLICATION LOGIC & INTERACTIVE UTILITIES
 * =================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. MOBILE MENU TOGGLE
  const mobileToggleBtn = document.querySelector('#mobile-menu-toggle');
  const navLinks = document.querySelector('#nav-links');

  if (mobileToggleBtn && navLinks) {
    mobileToggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggleBtn.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 2. NAVBAR SCROLL EFFECT & BACK TO TOP
  const navbar = document.querySelector('#navbar');
  const backToTopBtn = document.querySelector('#back-to-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  setTimeout(() => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
  }, 100);

  // 4. NEURAL NETWORK HTML5 CANVAS ANIMATION
  const canvas = document.querySelector('#neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 22), 65);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5
      });
    }

    function animateNeuralNetwork() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const nodeColor = isDark ? 'rgba(56, 189, 248, 0.7)' : 'rgba(99, 102, 241, 0.6)';
      const lineColor = isDark ? 'rgba(99, 102, 241, ' : 'rgba(6, 182, 212, ';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 130) * 0.25;
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateNeuralNetwork);
    }

    animateNeuralNetwork();
  }

  // 5. CASE STUDY & BLOG MODAL HANDLERS
  const modalOverlay = document.querySelector('#modal-overlay');
  const modalContainer = document.querySelector('#modal-content');
  const modalCloseBtn = document.querySelector('#modal-close-btn');

  function openModal(contentHtml) {
    if (modalContainer && modalOverlay) {
      modalContainer.innerHTML = contentHtml;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Delegated click for Case Studies and Blog Readers
  document.addEventListener('click', (e) => {
    const caseStudyBtn = e.target.closest('.view-case-study-btn');
    if (caseStudyBtn) {
      const projId = caseStudyBtn.getAttribute('data-project-id');
      const cfg = window.PORTFOLIO_CONFIG;
      if (cfg && cfg.projects) {
        const proj = cfg.projects.find(p => p.id === projId);
        if (proj) {
          openModal(`
            <div style="padding-top: 1rem;">
              <span class="section-tag">${proj.category}</span>
              <h2 style="font-size: 1.8rem; font-weight: 800; margin: 0.75rem 0 1rem 0;">${proj.title}</h2>
              <img src="${proj.image}" alt="${proj.title}" style="width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.5rem;" referrerPolicy="no-referrer">
              <p style="font-size: 1.05rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.7;">${proj.fullDescription || proj.shortDescription}</p>
              
              <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem;">Key Architecture Features:</h4>
              <ul style="padding-left: 1.25rem; list-style-type: disc; color: var(--text-secondary); margin-bottom: 1.5rem;">
                ${(proj.features || []).map(f => `<li style="margin-bottom: 0.4rem;">${f}</li>`).join('')}
              </ul>

              ${proj.results ? `
                <div style="padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); color: var(--success); font-weight: 600; margin-bottom: 1.5rem;">
                  <i class="fa-solid fa-circle-check"></i> Impact & Metrics: ${proj.results}
                </div>
              ` : ''}

              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                ${proj.github ? `<a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fa-brands fa-github"></i> View GitHub Repo</a>` : ''}
                ${proj.liveDemo ? `<a href="${proj.liveDemo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fa-solid fa-globe"></i> Open Live Demo</a>` : ''}
              </div>
            </div>
          `);
        }
      }
    }

    const blogBtn = e.target.closest('.read-blog-btn');
    if (blogBtn) {
      const postId = blogBtn.getAttribute('data-post-id');
      const cfg = window.PORTFOLIO_CONFIG;
      if (cfg && cfg.blog) {
        const post = cfg.blog.find(b => b.id === postId);
        if (post) {
          openModal(`
            <div style="padding-top: 1rem;">
              <span class="section-tag">${post.category || 'Article'}</span>
              <h2 style="font-size: 1.8rem; font-weight: 800; margin: 0.75rem 0 0.5rem 0;">${post.title}</h2>
              <div style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.25rem;">
                <i class="fa-regular fa-calendar"></i> ${post.date} &bull; <i class="fa-regular fa-clock"></i> ${post.readTime}
              </div>
              <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: 1.5rem;" referrerPolicy="no-referrer">
              <div style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.8; white-space: pre-line; margin-bottom: 1.5rem;">
                ${post.content || post.excerpt}
              </div>
              <div class="skill-tags">
                ${(post.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
              </div>
            </div>
          `);
        }
      }
    }
  });

  // Init Filters and Forms if functions exist
  if (window.initProjectFilters) window.initProjectFilters();
  if (window.initSkillTabs) window.initSkillTabs();
  if (window.initContactForm) window.initContactForm();
});
