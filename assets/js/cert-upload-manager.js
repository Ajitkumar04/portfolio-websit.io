/**
 * =================================================================
 * AGENT 2: CERTIFICATE UPLOAD/MANAGER
 * =================================================================
 * Allows adding a genuine certificate.
 * Supports certificate image/PDF via URL or file input.
 * Saves certificate information to AGENT 1 (CertDataManager).
 * Does NOT delete existing certificates.
 *
 * The management UI is a modal that appears when the user clicks
 * the "Manage Certificates" button in the Certifications section.
 * =================================================================
 */
(function () {
  'use strict';

  var modalId = 'cert-management-modal';
  var formContainerId = 'cert-form-container';
  var listContainerId = 'cert-list-container';

  /**
   * Open the management modal and show the upload form.
   */
  function openModal() {
    var modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showUploadForm();
    renderCertList();
  }

  /**
   * Close the management modal.
   */
  function closeModal() {
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  /**
   * Show the "Add New Certificate" form.
   */
  function showUploadForm() {
    var container = document.getElementById(formContainerId);
    if (!container) return;

    container.innerHTML =
      '<h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem;">Add New Certificate</h3>' +
      '<form id="cert-upload-form">' +
        '<div class="form-group">' +
          '<label for="cert-name" class="form-label">Certificate Name *</label>' +
          '<input type="text" id="cert-name" class="form-input" placeholder="e.g. Hugging Face LLM Course" required>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-issuer" class="form-label">Issuing Organization *</label>' +
          '<input type="text" id="cert-issuer" class="form-input" placeholder="e.g. Hugging Face" required>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-date" class="form-label">Issue Date *</label>' +
          '<input type="text" id="cert-date" class="form-input" placeholder="e.g. August 2026" required>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-credential-id" class="form-label">Credential ID</label>' +
          '<input type="text" id="cert-credential-id" class="form-input" placeholder="e.g. HF-LLM-2026-001">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-verify-url" class="form-label">Verification URL</label>' +
          '<input type="url" id="cert-verify-url" class="form-input" placeholder="e.g. https://huggingface.co/...">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-image" class="form-label">Certificate Image URL</label>' +
          '<input type="url" id="cert-image" class="form-input" placeholder="e.g. ./assets/images/certificate.png">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-badge-icon" class="form-label">Badge Icon (Font Awesome)</label>' +
          '<input type="text" id="cert-badge-icon" class="form-input" placeholder="e.g. fa-solid fa-robot" value="fa-solid fa-certificate">' +
        '</div>' +
        '<div style="display: flex; gap: 1rem; margin-top: 1.5rem;">' +
          '<button type="submit" class="btn btn-primary">Add Certificate</button>' +
          '<button type="button" class="btn btn-secondary" id="cert-cancel-btn">Cancel</button>' +
        '</div>' +
      '</form>';

    // Attach submit handler
    var form = document.getElementById('cert-upload-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var cert = {
          title: document.getElementById('cert-name').value.trim(),
          issuer: document.getElementById('cert-issuer').value.trim(),
          date: document.getElementById('cert-date').value.trim(),
          credentialId: document.getElementById('cert-credential-id').value.trim() || undefined,
          verifyUrl: document.getElementById('cert-verify-url').value.trim() || undefined,
          image: document.getElementById('cert-image').value.trim() || undefined,
          badgeIcon: document.getElementById('cert-badge-icon').value.trim() || 'fa-solid fa-certificate'
        };

        if (!cert.title || !cert.issuer || !cert.date) {
          alert('Please fill in all required fields (marked with *).');
          return;
        }

        if (window.CertDataManager) {
          window.CertDataManager.addCertificate(cert);
        }
        if (window.CertRenderer) {
          window.CertRenderer.render();
        }
        renderCertList();
        closeModal();
      });
    }

    var cancelBtn = document.getElementById('cert-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', closeModal);
    }
  }

  /**
   * Render the list of existing certificates in the modal.
   */
  function renderCertList() {
    var container = document.getElementById(listContainerId);
    if (!container) return;

    var certs = [];
    if (window.CertDataManager) {
      certs = window.CertDataManager.getCertificates();
    }

    if (!certs || certs.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">No certificates added yet.</p>';
      return;
    }

    container.innerHTML = certs.map(function (cert) {
      var certId = cert.id || '';
      var title = cert.title || 'Untitled';
      var issuer = cert.issuer || 'Unknown';
      var date = cert.date || '';
      var verifyUrl = cert.verifyUrl || '';

      return (
        '<div class="cert-list-item" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid var(--border-color);">' +
          '<div style="flex-grow: 1; min-width: 0;">' +
            '<div style="font-weight: 600; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.25rem;">' + title + '</div>' +
            '<div style="font-size: 0.85rem; color: var(--text-secondary);">' + issuer + ' &bull; ' + date + '</div>' +
          '</div>' +
          '<div style="display: flex; gap: 0.5rem; flex-shrink: 0;">' +
            (verifyUrl ? '<a href="' + verifyUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;"><i class="fa-solid fa-check-double"></i> Verify</a>' : '') +
            '<button type="button" class="btn btn-outline btn-sm cert-edit-btn" data-cert-id="' + certId + '" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;"><i class="fa-solid fa-pen"></i> Edit</button>' +
            '<button type="button" class="btn btn-outline btn-sm cert-delete-btn" data-cert-id="' + certId + '" style="font-size: 0.75rem; padding: 0.25rem 0.6rem; color: var(--error);"><i class="fa-solid fa-trash"></i> Delete</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  // Expose globally
  window.CertUploadManager = {
    openModal: openModal,
    closeModal: closeModal,
    showUploadForm: showUploadForm,
    renderCertList: renderCertList
  };

  // Attach event listener for the "Manage Certificates" button
  document.addEventListener('DOMContentLoaded', function () {
    var manageBtn = document.getElementById('cert-manage-btn');
    if (manageBtn) {
      manageBtn.addEventListener('click', openModal);
    }

    // Close modal when clicking outside
    var modal = document.getElementById(modalId);
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    // Close modal with X button
    var closeBtn = document.getElementById('cert-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }
  });
})();
