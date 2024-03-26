<template>
    <component 
      :is="mdComponentName" 
      :disabled="disabled" 
      :id="id" 
      :class="`btn--${ size } btn--${ type }`"
    ><slot v-if="$slots.default"></slot><template v-else>{{ label }}</template></component>
</template>
  
<script setup>
    import propSpecs from '../webcomponents/button/props.js'
    
    const props = defineProps(propSpecs)
    const mdComponentName = `bmd-${ getButtonType(props.type) }-button`
</script>

<script>
    const getButtonType = type => type === 'primary' || type === 'default' ? 'filled' : type === 'neutral' ? 'outlined' : 'text'
</script>
