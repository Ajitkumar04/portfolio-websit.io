/**
 * =================================================================
 * CONTACT FORM VALIDATION & TOAST NOTIFICATION SYSTEM
 * =================================================================
 */

(function () {
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
    
    toast.innerHTML = `
      <i class="${iconClass}" style="color: ${type === 'success' ? 'var(--success)' : 'var(--error)'}; font-size: 1.2rem;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  function initContactForm() {
    const contactForm = document.querySelector('#contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector('#form-name');
      const emailInput = contactForm.querySelector('#form-email');
      const subjectInput = contactForm.querySelector('#form-subject');
      const messageInput = contactForm.querySelector('#form-message');
      const honeypot = contactForm.querySelector('#form-honeypot');

      // Spam check
      if (honeypot && honeypot.value !== '') {
        return;
      }

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...`;
      }

      setTimeout(() => {
        showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Message`;
        }
      }, 1200);
    });
  }

  window.showToast = showToast;
  window.initContactForm = initContactForm;
})();
