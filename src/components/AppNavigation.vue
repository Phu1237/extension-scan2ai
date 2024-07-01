<template>
  <v-navigation-drawer>
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Dashboard" value="dashboard" to="/"></v-list-item>
      <v-list-item
        prepend-icon="mdi-history"
        title="History"
        value="history"
        to="history"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cog"
        title="Setting"
        value="Setting"
        to="setting"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup></script>
