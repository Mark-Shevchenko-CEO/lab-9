// MealCard.js — покращена доступність (Lab 9)

export function MealCard({ meal, onClick }) {
  const card = document.createElement('article');
  card.className = 'meal-card';

  // ПОКРАЩЕННЯ 5: role="button" + tabindex + keyboard-навігація для карточки
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Переглянути рецепт: ${meal.strMeal}`);

  // ПОКРАЩЕННЯ 6: alt-текст для зображення
  const altText = `Фотографія страви ${meal.strMeal}`;

  card.innerHTML = `
    <figure class="card-figure">
      <img
        src="${meal.strMealThumb}"
        alt="${altText}"
        class="card-img"
        loading="lazy"
        width="300"
        height="200"
      >
      <figcaption class="card-info">
        <!-- ПОКРАЩЕННЯ 7: h3 в контексті списку карток (h2 — заголовок секції) -->
        <h3 class="card-title">${meal.strMeal}</h3>
        ${meal.strCategory
          ? `<p class="card-category">
               <span class="sr-only">Категорія:</span>
               <span aria-label="Категорія: ${meal.strCategory}">${meal.strCategory}</span>
             </p>`
          : ''}
        ${meal.strArea
          ? `<p class="card-area">
               <span class="sr-only">Кухня:</span>
               <span aria-label="Кухня: ${meal.strArea}">${meal.strArea}</span>
             </p>`
          : ''}
        <button
          type="button"
          class="card-btn"
          aria-label="Детальніше про рецепт ${meal.strMeal}"
        >
          Детальніше
        </button>
      </figcaption>
    </figure>
  `;

  // Клік мишкою
  card.addEventListener('click', () => onClick && onClick(meal));

  // Keyboard-навігація: Enter / Space
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick && onClick(meal);
    }
  });

  return card;
}
