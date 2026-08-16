/**
 * =================================================================
 * AGENT 3: CERTIFICATE RENDERER
 * =================================================================
 * Displays certificates in the Certifications / Industry Certifications
 * section using the original compact card layout:
 *
 *   [Logo]  Certificate Name
 *           Issuing Organization • Issued Date
 *           ID: Credential ID
 *           [✓ Verify Credential]
 *
 * Desktop: 2-column grid.
 * Mobile:  1-column grid.
 *
 * Does NOT show a large certificate preview inside the card.
 * A "View Certificate" button is shown for certs that have an image.
 * =================================================================
 */
(function () {
  'use strict';

  /**
   * Render all certificates into #certifications-grid.
   */
  function render() {
    var container = document.querySelector('#certifications-grid');
    if (!container) return;

    var certs = [];
    if (window.CertDataManager) {
      certs = window.CertDataManager.getCertificates();
    } else if (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.certifications) {
      certs = window.PORTFOLIO_CONFIG.certifications;
    }

    if (!certs || certs.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.95rem;">No certifications to display yet.</p>';
      return;
    }

    container.innerHTML = certs.map(function (cert) {
      var badgeIcon = cert.badgeIcon || 'fa-solid fa-certificate';
      var title = cert.title || 'Untitled Certificate';
      var issuer = cert.issuer || 'Unknown Issuer';
      var date = cert.date || '';
      var credentialId = cert.credentialId || '';
      var verifyUrl = cert.verifyUrl || '';
      var image = cert.image || '';
      var certId = cert.id || '';

      // Build the buttons row
      var buttons = [];
      if (image) {
        buttons.push(
          '<a href="' + image + '" target="_blank" rel="noopener noreferrer" ' +
          'class="btn btn-outline btn-sm" style="font-size: 0.78rem; padding: 0.3rem 0.75rem;">' +
          '<i class="fa-solid fa-eye"></i> View Certificate</a>'
        );
      }
      if (verifyUrl) {
        buttons.push(
          '<a href="' + verifyUrl + '" target="_blank" rel="noopener noreferrer" ' +
          'class="btn btn-outline btn-sm" style="font-size: 0.78rem; padding: 0.3rem 0.75rem;">' +
          '<i class="fa-solid fa-check-double"></i> Verify Credential</a>'
        );
      }

      return (
        '<div class="cert-card glass-card animate-on-scroll" data-cert-id="' + certId + '">' +
          '<div class="cert-icon"><i class="' + badgeIcon + '"></i></div>' +
          '<div style="flex-grow: 1;">' +
            '<h3 class="cert-title">' + title + '</h3>' +
            '<div class="cert-issuer">' + issuer + ' &bull; Issued ' + date + '</div>' +
            (credentialId ? '<div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.75rem;">ID: ' + credentialId + '</div>' : '') +
            (buttons.length > 0 ? '<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">' + buttons.join('') + '</div>' : '') +
          '</div>' +
        '</div>'
      );
    }).join('');
  }

  // Expose globally
  window.CertRenderer = {
    render: render
  };

  // Render on DOMContentLoaded (after config-loader.js has run)
  document.addEventListener('DOMContentLoaded', function () {
    // Defer slightly to ensure config-loader.js has finished
    setTimeout(render, 50);
  });
})();
