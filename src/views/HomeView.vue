<template>
  <h1>Dashboard</h1>
  <img :src="image" alt="" @click="scan" />
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
  image.value = res.image ?? '';
});
</script>
