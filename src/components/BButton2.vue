<template>
    <button :class="classes" :disabled="disabled" @click="onClick($event)" :id="id" type="button">
      <font-awesome-icon v-if="faIcon" :icon="faIcon"/>
      {{ !$slots['default'] ? label : ''}}
      <span v-if="accessibilityText" class="sr-only">{{ accessibilityText }}</span>
      <slot></slot>
    </button>
  </template>
  
  <script>
  console.time('vue-button');
  export default {
    name: 'BButton2',
    props: {
      accessibilityText: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      faIcon: {
        type: Array
      },
      id: {
        type: String,
        required: true
      },
      label: {
        type: String,
        default: 'Button'
      },
      size: {
        type: String,
        default: 'medium',
        validator: function (value) {
          return ['small', 'medium', 'large'].indexOf(value) !== -1
        }
      },
      type: {
        type: String,
        default: 'default',
        validator: function (value) {
          return ['default', 'primary', 'danger', 'neutral', 'link'].indexOf(value) !== -1
        }
      }
    },
    emits: ['onClick'],
    computed: {
      classes () {
        return {
          btn: true,
          [`btn--${this.type}`]: true,
          [`btn--${this.size}`]: true
        }
      }
    },
    mounted () {
      console.timeEnd('vue-button');
      console.log(performance.now())
    }, 
    methods: {
      onClick (event) {
        event.target.focus()
        this.$emit('onClick')
      }
    }
  }
  </script>
  <style lang="scss" scoped>
    @import '../assets/css/_variables.scss';
  .btn {
    border: 1px solid;
    border-radius: 250px;
    color: #fff;
    cursor: pointer;
    font-family: "Lato", Arial, sans-serif;
    font-weight: bold;
    transition: all 0.3s ease;
  
    svg {
      padding-right: 5px;
    }
  
    &:active,
    &:focus,
    &:hover {
      background: $blue-5;
      border-color: $blue-5;
      box-shadow: 0 0 0 0.2rem rgba(0,123,255,.5);
      color: #fff;
      outline: 0;
    }
    &--default {
      background: $blue-primary;
      border: 1px solid $blue-primary;
    }
    &--primary {
      background: $button-green;
      border: 1px solid $button-green;
  
      &:active,
      &:focus,
      &:hover {
        background: #2a5200;
        border-color: #2a5200;
      }
    }
    &--danger {
      background: $red-1;
      border: 1px solid $red-1;
  
      &:active,
      &:focus,
      &:hover {
        background: #962e29;
        border-color: #962e29;
        box-shadow: 0 0 0 0.2rem rgb(225 83 97 / 50%);
        color: #fff;
      }
    }
    &--neutral {
      background: #fff;
      border: 1px solid $blue-primary;
      color: $blue-primary;
  
      &--neutral {
      background: #fff;
      border: 1px solid var(--blue-primary);
      color: var(--blue-primary);
    }
    }
    &:disabled {
      background: $gray-disabled;
      border-color: $gray-disabled;
      color: $font-primary;
      opacity: .65;
      pointer-events: none;
    }
    &--small {
      font-size: 1em;
      padding: 5px 15px;
    }
    &--medium {
      font-size: 1em;
      padding: 10px 20px;
    }
    &--large {
      font-size: 1.3em;
      padding: 15px 30px;
    }

    &--link {
      background-color: transparent;
      border: none;
      color: $blue-40;
      font-size: 14px;
      padding: 0;
      transition: color 0.3s ease;
      cursor: pointer;
    
      &:active,
      &:focus,
      &:hover {
        text-decoration: underline;
        box-shadow: none;
        background-color: transparent;
        color: $blue-40;
      }
      &:disabled {
        cursor: auto;
        text-decoration: none;
        pointer-events: none;
        opacity: 1;
      }
      span {
        pointer-events: none;
      }
    }
  }
  </style>
  