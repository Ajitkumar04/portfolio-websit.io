/**
 * =================================================================
 * PROJECT & SKILL CATEGORY FILTER + SEARCH ENGINE
 * =================================================================
 */

(function () {
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('#project-search-input');
    const projectCards = document.querySelectorAll('.project-card');

    let currentCategory = 'All';
    let searchQuery = '';

    function applyFilter() {
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const cardTitle = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
        const cardDesc = (card.querySelector('.project-description')?.textContent || '').toLowerCase();
        const cardTags = Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent.toLowerCase()).join(' ');

        const matchesCategory = (currentCategory === 'All') || (cardCategory === currentCategory);
        const matchesSearch = !searchQuery || cardTitle.includes(searchQuery) || cardDesc.includes(searchQuery) || cardTags.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          card.style.display = 'flex';
          card.classList.add('animate-on-scroll', 'animated');
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category') || 'All';
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      });
    }
  }

  function initSkillTabs() {
    const tabButtons = document.querySelectorAll('.skill-tab-btn');
    const skillGroups = document.querySelectorAll('.skill-group');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-skill-category');
        skillGroups.forEach(group => {
          if (category === 'all' || group.getAttribute('data-skill-category') === category) {
            group.style.display = 'grid';
          } else {
            group.style.display = 'none';
          }
        });
      });
    });
  }

  window.initProjectFilters = initProjectFilters;
  window.initSkillTabs = initSkillTabs;
})();
