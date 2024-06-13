<template>
  <div class="m-2 border-4 border-black border-solid">
    <img src="@/assets/imgs/scan.png" alt="" @click="scan" />
    <textarea class="bg-primary" />
  </div>
</template>

<script lang="ts" setup>
const scan = () => {
  console.log('scan')
}
</script>
