/**
 * =================================================================
 * CONFIG LOADER & DYNAMIC DOM HYDRATION ENGINE
 * =================================================================
 * Automatically reads PORTFOLIO_CONFIG and hydrates HTML elements.
 */

(function () {
  function hydratePage() {
    const cfg = window.PORTFOLIO_CONFIG;
    if (!cfg) {
      console.warn('PORTFOLIO_CONFIG is not loaded.');
      return;
    }

    // 1. SEO & METADATA
    if (cfg.seo) {
      document.title = cfg.seo.metaTitle || `${cfg.personal.name} | ${cfg.personal.title}`;
      
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', cfg.seo.metaDescription || '');

      const metaKeys = document.querySelector('meta[name="keywords"]');
      if (metaKeys) metaKeys.setAttribute('content', cfg.seo.metaKeywords || '');

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', cfg.seo.metaTitle || '');

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', cfg.seo.metaDescription || '');

      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && cfg.seo.ogImage) ogImage.setAttribute('content', cfg.seo.ogImage);
    }

    // 2. PERSONAL INFO
    const p = cfg.personal;
    if (p) {
      document.querySelectorAll('.cfg-name').forEach(el => el.textContent = p.name);
      document.querySelectorAll('.cfg-first-name').forEach(el => el.textContent = p.firstName);
      document.querySelectorAll('.cfg-title').forEach(el => el.textContent = p.title);
      document.querySelectorAll('.cfg-tagline').forEach(el => el.textContent = p.tagline);
      document.querySelectorAll('.cfg-bio-short').forEach(el => el.textContent = p.bioShort);
      document.querySelectorAll('.cfg-bio-full').forEach(el => el.textContent = p.bioFull);
      document.querySelectorAll('.cfg-career-goals').forEach(el => el.textContent = p.careerGoals);
      document.querySelectorAll('.cfg-status').forEach(el => el.textContent = p.status);
      document.querySelectorAll('.cfg-location').forEach(el => el.textContent = p.location);
      document.querySelectorAll('.cfg-email').forEach(el => {
        el.textContent = p.email;
        if (el.tagName === 'A') el.href = `mailto:${p.email}`;
      });
      document.querySelectorAll('.cfg-phone').forEach(el => {
        el.textContent = p.phone;
        if (el.tagName === 'A') el.href = `tel:${p.phone.replace(/[^0-9+]/g, '')}`;
      });

      // Resume download links
      document.querySelectorAll('.cfg-resume-btn').forEach(btn => {
        btn.href = p.resumePdf || '#';
        if (p.resumePdf) btn.setAttribute('download', '');
      });

      // Profile Image
      document.querySelectorAll('.cfg-profile-img').forEach(img => {
        img.src = p.profileImage || './assets/images/profile.jpg';
        img.alt = p.name;
        img.setAttribute('referrerPolicy', 'no-referrer');
      });
    }

    // 3. SOCIAL ICONS
    const s = cfg.social;
    if (s) {
      const socialContainer = document.querySelectorAll('.cfg-social-links');
      socialContainer.forEach(container => {
        container.innerHTML = `
          ${s.github ? `<a href="${s.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>` : ''}
          ${s.linkedin ? `<a href="${s.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>` : ''}
          ${s.twitter ? `<a href="${s.twitter}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>` : ''}
          ${s.kaggle ? `<a href="${s.kaggle}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Kaggle"><i class="fa-brands fa-kaggle"></i></a>` : ''}
          ${s.huggingface ? `<a href="${s.huggingface}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Hugging Face"><i class="fa-solid fa-robot"></i></a>` : ''}
          ${s.email ? `<a href="${s.email}" class="social-icon-btn" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>` : ''}
        `;
      });
    }

    // 4. METRICS BAR
    const metricsContainer = document.querySelector('#metrics-grid');
    if (metricsContainer && cfg.metrics) {
      metricsContainer.innerHTML = cfg.metrics.map(m => `
        <div class="metric-item glass-card animate-on-scroll">
          <div class="metric-icon"><i class="${m.icon}"></i></div>
          <div class="metric-value">${m.value}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `).join('');
    }

    // 5. SKILLS RENDERER
    const skillsContainer = document.querySelector('#skills-container');
    if (skillsContainer && cfg.skills) {
      let html = '';
      const categories = [
        { key: 'programming', label: 'Programming Languages' },
        { key: 'dataScience', label: 'Data Science & Analytics' },
        { key: 'machineLearning', label: 'Machine Learning & AI' },
        { key: 'tools', label: 'Developer Tools & Platforms' },
        { key: 'deployment', label: 'Deployment & MLOps' }
      ];

      categories.forEach(cat => {
        const list = cfg.skills[cat.key];
        if (list && list.length) {
          html += `
            <div class="skill-group" data-skill-category="${cat.key}" style="width: 100%; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
              <h3 style="grid-column: 1 / -1; font-size: 1.25rem; font-weight: 700; color: var(--text-accent); margin-bottom: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">${cat.label}</h3>
              ${list.map(skill => `
                <div class="skill-card glass-card animate-on-scroll">
                  <div class="skill-header">
                    <div class="skill-title-group">
                      <i class="${skill.icon} skill-icon"></i>
                      <span class="skill-name">${skill.name}</span>
                    </div>
                  </div>
                  <div class="skill-tags">
                    ${(skill.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        }
      });
      skillsContainer.innerHTML = html;
    }

    // 6. PROJECTS RENDERER
    const projectsContainer = document.querySelector('#projects-grid');
    if (projectsContainer && cfg.projects) {
      projectsContainer.innerHTML = cfg.projects.map(proj => `
        <article class="project-card glass-card animate-on-scroll" data-category="${proj.category}">
          <div class="project-image-container">
            <img src="${proj.image}" alt="${proj.title}" class="project-image" loading="lazy" referrerPolicy="no-referrer">
            <span class="project-category-badge">${proj.category}</span>
          </div>
          <div class="project-body">
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-description">${proj.shortDescription}</p>
            ${proj.results ? `<div class="project-results-pill"><i class="fa-solid fa-chart-line"></i> ${proj.results}</div>` : ''}
            <div class="project-tags">
              ${(proj.technologies || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <div class="project-footer-actions">
              <button class="btn btn-outline btn-sm view-case-study-btn" data-project-id="${proj.id}">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Case Study
              </button>
              <div style="display: flex; gap: 0.5rem;">
                ${proj.github ? `<a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" style="width: 36px; height: 36px; font-size: 1rem;" aria-label="GitHub Repository"><i class="fa-brands fa-github"></i></a>` : ''}
                ${proj.liveDemo ? `<a href="${proj.liveDemo}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" style="width: 36px; height: 36px; font-size: 1rem;" aria-label="Live Demo"><i class="fa-solid fa-globe"></i></a>` : ''}
              </div>
            </div>
          </div>
        </article>
      `).join('');
    }

    // 7. EXPERIENCE TIMELINE
    const expContainer = document.querySelector('#experience-timeline');
    if (expContainer && cfg.experience) {
      expContainer.innerHTML = cfg.experience.map(exp => `
        <div class="timeline-item animate-on-scroll">
          <div class="timeline-dot"></div>
          <div class="timeline-content glass-card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
              <div>
                <h3 style="font-size: 1.2rem; font-weight: 700;">${exp.role}</h3>
                <div style="color: var(--text-accent); font-weight: 600;">${exp.company} &bull; <span style="color: var(--text-secondary); font-size: 0.9rem;">${exp.location}</span></div>
              </div>
              <span class="section-tag" style="margin: 0; font-size: 0.78rem;">${exp.period}</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem;">${exp.description}</p>
            <ul style="padding-left: 1.25rem; list-style-type: disc; color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1rem;">
              ${(exp.achievements || []).map(a => `<li style="margin-bottom: 0.35rem;">${a}</li>`).join('')}
            </ul>
            <div class="skill-tags">
              ${(exp.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

    // 8. EDUCATION RENDERER
    const eduContainer = document.querySelector('#education-grid');
    if (eduContainer && cfg.education) {
      eduContainer.innerHTML = cfg.education.map(edu => `
        <div class="edu-card glass-card animate-on-scroll">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <span class="section-tag" style="font-size: 0.75rem;">${edu.period}</span>
            <span style="font-weight: 700; color: var(--success); font-size: 0.85rem;">GPA: ${edu.gpa}</span>
          </div>
          <h3 class="edu-degree">${edu.degree}</h3>
          <div class="edu-institution"><i class="fa-solid fa-graduation-cap"></i> ${edu.institution} &bull; ${edu.location}</div>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem;">${edu.description}</p>
          ${edu.honors ? `<div style="font-size: 0.88rem; color: var(--text-accent); margin-bottom: 0.75rem; font-weight: 600;"><i class="fa-solid fa-award"></i> ${edu.honors}</div>` : ''}
          <div class="skill-tags">
            ${(edu.courses || []).map(c => `<span class="tech-tag">${c}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    // 9. CERTIFICATIONS RENDERER
    const certContainer = document.querySelector('#certifications-grid');
    if (certContainer && cfg.certifications) {
      certContainer.innerHTML = cfg.certifications.map(cert => `
        <div class="cert-card glass-card animate-on-scroll">
          <div class="cert-icon"><i class="${cert.badgeIcon || 'fa-solid fa-certificate'}"></i></div>
          <div style="flex-grow: 1;">
            <h3 class="cert-title">${cert.title}</h3>
            <div class="cert-issuer">${cert.issuer} &bull; Issued ${cert.date}</div>
            ${cert.credentialId ? `<div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">ID: ${cert.credentialId}</div>` : ''}
            ${cert.image ? `<div style="margin-bottom: 0.75rem;"><img src="${cert.image}" alt="${cert.title} Certificate" class="cert-preview-img" loading="lazy" referrerPolicy="no-referrer"></div>` : ''}
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              ${cert.image ? `<a href="${cert.image}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size: 0.78rem; padding: 0.3rem 0.75rem;"><i class="fa-solid fa-eye"></i> View Certificate</a>` : ''}
              ${cert.verifyUrl ? `<a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size: 0.78rem; padding: 0.3rem 0.75rem;"><i class="fa-solid fa-check-double"></i> Verify Credential</a>` : ''}
            </div>
          </div>
        </div>
      `).join('');
    }

    // 10. BLOG PLACEHOLDERS
    const blogContainer = document.querySelector('#blog-grid');
    if (blogContainer && cfg.blog) {
      blogContainer.innerHTML = cfg.blog.map(post => `
        <article class="blog-card glass-card animate-on-scroll">
          <img src="${post.image}" alt="${post.title}" class="blog-img" loading="lazy" referrerPolicy="no-referrer">
          <div class="blog-body">
            <div class="blog-meta">
              <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
              <span><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem;">${post.title}</h3>
            <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1.25rem;">${post.excerpt}</p>
            <div class="project-tags" style="margin-bottom: 1.25rem;">
              ${(post.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <button class="btn btn-outline btn-sm read-blog-btn" data-post-id="${post.id}" style="margin-top: auto;">
              Read Article <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </article>
      `).join('');
    }

    // Initialize typewriter if present
    const typewriterEl = document.querySelector('#hero-typewriter');
    if (typewriterEl && window.TypewriterEffect && cfg.personal.typewriterRoles) {
      new window.TypewriterEffect(typewriterEl, cfg.personal.typewriterRoles, 90, 2200).start();
    }
  }

  document.addEventListener('DOMContentLoaded', hydratePage);
})();
