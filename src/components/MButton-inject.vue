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
    import useShadowStyles from '../composables/useShadowStyles.js'
    import filledStyles from '../webcomponents/button/css/_filled-override.css?inline'
    import outlinedStyles from '../webcomponents/button/css/_outlined-override.css?inline'
    import textStyles from '../webcomponents/button/css/_text-override.css?inline'
    
    const props = defineProps(propSpecs)
    const buttonType = getButtonType(props.type)
    const mdComponentName = `md-${ buttonType }-button`

    const styles = buttonType === 'filled' ? filledStyles : buttonType === 'outlined' ? outlinedStyles : textStyles
    const { autoInject } = useShadowStyles()
    autoInject(styles)
</script>

<script>
    const getButtonType = type => type === 'primary' || type === 'default' ? 'filled' : type === 'neutral' ? 'outlined' : 'text'
</script>
