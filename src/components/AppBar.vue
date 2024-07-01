<template>
  <v-app-bar :elevation="1">
    <template v-slot:prepend>
      <v-img :width="70" :src="Logo" />
    </template>

    <v-app-bar-title>Scan2AI</v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import Logo from '@/assets/imgs/scan.png';
</script>
