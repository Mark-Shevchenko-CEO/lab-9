export function CategoryTabs({ categories, onSelect, activeCategory }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'category-tabs';

  // замінено aria-label на tablist
  wrapper.innerHTML = `
    <h2 class="tabs-heading" id="tabs-label">Категорії рецептів</h2>
    <div
      role="tablist"
      aria-labelledby="tabs-label"
      class="tabs-list"
      id="category-tablist"
    >
      ${categories.map((cat, i) => `
        <button
          role="tab"
          id="tab-${cat.idCategory || i}"
          class="tab-btn${cat.strCategory === activeCategory ? ' tab-btn--active' : ''}"
          aria-selected="${cat.strCategory === activeCategory ? 'true' : 'false'}"
          aria-controls="tabpanel-${cat.idCategory || i}"
          tabindex="${cat.strCategory === activeCategory ? '0' : '-1'}"
          data-category="${cat.strCategory}"
        >
          ${cat.strCategory}
        </button>
      `).join('')}
    </div>

    <!-- Панель результатів, пов'язана з активною вкладкою -->
    <div
      id="tabpanel-active"
      role="tabpanel"
      aria-labelledby="tab-active"
      class="tabpanel"
      tabindex="0"
    >
      <!-- Список страв буде заповнений MealsContainer -->
    </div>
  `;

  const tabList = wrapper.querySelector('[role="tablist"]');

  // Клік по вкладці
  tabList.addEventListener('click', (e) => {
    const btn = e.target.closest('[role="tab"]');
    if (!btn) return;
    selectTab(btn);
  });

  // зробленна keyboard-навігація по вкладках (← → Home End)
  tabList.addEventListener('keydown', (e) => {
    const tabs = [...tabList.querySelectorAll('[role="tab"]')];
    const idx = tabs.indexOf(document.activeElement);
    if (idx === -1) return;

    let next = idx;
    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;

    e.preventDefault();
    tabs[next].focus();
    selectTab(tabs[next]);
  });

  function selectTab(btn) {
    const tabs = [...tabList.querySelectorAll('[role="tab"]')];
    tabs.forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      t.classList.remove('tab-btn--active');
    });
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');
    btn.classList.add('tab-btn--active');
    onSelect && onSelect(btn.dataset.category);
  }

  return wrapper;
}
