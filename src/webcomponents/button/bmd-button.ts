import { MdOutlinedButton } from '@material/web/button/outlined-button.js';
import { MdFilledButton } from '@material/web/button/filled-button.js';
import { MdTextButton } from '@material/web/button/text-button.js';
import '@material/web/icon/icon.js';

import filledStyles from './css/build/filled.css?inline';
import outlinedStyles from './css/build/outlined.css?inline';
import textStyles from './css/build/text.css?inline';

import { css, CSSResult, CSSResultOrNative } from 'lit';

class BeelineMdOutlinedButton extends MdOutlinedButton {
  static get styles(): CSSResultOrNative[] {
    return [
      // @ts-ignore
      ...super.styles as CSSResultOrNative[],
      css`${outlinedStyles}` as CSSResult
    ];
  }
}

class BeelineMdFilledButton extends MdFilledButton {
    static get styles(): CSSResultOrNative[] {
      return [
        // @ts-ignore
        ...super.styles as CSSResultOrNative[],
        css`${filledStyles}` as CSSResult
      ];
    }
}

class BeelineMdTextButton extends MdTextButton {
  static get styles(): CSSResultOrNative[] {
    return [
      // @ts-ignore
      ...(super.styles as CSSResultOrNative[]),
      css`${textStyles}` as CSSResult
    ];
  }
}

customElements.define('bmd-outlined-button', BeelineMdOutlinedButton);
customElements.define('bmd-filled-button', BeelineMdFilledButton);
customElements.define('bmd-text-button', BeelineMdTextButton);
