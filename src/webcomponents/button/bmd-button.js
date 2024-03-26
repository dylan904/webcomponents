import { MdOutlinedButton } from '@material/web/button/outlined-button.js';
import { MdFilledButton } from '@material/web/button/filled-button.js';
import { MdTextButton } from '@material/web/button/text-button.js';
import filledStyles from './css/_filled-override.css?inline';
import outlinedStyles from './css/_outlined-override.css?inline';
import textStyles from './css/_text-override.css?inline';
import { css } from 'lit'

class BeelineMdOutlinedButton extends MdOutlinedButton {
  static get styles() {
    console.log('oulined', outlinedStyles)
    return [
      ...super.styles,
      css([ outlinedStyles ])
    ];
  }
}

class BeelineMdFilledButton extends MdFilledButton {
  static get styles() {
    return [
      ...super.styles,
      css([ filledStyles ])
    ];
  }
}

class BeelineMdTextButton extends MdTextButton {
  static get styles() {
    return [
      ...super.styles,
      css([ textStyles ])
    ];
  }
}

customElements.define('bmd-outlined-button', BeelineMdOutlinedButton)
customElements.define('bmd-filled-button', BeelineMdFilledButton);
customElements.define('bmd-text-button', BeelineMdTextButton);
