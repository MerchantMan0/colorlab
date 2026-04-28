const { validateHexColor } = require('./colorUtils');

/**
 * Renders a simple color form into `container` and wires validation on submit.
 *
 * @param {HTMLElement} container
 * @returns {{ form: HTMLFormElement, input: HTMLInputElement, message: HTMLElement }}
 */
function mountColorForm(container) {
  container.innerHTML = `
    <form data-testid="color-form" aria-label="Color entry">
      <label for="color-input">Hex color</label>
      <input id="color-input" name="color" type="text" autocomplete="off" />
      <button type="submit">Save</button>
      <p id="color-message" role="status" aria-live="polite"></p>
    </form>
  `;

  const form = container.querySelector('[data-testid="color-form"]');
  const input = container.querySelector('#color-input');
  const message = container.querySelector('#color-message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const result = validateHexColor(input.value);
    if (result.valid) {
      message.textContent = `Saved: ${result.normalized}`;
      message.removeAttribute('data-invalid');
      input.setAttribute('aria-invalid', 'false');
    } else {
      message.textContent = result.error;
      message.setAttribute('data-invalid', 'true');
      input.setAttribute('aria-invalid', 'true');
    }
  });

  return { form, input, message };
}

module.exports = { mountColorForm };
