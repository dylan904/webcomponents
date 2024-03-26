<template>
    <bmd-modal
      :style="{ margin: 'auto', width: `${width}px`, height: `${modalHeight}px` }"
      :open="modelValue"
      :id="id"

      @close="emit('before-close-click'); emit('update:modelValue', false)"
      @closed="emit('close-click'); emit('modal-close')"
      @cancel="onCancel"
    >
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <font-awesome-icon slot="icon" 
            v-if="iconType && type !== 'empty'" 
            :icon="faIcon" 
        />

        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <div v-if="type !== 'empty'" slot="headline">
            {{ title }}
        </div>

        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <div slot="content">{{ message }}</div>

        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <component :is="modalComponentName" slot="actions" :method="type === 'form' ? 'form' : null">
            <md-text-button 
                v-if="showSecondaryAction"
                @click="emit('secondary-click')" >
                {{ secondaryActionText }}
            </md-text-button>

            <md-text-button 
                v-if="type === 'form' && showTertiaryAction"
                @click="emit('tertiary-click')"
                :disabled="disableTertiaryAction">
                {{ tertiaryActionText }}
            </md-text-button>

            <md-text-button 
                @click="emit('primary-click')"   
                :disabled="disablePrimaryAction">
                {{ primaryActionText }}
            </md-text-button>
        </component>
    </bmd-modal>
</template>
  
<script setup>
    import propSpecs from '../webcomponents/modal/props.js'
    
    const props = defineProps(propSpecs)
    const emit = defineEmits(['modal-close', 'primary-click', 'secondary-click', 'tertiary-click', 'close-click', 'update:modelValue', 'before-close-click'])

    const modalComponentName = getModalType(props.type)
    const faIcon = ['fa', getIconName(props.iconType)]

    const onCancel = (ev) => {  // upon escape or clicking overlay
        if (!props.closeOnOverlayClick) {
            ev.preventDefault();
        }
    }
</script>

<script>
    const getModalType = type => type === 'form' ? 'form' : 'div'
    const getIconName = iconType => iconType === 'info' ? 'info-circle' : iconType === 'error' ? 'exclamation-triangle' : iconType === 'check' ? 'check' : null
</script>
