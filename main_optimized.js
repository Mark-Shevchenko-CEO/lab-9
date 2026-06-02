/* Реалізовані оптимізації: 
1. Debounce для пошуку
2. Document Fragment для DOM-вузлів
3. Делегування подій замість окремих addEventListener
4. Lazy-load зображень через IntersectionObserver
5. Видалено дублюючий код ініціалізації подій
 */

import state from './store/state.js';
import { navigate, resolveCurrentRoute } from './services/router.js';

import { Header, updateNavActiveState } from './components/ui/Header.js';
import { Footer } from './components/ui/Footer.js';

import { HomePage,    bindHomeEvents    } from './pages/HomePage.js';
import { AboutPage                      } from './pages/AboutPage.js';
import { MealsPage,   bindMealsEvents   } from './pages/MealsPage.js';
import { ContactPage, bindContactEvents } from './pages/ContactPage.js';

//Утиліта: debounce
/* Затримує виклик функції до закінчення паузи після останнього виклику*/
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

//Утиліта: lazy-load
/* lazy-load зроблено через IntersectionObserver.
Зображення з атрибутом data-src завантажуються лише коли потрапляють у viewport */

export function initLazyImages(root = document) {
  const images = root.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver(),
    (entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.dataset.src;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
        img.removeAttribute('data-src');
        img.removeAttribute('data-srcset');
        obs.unobserve(img);
      });
    },
    { rootMargin: '200px 0px' },

  images.forEach(img => observer.observe(img));
}

//Реєстр сторінок
const pages = {
  home:    { render: (s) => HomePage({ recipes: s.recipes }), bind: bindHomeEvents    },
  meals:   { render: ()  => MealsPage(),                      bind: bindMealsEvents   },
  about:   { render: ()  => AboutPage(),                      bind: () => {}          },
  contact: { render: ()  => ContactPage(),                    bind: bindContactEvents },
};

//Монтування layout
document.body.insertAdjacentHTML('afterbegin', Header());
document.body.insertAdjacentHTML('beforeend', Footer());

//Делегування навігаційних подій
/* Кожний елемент після кожного рендеру, вішає лише один listener на document
це зменшує кількість активних listeners та усуває потребу у bindGlobalNavEvents() */

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-nav]');
  if (!el) return;
  e.preventDefault();
  navigate(el.dataset.nav);
});

//Цикл рендеру
/* Мінімізація DOM-операцій
замість app.innerHTML, я використовую DocumentFragment, будується HTML у пам'яті, потім
одним replaceChildren() оновлюємо DOM (один reflow замість кількох) */

function render(currentState) {
  const app = document.getElementById('app');
  updateNavActiveState(currentState.currentPage);

  const page = pages[currentState.currentPage] || pages.home;
  const html = page.render(currentState);

  //Будуємо у фрагменті - один reflow при вставці
  const fragment = document.createDocumentFragment();
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  while (wrapper.firstChild) fragment.appendChild(wrapper.firstChild);

  app.replaceChildren(fragment);

//Активуємо lazy-load для нових зображень на сторінці
  initLazyImages(app);

  page.bind();
}

//Старт
resolveCurrentRoute();
state.subscribe(render);
render(state);