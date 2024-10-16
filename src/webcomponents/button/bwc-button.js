import './bmd-button.js'
import { LitElement } from 'lit'
import { html, unsafeStatic } from 'lit/static-html.js'
import propSpecs from './props.js'

class BeelineButton extends LitElement {
  static properties = propSpecs

  constructor() {
    super()
    
    // set defaults to be overridden
    for (const prop in propSpecs) {
        if (propSpecs[prop].default) {
            console.log('defaultprop', prop, propSpecs[prop].default)
            this[prop] = propSpecs[prop].default
        }
    }
  }

  render() {
    const buttonTag = unsafeStatic(`bmd-${ this.variant }-button`)
    window.test = this
    console.log('render', this)

    return html`
        <${buttonTag}
        id="${this.id}"
        class="btn--${this.size} btn--${this.type}"
        ?disabled="${this.disabled}"
        .trailingIcon="${this.icon && this.iconPosition === 'trailing'}"
        >
        ${this.icon ? html`<md-icon slot="icon">${this.icon}</md-icon>` : ''}
        <slot>${this.label}</slot>
        </${buttonTag}>
    `;
  }
}

customElements.define('bwc-button', BeelineButton)