<template>
  <div class="m-2 border-4 border-black border-solid">
    <img :src="image" alt="" @click="scan" />
    <textarea class="bg-primary" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CHROME_STORAGE } from '@/constants/common';
import useChromeStorage from '@/composables/usechromestorage';

const scan = () => {
  console.log('scan');
};
const { getChromeStorage } = useChromeStorage();
const image = ref<string>('');
getChromeStorage(CHROME_STORAGE.LOCAL, ['image']).then((res) => {
  image.value = res.image;
});
</script>
