class Tooltip extends HTMLElement {

    constructor() {
        super()
        this._tooltipIcon = null
        this._tooltipVisible = false
        this._tooltipText = 'hover'
        this.attachShadow({mode: 'open'})

        // # host-context: no anda en firefox
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,.26);
                }
                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }
                :host {
                    position: relative;
                }
                :host(.important) {
                    background-color: var(--color-primary, #432323);
                }
                :host-context(p) {
                    font-weight: bold;
                }
                
                .icon {
                    background-color: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Def</slot>
            <span class="icon">?</span>`
    }

    connectedCallback() {
        this._tooltipText = this.getAttribute('text')
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))
        this._render()
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return
        if (name === 'text')
            this._tooltipText = newValue
    }

    static get observedAttributes() {
        return ['text']
    }

    _showTooltip() {
        this._tooltipVisible = true
        this._render()
    }

    _hideTooltip() {
        this._tooltipVisible = false
        this._render()
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div')
            tooltipContainer.textContent = this._tooltipText
            this.shadowRoot.appendChild(tooltipContainer)
        } else {
            this.shadowRoot.removeChild(tooltipContainer)
        }
    }
}

customElements.define('my-tooltip', Tooltip)
