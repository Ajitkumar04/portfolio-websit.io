/**
 * =================================================================
 * THEME MANAGEMENT (DARK / LIGHT MODE SWITCHER)
 * =================================================================
 */

(function () {
  const THEME_STORAGE_KEY = 'portfolio_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    updateToggleIcons(theme);
  }

  function updateToggleIcons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'light') {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        } else {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        }
      }
    });
  }

  // Initialize theme on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = activeTheme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
      });
    });
  });
})();
