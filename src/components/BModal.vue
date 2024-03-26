<template>
    <div :id="id" :class="['modal', `modal--${this.type}`, showDialog ? '' : 'modal--hidden']">
      <div :class="['modal__overlay', showOverlay ? '' : 'overlay--hidden']" @click="closeOnOverlayClick? close():''"></div>
        <BCard elevated class="modal__dialog" :style="{ maxWidth: width + 'px', height: modalHeight + 'px' }" :role="role" :aria-labelledby="modalLabelId">
          <div v-if="!isEmpty" class="modal__header">
            <div v-if="!isNotification" class="modal__icon">
              <slot name="icon"></slot>
            </div>
            <h1 :id="modalTitleId" v-if="!isNotification">{{ title }}</h1>
            <div class="spacer"></div>
            <BButton v-if="showCloseButton" id="close-btn" @click="close()" type="button">
              <font-awesome-icon v-if="false" icon="fa,circle-xmark" />
              <span class="sr-only">{{ closeButtonSRText }}</span>
            </BButton>
          </div>
          <div class="modal__body">
            <div v-if="isNotification && showIcon">
              <div v-if="errorIcon"  class="modal__red-avatar">
                <font-awesome-icon :icon="['fa', 'exclamation-triangle']" />
              </div>
              <div v-else-if="infoIcon"  class="modal__blue-avatar">
                <font-awesome-icon :icon="['fa', 'info-circle']" />
              </div>
              <div v-else  class="modal__green-avatar">
                <slot v-if="hasIconSlot" name="icon"></slot>
                <font-awesome-icon v-else :icon="['fa', 'check']" />
              </div>
            </div>
            <h1 :id="modalTitleId" v-if="isNotification && title">{{ title }}</h1>
            <p v-if="message">{{ message }}</p>
            <slot></slot>
          </div>
          <div v-if="isNotification" class="modal__actions">
            <BButton :type="primaryActionType" :disabled="disablePrimaryAction" :label="primaryActionText" id="primary-action-btn" @onClick="emitPrimaryClickEvent()"></BButton>
            <BButton type="link" v-if="showSecondaryAction" :label="secondaryActionText" id="secondary-action-btn" @onClick="emitSecondaryClickEvent()"></BButton>
          </div>
          <div v-else-if="type === 'form'" class="modal__actions">
            <BButton :type="primaryActionType" :disabled="disablePrimaryAction" :label="primaryActionText" id="primary-action-btn" @onClick="emitPrimaryClickEvent()"></BButton>
            <BButton v-if="showTertiaryAction" :type="tertiaryActionType" :disabled="disableTertiaryAction" :label="tertiaryActionText" id="tertiary-action-btn" @onClick="emitTertiaryClickEvent()"></BButton>
            <BButton v-if="showSecondaryAction" type="neutral" :label="secondaryActionText" id="secondary-action-btn" @onClick="emitSecondaryClickEvent()"></BButton>
          </div>
          <div v-else-if="type === 'confirmation'" class="modal__actions">
            <BButton v-if="showSecondaryAction" type="neutral" :label="secondaryActionText" id="secondary-action-btn" @onClick="emitSecondaryClickEvent()"></BButton>
            <BButton v-if="showPrimaryAction" :type="primaryActionType" :disabled="disablePrimaryAction" :label="primaryActionText" id="primary-action-btn" @onClick="emitPrimaryClickEvent()"></BButton>
          </div>
        </BCard>
    </div>
  </template>
  <script>
  import BButton from './BButton.vue'
  import BCard from './BCard.vue'
  //import useFocusLock from '../composables/useFocusLock'
  import { v4 as uuid } from 'uuid'
  
  export default {
    name: 'BModal',
    components: {
      BButton,
      BCard
    },
    props: {
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
        validator: function (value) {
          return ['default', 'primary', 'danger', 'neutral'].indexOf(value) !== -1
        }
      },
      tertiaryActionType: {
        type: String,
        default: 'primary',
        validator: function (value) {
          return ['default', 'primary', 'danger', 'neutral'].indexOf(value) !== -1
        }
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
        validator: function (value) {
          return ['form', 'notification', 'confirmation', 'empty'].indexOf(value) !== -1
        }
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
        validator: function (value) {
          return ['check', 'error', 'info'].indexOf(value) !== -1
        }
      }
    },
    emits: ['modal-close', 'primary-click', 'secondary-click', 'tertiary-click', 'close-click', 'update:modelValue', 'before-close-click'],
    data () {
      return {
        modalIdentifier: uuid(),
        showDialog: this.modelValue
      }
    },
    computed: {
      hasIconSlot () {
        return !!this.$slots.icon
      },
      isNotification () {
        return this.type === 'notification'
      },
      isEmpty () {
        return this.type === 'empty'
      },
      errorIcon () {
        return this.iconType === 'error'
      },
      infoIcon () {
        return this.iconType === 'info'
      },
      modalTitleId () { 
        return this.title != null && this.title != '' ? `${this.id}-title-${this.modalIdentifier}` : null
      },
      modalLabelId () {
        return this.ariaLabelledByIdOverride != null && this.ariaLabelledByIdOverride != '' ? this.ariaLabelledByIdOverride : this.modalTitleId
      }
    },
    watch: {
      showDialog: function (value) {
        this.$emit('update:modelValue', value)
        if (value) {
          setTimeout(() => {
            const modalDialog = this.$el.querySelector('.modal__dialog')
            //useFocusLock(modalDialog)
            const firstFocusableElement = modalDialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')[0]
            if (firstFocusableElement) {
              firstFocusableElement.focus()
            }
          }, 150)
        } else {
          this.$emit('modal-close')
        }
      },
      modelValue: function (value) {
        this.showDialog = value
      }
    },
    methods: {
      emitPrimaryClickEvent () {
        this.$emit('primary-click')
        if (this.closeOnPrimaryClick) {
          this.showDialog = false
        }
      },
      emitSecondaryClickEvent () {
        this.$emit('secondary-click')
        if (this.closeOnSecondaryClick) {
          this.showDialog = false
        }
      },
      emitTertiaryClickEvent () {
        this.$emit('tertiary-click')
      },
      close () {
        this.$emit('before-close-click')
        this.showDialog = false
        this.$emit('close-click')
      }
    }
  }
  </script>

<style lang="scss" scoped>
@import '../assets/css/_variables.scss';
.modal {
  font-family: "Lato", Arial, sans-serif;
  left: 0;
  position: fixed;
  top: 0;
  transition: all 0.5s ease;
  z-index: 9999;

  &--hidden {
    height: 0;
    opacity: 0;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    visibility: hidden;
    width: 0;
  }

  &__dialog {
    max-height: calc(100vh - 20%);
    overflow-y: auto;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    right: 0;
    top: 15%;
    max-width: 500px;

    &.card--default {
      padding: 0;
    }
  }

  &__header {
    align-items: center;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    padding: 16px;

    h1 {
      font-size: 20px;
      margin: 0;
    }
    button {
      background: none;
      border: none;
      border-radius: 50%;
      color: $blue-primary;
      cursor: pointer;
      display: flex;
      font-size: 18px;
      height: 18px;
      outline: none;
      padding: 0;
      transition: all 0.3s ease;
      width: 18px;

      &:focus,
      &:hover,
      &:active,
      &.active {
        color: $blue-5;
        border-color: $blue-5;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.5);
      }
      & > * {
        pointer-events: none;
      }
    }
    .spacer {
      flex-grow: 1;
    }
  }

  &__icon {
    color: $muted-gray;
    margin-right: 15px;
  }

  &__body {
    line-height: 21px;
    padding: 30px;
  }

  &__green-avatar {
    align-items: center;
    background: $green-2;
    border-radius: 50%;
    color: $green;
    display: flex;
    font-size: 28px;
    height: 64px;
    justify-content: center;
    margin-bottom: 25px;
    width: 64px;
  }

  &__red-avatar {
    align-items: center;
    background: $red-2;
    border-radius: 50%;
    color: $red-1;
    display: flex;
    font-size: 28px;
    height: 64px;
    justify-content: center;
    margin-bottom: 25px;
    width: 64px;
  }

    &__blue-avatar {
    align-items: center;
    background: $blue-2;
    border-radius: 50%;
    color: $blue-primary;
    display: flex;
    font-size: 28px;
    height: 64px;
    justify-content: center;
    margin-bottom: 25px;
    width: 64px;
  }

  &__actions {
    padding: 0 20px 20px;

    > * {
      margin-left: 5px;
    }
  }

  &__overlay {
    background: black;
    height: 100vh;
    opacity: .5;
    width: 100vw;

    &.overlay--hidden {
      opacity: 0;
    }
  }
  &--form {
    .modal {
      &__body {
        padding: 30px 40px 0;
      }
      &__actions {
        padding: 0 30px 30px;
      }
    }
  }
  &--confirmation {
    .modal {
      &__dialog {
        max-width: 400px;
      }
      &__actions {
        text-align: right;
      }
    }
  }
  &--notification {
    .modal {
      &__header {
        border: none;
      }
      &__body {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 0 40px 30px;
        text-align: center;

        h1 {
          font-size: 20px;
        }
      }
      &__actions {
        align-items: center;
        display: flex;
        flex-direction: column;
        font-size: 14px;

        > button:last-of-type {
          margin: 25px 0 20px;
        }
      }
    }
  }
  &--empty {
    .modal {
      &__dialog {
        max-width: 500px;
      }
      &__body {
        align-items: center;
        display: flex;
        flex-direction: column;
        padding: 0 40px 30px;
        text-align: center;
      }
    }
  }
}
</style>./BButton.vue