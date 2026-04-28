const { within, fireEvent } = require('@testing-library/dom');
const { mountColorForm } = require('./colorForm');

describe('color form (integration)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('shows validation feedback on submit and accepts a corrected hex value', () => {
    const root = document.getElementById('root');
    mountColorForm(root);

    const view = within(root);
    const input = view.getByLabelText(/hex color/i);
    const form = view.getByRole('form', { name: /color entry/i });

    fireEvent.change(input, { target: { value: 'not-a-color' } });
    fireEvent.submit(form);

    const status = view.getByRole('status');
    expect(status).toHaveTextContent(/invalid hex color/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');

    fireEvent.change(input, { target: { value: '#0aF' } });
    fireEvent.submit(form);

    expect(status).toHaveTextContent('Saved: #00aaff');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });
});
