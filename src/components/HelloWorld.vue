<script setup>
import { ref } from 'vue';
import BButton from './BButton.vue';
import BModal from './BModal.vue'
import MButton from './MButton-extend.vue'
import MModal from './MModal.vue'

defineProps({
  msg: String,
})

const sizes = ['small', 'medium', 'large']
const showBModal = ref(false)
const showMModal = ref(false)
const size = ref('medium')

const cycleSize = () => {
  const currentIndex = sizes.indexOf(size.value)
  const nextIndex = (currentIndex + 1) % sizes.length
  size.value = sizes[nextIndex]
}

const testButtonEvent = () => {
  showBModal.value = !showBModal.value
  cycleSize()
}

const testLitButtonEvent = () => {
  showMModal.value = !showMModal.value
  cycleSize()
}

</script>

<template>

<BButton :size="size" type="default" id="test" label="Vue Filled" @click="testButtonEvent" />
<BButton :size="size" type="neutral" id="test" label="Vue Outlined" @click="testButtonEvent" />
<BButton :size="size" type="link" id="test" label="Vue Link" @click="testButtonEvent" />

<br/><br/>

<MButton variant="filled" type="primary" :size="size" id="lit-button-test" label="MD Filled" @click="testLitButtonEvent" />
<MButton variant="outlined" type="secondary" :size="size" id="lit-button-test" label="MD Outlined" @click="testLitButtonEvent" />
<MButton variant="text" type="tertiary" :size="size" id="lit-button-test" label="MD Link" @click="testLitButtonEvent" />

<BModal :closeOnPrimaryClick="true" :closeOnOverlayClick="true" v-model="showBModal" id="create-user-modal" title="Create User" type="form" primaryActionText="Submit" secondaryActionText="Cancel" tertiaryActionText="Submit & New" />
<MModal :closeOnPrimaryClick="true" :closeOnOverlayClick="true" v-model="showMModal" id="create-user-modal" title="Create User" type="form" primaryActionText="Submit" secondaryActionText="Cancel" tertiaryActionText="Submit & New" message="This is a test." />

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
