<template>
  <v-navigation-drawer>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-help"
        title="Instruction"
        value="instruction"
        :to="{ name: 'instruction' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-home"
        title="Dashboard"
        value="dashboard"
        :to="{ name: 'dashboard' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-history"
        title="History"
        value="history"
        :to="{ name: 'history' }"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-cog"
        title="Setting"
        value="Setting"
        :to="{ name: 'setting' }"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup></script>
