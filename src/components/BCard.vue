<template>
    <div v-if="!clickable" :class="classes" :id="id">
      <slot></slot>
    </div>
    <a v-else-if="clickType === 'link'" :class="classes" :href="navigationUrl" :id="id">
      <slot></slot>
    </a>
    <button v-else :class="classes" @click="$emit('onClick')" :id="id">
      <slot></slot>
    </button>
  </template>
  <script>
  export default {
    name: 'BCard',
    props: {
      id: {
        type: String
      },
      clickable: {
        type: Boolean,
        default: false
      },
      clickType: {
        type: String,
        default: 'link',
        validator(value) {
          return ['button', 'link'].includes(value)
        }
      },
      elevated: {
        type: Boolean,
        default: false
      },
      navigationUrl: {
        type: String
      },
      padding: {
        type: String,
        default: 'default',
        validator: function (value) {
          return ['small', 'default', 'large'].indexOf(value) !== -1
        }
      }
    },
    emits: ['onClick'],
    computed: {
      classes () {
        return {
          card: true,
          'card--elevated': this.elevated,
          'card--link': this.clickable,
          [`card--${this.padding}`]: true
        }
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  @import '../assets/css/_variables.scss';
  .card {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    color: $font-primary;
    display: flex;
    flex-direction: column;
    font-family: "Lato", Arial, sans-serif;
    font-size: 1rem;
    transition: all .3s ease;
    width: 100%;
  
    &--default {
      padding: 20px;
    }
    &--small {
      padding: 10px;
    }
    &--large {
      padding: 30px;
    }
    &--link,
    &--elevated {
      box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
    }
    &--link {
      cursor: pointer;
      &:active,
      &:focus,
      &:hover {
        box-shadow: 0px 0px 20px rgb(0 0 0 / 20%);
        transform: translateY(-5px);
      }
    }
  }
  </style>
  