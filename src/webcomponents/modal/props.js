export default {
    closeButtonSRText: {
      type: String,
      default: 'Specify Localized Close Button Text'
    },
    id: {
      type: String,
      required: true
    },
    ariaLabelledByIdOverride: {
      type: String
    },
    message: {
      type: String
    },
    role: {
      type: String,
      default: 'dialog'
    },
    primaryActionText: {
      type: String,
      default: 'primary'
    },
    primaryActionType: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'danger', 'neutral'].includes(value)
    },
    tertiaryActionType: {
      type: String,
      default: 'primary',
      validator: value => ['default', 'primary', 'danger', 'neutral'].includes(value)
    },
    secondaryActionText: {
      type: String,
      default: 'secondary'
    },
    tertiaryActionText: {
      type: String,
      default: 'tertiary'
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showOverlay: {
      type: Boolean,
      default: true
    },
    showPrimaryAction: {
      type: Boolean,
      default: true
    },
    showSecondaryAction: {
      type: Boolean,
      default: true
    },
    showTertiaryAction: {
      type: Boolean,
      default: false
    },
    disablePrimaryAction: {
      type: Boolean,
      default: false
    },
    disableTertiaryAction: {
      type: Boolean,
      default: false
    },
    closeOnOverlayClick: {
      type: Boolean,
      default: true
    },
    closeOnPrimaryClick: {
      type: Boolean,
      default: false
    },
    closeOnSecondaryClick: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    type: {
      type: String,
      default: 'confirmation',
      validator: value => ['form', 'notification', 'confirmation', 'empty'].includes(value)
      
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    modalHeight: {
      type: Number
    },
    iconType: {
      type: String,
      default: 'check',
      validator: value => ['check', 'error', 'info'].includes(value)
    }
}
