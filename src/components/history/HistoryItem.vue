<template>
  <v-card :color="history.success ? 'success' : 'error'" class="mx-auto">
    <v-img height="200px" class="mx-2" :src="history.session.content"></v-img>

    <v-card-title>{{ history.session.extraContent?.[0] }}</v-card-title>

    <v-card-subtitle>{{ new Date(history.timestamp) }}</v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2">
        RAW RESULT
        <v-dialog activator="parent" :width="500">
          <template v-slot:default="{ isActive }">
            <v-card
              style="white-space: break-spaces"
              prepend-icon="mdi-picture-in-picture-bottom-right"
              :text="JSON.stringify(JSON.parse(history.rawResult), null, 4)"
              title="RAW RESULT"
            >
              <template v-slot:actions>
                <v-btn class="ml-auto" text="Close" @click="isActive.value = false"></v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <b>Assistant</b>: {{ history.api }}<br />
          <b>Assistant model</b>: {{ history.apiInfo.apiModel }}<br />
          <b>Result</b>:<br />
          <span style="white-space: break-spaces">{{ history.result }}</span>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, type PropType } from 'vue';
import type { StorageHistoryItem } from '@/types/storage';

defineProps({
  history: {
    type: Object as PropType<StorageHistoryItem>,
    required: true
  }
});

const show = ref<boolean>(false);
</script>
