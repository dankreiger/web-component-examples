class Button extends HTMLElement {
  constructor() {
    super();
    this._isVisible;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
      :host {
        min-height: 200px;
      }
      button {
        cursor: pointer;
        display: flex;
        justify-content: center;
        width: 200px;
        height: 80px;
      }
      #info-box {
        display: none;
      }
    </style>
    <button>Show</button>
    <p id="info-box">
      <slot></slot>
    </p>
    `;

    this._toggleButton = this.shadowRoot.querySelector('button');
    this._infoBox = this.shadowRoot.getElementById('info-box');

    this._toggleButton.addEventListener(
      'click',
      this._toggleInfoBox.bind(this)
    );
  }
  connectedCallback() {
    if (this.hasAttribute('is-visible')) {
      if (this.getAttribute('is-visible') === 'true') {
        this._isVisible = true;
        this._infoBox.style.display = 'block';
        this._toggleButton.textContent = 'Hide';
      }
    }
  }

  _toggleInfoBox() {
    this._isVisible = !this._isVisible;
    this._infoBox.style.display = this._isVisible ? 'block' : 'none';
    this._toggleButton.textContent = this._isVisible ? 'Hide' : 'Show';
  }
}

customElements.define('puppy-button', Button);
