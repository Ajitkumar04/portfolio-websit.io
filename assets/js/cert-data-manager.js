/**
 * =================================================================
 * AGENT 1: CERTIFICATE DATA MANAGER
 * =================================================================
 * Stores certificate information in one structured data source.
 * Fields: certificate name, issuing organization, issue date,
 *         credential ID, verification URL, certificate logo/image.
 *
 * Data is initialized from config.js (PORTFOLIO_CONFIG.certifications)
 * and persisted in localStorage so user-added certificates survive
 * page reloads.
 * =================================================================
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'portfolio_certificates';

  /**
   * Initialise localStorage from config.js if no stored data exists.
   * Each certificate gets a unique id so AGENT 2/4 can reference it.
   */
  function init() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const configCerts =
        (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.certifications) || [];
      const certs = configCerts.map(function (cert, index) {
        return Object.assign({ id: 'cert-' + Date.now() + '-' + index }, cert);
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
    }
  }

  /**
   * Return all certificates (from localStorage).
   */
  function getCertificates() {
    init();
    var stored = localStorage.getItem(STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('CertDataManager: failed to parse stored certificates', e);
      return [];
    }
  }

  /**
   * Add a new certificate.
   * @param {Object} cert  Certificate object with title, issuer, date, etc.
   * @returns {Object} The newly created certificate (with id).
   */
  function addCertificate(cert) {
    var certs = getCertificates();
    var newCert = Object.assign({ id: 'cert-' + Date.now() }, cert);
    certs.push(newCert);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
    return newCert;
  }

  /**
   * Update an existing certificate by id.
   * @param {string} id
   * @param {Object} updatedFields
   * @returns {Object|null}
   */
  function updateCertificate(id, updatedFields) {
    var certs = getCertificates();
    var index = certs.findIndex(function (c) { return c.id === id; });
    if (index !== -1) {
      certs[index] = Object.assign({}, certs[index], updatedFields);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
      return certs[index];
    }
    return null;
  }

  /**
   * Delete a certificate by id.
   * @param {string} id
   * @returns {Array} The remaining certificates.
   */
  function deleteCertificate(id) {
    var certs = getCertificates();
    var remaining = certs.filter(function (c) { return c.id !== id; });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
    return remaining;
  }

  /**
   * Get a single certificate by id.
   * @param {string} id
   * @returns {Object|null}
   */
  function getCertificate(id) {
    return getCertificates().find(function (c) { return c.id === id; }) || null;
  }

  /**
   * Reset to the initial config.js data (useful for debugging).
   */
  function resetToConfig() {
    localStorage.removeItem(STORAGE_KEY);
    init();
  }

  // Expose globally for AGENT 2, 3, and 4
  window.CertDataManager = {
    init: init,
    getCertificates: getCertificates,
    addCertificate: addCertificate,
    updateCertificate: updateCertificate,
    deleteCertificate: deleteCertificate,
    getCertificate: getCertificate,
    resetToConfig: resetToConfig
  };

  // Auto-initialise on script load
  init();
})();
