class MyToggleButton extends HTMLElement {
  constructor() {
    super()
    this._isHidden = true
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = `
        <style>
          #info-box {
              display: none;
          }
        </style>
        <button>Show</button>
        <p id="info-box"><slot></slot></p>
        `
    this._button = this.shadowRoot.querySelector('button');
    this._infoBox = this.shadowRoot.querySelector('#info-box');
    this._button.addEventListener('click', this._toggle.bind(this));
  }

  connectedCallback() {
    if (this.hasAttribute('is-hidden')) {
      if(this.getAttribute('is-hidden') === 'false') {
        this._toggle()
      }
    }
  }

  _toggle() {
    this._isHidden = !this._isHidden;
    this._infoBox.style.display = this._isHidden ? 'none' : 'block'
    this._button.textContent = this._isHidden ? 'Show' : 'Hide'
  }
}

customElements.define('my-toggle-button', MyToggleButton)
