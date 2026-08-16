/**
 * =================================================================
 * AGENT 4: CERTIFICATE EDIT/DELETE/VERIFY MANAGER
 * =================================================================
 * Edit certificate details.
 * Delete a certificate only after confirmation.
 * Verify Credential button opens the stored verification URL.
 *
 * This agent works with AGENT 1 (CertDataManager) for data operations
 * and AGENT 3 (CertRenderer) for re-rendering after changes.
 * =================================================================
 */
(function () {
  'use strict';

  var modalId = 'cert-management-modal';
  var formContainerId = 'cert-form-container';
  var listContainerId = 'cert-list-container';

  /**
   * Edit a certificate — opens the management modal with a pre-filled form.
   * @param {string} id  Certificate id
   */
  function editCertificate(id) {
    var cert = null;
    if (window.CertDataManager) {
      cert = window.CertDataManager.getCertificate(id);
    }
    if (!cert) return;

    var modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    var container = document.getElementById(formContainerId);
    if (!container) return;

    container.innerHTML =
      '<h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 1.5rem;">Edit Certificate</h3>' +
      '<form id="cert-edit-form" data-cert-id="' + (cert.id || '') + '">' +
        '<div class="form-group">' +
          '<label for="cert-name" class="form-label">Certificate Name *</label>' +
          '<input type="text" id="cert-name" class="form-input" value="' + escapeHtml(cert.title || '') + '" required>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-issuer" class="form-label">Issuing Organization *</label>' +
          '<input type="text" id="cert-issuer" class="form-input" value="' + escapeHtml(cert.issuer || '') + '" required>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-date" class="form-label">Issue Date *</label>' +
          '<input type="text" id="cert-date" class="form-input" value="' + escapeHtml(cert.date || '') + '" required>' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-credential-id" class="form-label">Credential ID</label>' +
          '<input type="text" id="cert-credential-id" class="form-input" value="' + escapeHtml(cert.credentialId || '') + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-verify-url" class="form-label">Verification URL</label>' +
          '<input type="url" id="cert-verify-url" class="form-input" value="' + escapeHtml(cert.verifyUrl || '') + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-image" class="form-label">Certificate Image URL</label>' +
          '<input type="url" id="cert-image" class="form-input" value="' + escapeHtml(cert.image || '') + '">' +
        '</div>' +
        '<div class="form-group">' +
          '<label for="cert-badge-icon" class="form-label">Badge Icon (Font Awesome)</label>' +
          '<input type="text" id="cert-badge-icon" class="form-input" value="' + escapeHtml(cert.badgeIcon || 'fa-solid fa-certificate') + '">' +
        '</div>' +
        '<div style="display: flex; gap: 1rem; margin-top: 1.5rem;">' +
          '<button type="submit" class="btn btn-primary">Save Changes</button>' +
          '<button type="button" class="btn btn-secondary" id="cert-cancel-btn">Cancel</button>' +
        '</div>' +
      '</form>';

    // Attach submit handler
    var form = document.getElementById('cert-edit-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var updatedCert = {
          title: document.getElementById('cert-name').value.trim(),
          issuer: document.getElementById('cert-issuer').value.trim(),
          date: document.getElementById('cert-date').value.trim(),
          credentialId: document.getElementById('cert-credential-id').value.trim() || undefined,
          verifyUrl: document.getElementById('cert-verify-url').value.trim() || undefined,
          image: document.getElementById('cert-image').value.trim() || undefined,
          badgeIcon: document.getElementById('cert-badge-icon').value.trim() || 'fa-solid fa-certificate'
        };

        if (!updatedCert.title || !updatedCert.issuer || !updatedCert.date) {
          alert('Please fill in all required fields (marked with *).');
          return;
        }

        if (window.CertDataManager) {
          window.CertDataManager.updateCertificate(id, updatedCert);
        }
        if (window.CertRenderer) {
          window.CertRenderer.render();
        }
        if (window.CertUploadManager) {
          window.CertUploadManager.renderCertList();
        }
      });
    }

    var cancelBtn = document.getElementById('cert-cancel-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function () {
        if (window.CertUploadManager) {
          window.CertUploadManager.renderCertList();
        }
      });
    }
  }

  /**
   * Delete a certificate — asks for confirmation first.
   * @param {string} id  Certificate id
   */
  function deleteCertificate(id) {
    if (!confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
      return;
    }

    if (window.CertDataManager) {
      window.CertDataManager.deleteCertificate(id);
    }
    if (window.CertRenderer) {
      window.CertRenderer.render();
    }
    if (window.CertUploadManager) {
      window.CertUploadManager.renderCertList();
    }
  }

  /**
   * Verify a certificate — opens the stored verification URL.
   * @param {string} id  Certificate id
   */
  function verifyCertificate(id) {
    var cert = null;
    if (window.CertDataManager) {
      cert = window.CertDataManager.getCertificate(id);
    }
    if (cert && cert.verifyUrl) {
      window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Escape HTML to prevent XSS in form values.
   */
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, '&#039;');
  }

  // Expose globally
  window.CertEditManager = {
    editCertificate: editCertificate,
    deleteCertificate: deleteCertificate,
    verifyCertificate: verifyCertificate
  };

  // Attach delegated event listeners for edit/delete buttons in the cert list
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
      var editBtn = e.target.closest('.cert-edit-btn');
      if (editBtn) {
        var id = editBtn.getAttribute('data-cert-id');
        if (id) editCertificate(id);
      }

      var deleteBtn = e.target.closest('.cert-delete-btn');
      if (deleteBtn) {
        var id = deleteBtn.getAttribute('data-cert-id');
        if (id) deleteCertificate(id);
      }
    });
  });
})();
