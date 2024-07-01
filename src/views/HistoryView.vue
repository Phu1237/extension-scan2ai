<template>
  <h1>History</h1>
  <v-btn color="primary" class="mb-4" @click="clear" :loading="clearLoading">Clear history</v-btn>
  <v-btn color="info" class="mb-4 ml-2" disabled>{{ usageInfo }}</v-btn>
  <v-row dense>
    <v-col cols="3" v-for="(history, index) in histories" :key="index">
      <HistoryItem :history="history" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';
import { CHROME_STORAGE } from '@/constants/common';
import type { StorageHistoryItem } from '@/types/storage';
import useCommon from '@/composables/usecommon';
import useChromeStorage from '@/composables/usechromestorage';
import HistoryItem from '@/components/history/HistoryItem.vue';

const { getStorageUsage } = useCommon();
const { getChromeStorage, clearChromeStorageHistory } = useChromeStorage();

const histories = ref<StorageHistoryItem[]>([]);
onBeforeMount(async () => {
  await fetchData();
});

const chromeLocalUsed = ref<number>(0);
const chromeLocalQuota = ref<number>(0);
const chromeLocalUsage = ref<number>(0);
const fetchData = async () => {
  const local = await getChromeStorage(CHROME_STORAGE.LOCAL, ['history']);
  histories.value = local.history ?? [];
  const { used, quota, usage } = await getStorageUsage(CHROME_STORAGE.LOCAL);
  chromeLocalUsed.value = used;
  chromeLocalQuota.value = quota;
  chromeLocalUsage.value = Math.round(usage * 100);
};

const usageInfo = computed(() => {
  return `Used: ${chromeLocalUsed.value} / ${chromeLocalQuota.value} (${chromeLocalUsage.value}%)`;
});

const clearLoading = ref<boolean>(false);
const clear = async () => {
  clearLoading.value = true;
  await clearChromeStorageHistory();
  histories.value = [];
  clearLoading.value = false;
};
</script>
