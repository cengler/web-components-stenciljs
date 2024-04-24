class Tooltip extends HTMLElement {
    
    constructor() {
        super()
        this._tooltipContainer
        this._tooltipText = 'hover'
        this.attachShadow({mode: 'open'})

        // # host-context: no anda en firefox
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                }
                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }
                :host(.important) {
                    background-color: #bcff46;
                }
                :host-context(p) {
                    font-weight: bold;
                }
            </style>
            <slot>Def</slot>
            <span>(%)</span>`
    }

    connectedCallback() {
        this._tooltipText = this.getAttribute('text')
        const tooltipIcon = this.shadowRoot.querySelector('span')
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this.shadowRoot.appendChild(tooltipIcon)
        this.style.position = 'relative'
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div')
        this._tooltipContainer.textContent = this._tooltipText
        this.shadowRoot.appendChild(this._tooltipContainer)
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer)
    }
}

customElements.define('my-tooltip', Tooltip)
