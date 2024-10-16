<template>
    <component 
      :is="mdComponentName" 
      :disabled="disabled" 
      :id="id" 
      :class="`btn--${ size } btn--${ type }`"
      :trailing-icon="iconPosition === 'trailing' ? true : null"
    >
    <md-icon v-if="icon" slot="icon">{{ icon }}</md-icon>
    <slot v-if="$slots.default"></slot>
    <template v-else>{{ label }}</template>
  </component>
</template>
  
<script setup lang="ts">
    import propSpecs from '../webcomponents/button/props.ts'
    
    const props = defineProps(propSpecs)
    const mdComponentName = `bmd-${ props.variant }-button`
</script>
 