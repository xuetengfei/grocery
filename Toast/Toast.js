const defaultoptions = {};

function createContainerElement(position) {
  const container = document.createElement('div');
  container.classList.add('my-toast-container');
  container.dataset.position = position;
  document.body.append(container);
  return container;
}

export default class Toast {
  #toastElement;
  constructor(options) {
    this.#toastElement = document.createElement('div');
    this.#toastElement.classList.add('my-toast');
    Object.entries({ ...defaultoptions, ...options }).forEach(([k, v]) => {
      this[k] = v;
    });
  }
  set position(position) {
    const selector = `.my-toast-container[data-position="${position}"]`;
    const container =
      document.querySelector(selector) || createContainerElement(position);
    container.append(this.#toastElement);
  }
  set text(value) {
    this.#toastElement.textContent = value;
  }
  show() {}
  update() {}
  remove() {
    const container = this.#toastElement.parentElement;
    this.#toastElement.remove();
    if (container.hasChildNodes()) return;
    container.remove();
  }
}
