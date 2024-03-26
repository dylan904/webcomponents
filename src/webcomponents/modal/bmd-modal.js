import { MdDialog } from '@material/web/dialog/dialog.js';
import styles from './css/_modal-override.css?inline';
import { css } from 'lit'

class BeelineMdModal extends MdDialog {
  static get styles() {
    return [
      ...super.styles,
      css([ styles ])
    ];
  }
}

customElements.define('bmd-modal', BeelineMdModal)
