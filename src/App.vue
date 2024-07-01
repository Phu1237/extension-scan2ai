<template>
  <v-responsive>
    <v-app>
      <AppBar />

      <AppNavigation />

      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script lang="ts" setup>
import AppBar from '@/components/AppBar.vue';
import AppNavigation from '@/components/AppNavigation.vue';
</script>
