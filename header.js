import { store } from './state.js';
import { navigate } from './router.js';

export function Header() {
  const nav = document.createElement('header');
  nav.setAttribute('role', 'banner');

  nav.innerHTML = `
    <div class="header-inner">
      <!-- ПОКРАЩЕННЯ 1: h1 лише один на сторінці, містить назву застосунку -->
      <a href="#" class="logo-link" aria-label="Smart Chef — перейти на головну">
        <h1 class="logo">🍳 Smart Chef</h1>
      </a>

      <!-- ПОКРАЩЕННЯ 2: nav з aria-label -->
      <nav role="navigation" aria-label="Головна навігація">
        <ul class="nav-list" role="list">
          <li><a href="#home"    class="nav-link" aria-current="page">Головна</a></li>
          <li><a href="#meals"   class="nav-link">Рецепти</a></li>
          <li><a href="#about"   class="nav-link">Про нас</a></li>
          <li><a href="#contact" class="nav-link">Контакти</a></li>
        </ul>
      </nav>

      <!-- ПОКРАЩЕННЯ 3: поле пошуку з явним <label> -->
      <div class="search-wrapper" role="search">
        <label for="global-search" class="sr-only">Пошук рецептів</label>
        <input
          id="global-search"
          type="search"
          class="search-input"
          placeholder="Пошук рецептів…"
          aria-label="Пошук рецептів"
          autocomplete="off"
        >
        <!-- ПОКРАЩЕННЯ 4: кнопка з aria-label замість просто іконки -->
        <button
          type="button"
          class="search-btn"
          aria-label="Виконати пошук"
        >
          <span aria-hidden="true">🔍</span>
        </button>
      </div>
    </div>
  `;

  // Позначаємо активне посилання
  function markActive() {
    const hash = location.hash || '#home';
    nav.querySelectorAll('.nav-link').forEach(link => {
      const isCurrent = link.getAttribute('href') === hash;
      link.setAttribute('aria-current', isCurrent ? 'page' : 'false');
    });
  }

  window.addEventListener('hashchange', markActive);
  markActive();

  return nav;
}
