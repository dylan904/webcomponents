import { LitElement, html, css  } from 'lit';
import styles from './style.css?inline'

class FontAwesomeIcon extends LitElement {
  static styles = css([ styles ])

  static get properties() {
    return {
      icon: { type: Array }
    }
  }

  constructor() {
    super()
console.log('testme construct', this);
    this.icon = []
  }

  render() {
    console.log('testme render', this.icon)
    // The icon property is now directly an array, e.g., ['fas', 'fa-circle-xmark']
    const [prefix, iconName] = this.icon;
    const classes = `${prefix} fa-${iconName}`;

    return html`<i part="icon" class="${classes}"></i>`;
  }
}

customElements.define('font-awesome-icon', FontAwesomeIcon);