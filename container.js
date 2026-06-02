export function ContactContainer() {
  const section = document.createElement('section');
  section.className = 'contact-section';
  //aria-labelledby прив'язує заголовок до секції
  section.setAttribute('aria-labelledby', 'contact-heading');

  section.innerHTML = `
    <div class="container">
      <!-- ПОКРАЩЕННЯ: h2 для секції контактів (правильна ієрархія після h1 у Header) -->
      <h2 id="contact-heading" class="section-title">Зв'яжіться з нами</h2>

      <!-- ПОКРАЩЕННЯ: role="form" + aria-labelledby -->
      <form
        class="contact-form"
        id="contact-form"
        role="form"
        aria-labelledby="contact-heading"
        novalidate
      >
        <!-- ПОКРАЩЕННЯ: кожне поле має <label> + aria-required + aria-describedby для підказки -->
        <div class="form-group">
          <label for="contact-name" class="form-label">
            Ім'я <span aria-hidden="true" class="required-mark">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            class="form-input"
            placeholder="Введіть ваше ім'я"
            aria-required="true"
            aria-describedby="contact-name-hint"
            autocomplete="name"
          >
          <span id="contact-name-hint" class="form-hint">Обов'язкове поле</span>
        </div>

        <div class="form-group">
          <label for="contact-email" class="form-label">
            Email <span aria-hidden="true" class="required-mark">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            class="form-input"
            placeholder="your@email.com"
            aria-required="true"
            aria-describedby="contact-email-hint"
            autocomplete="email"
          >
          <span id="contact-email-hint" class="form-hint">Наприклад: name@domain.com</span>
        </div>

        <div class="form-group">
          <label for="contact-message" class="form-label">
            Повідомлення <span aria-hidden="true" class="required-mark">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            class="form-input form-textarea"
            rows="5"
            placeholder="Введіть ваше повідомлення"
            aria-required="true"
          ></textarea>
        </div>

        <!-- ПОКРАЩЕННЯ: aria-live для повідомлень про статус форми -->
        <div
          id="form-status"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class="form-status"
        ></div>

        <button type="submit" class="btn-primary">
          Надіслати повідомлення
        </button>
      </form>
    </div>
  `;

  // Обробник форми
  const form = section.querySelector('#contact-form');
  const status = section.querySelector('#form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '✅ Дякуємо! Ваше повідомлення надіслано.';
    status.className = 'form-status form-status--success';
    form.reset();
  });

  return section;
}
