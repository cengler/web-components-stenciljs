class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      if(!confirm('Do you really want to go?')) {
        event.preventDefault()
      }
    })
  }
}

customElements.define('confirm-link', ConfirmLink, {extends: 'a'})
