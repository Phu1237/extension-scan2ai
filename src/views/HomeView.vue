<template>
  <div class="m-2 border-4 border-black border-solid">
    <img :src="image" alt="" @click="scan" />
    <textarea class="bg-primary" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const scan = () => {
  console.log('scan')
}
import useChromeStorage from '@/composables/usechromestorage'

const { get } = useChromeStorage()
const image = ref('')
get(['image'], (res) => {
  image.value = res.image
})
</script>
