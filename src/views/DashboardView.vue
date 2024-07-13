<template>
  <h1 class="mb-4">Dashboard</h1>
  <div class="d-flex flex-column ga-3">
    <ScanCard
      :chrome-local="chromeLocal"
      :chrome-sync="chromeSync"
      :image="image"
      :actions="actions"
    />
    <v-divider />
    <h2>Add new action to the fast action list to use later</h2>
    <v-text-field
      label="New action. Ex: Translate to <YOUR_LANGUAGE>"
      append-icon="mdi-plus-circle-outline"
      @click:append="onClickAddAction"
      @keydown.enter.prevent="onClickAddAction"
      variant="outlined"
      v-model="newAction"
    ></v-text-field>
    <v-table height="300px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Type</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in actions" :key="item">
          <td>{{ item }}</td>
          <td>
            <template v-if="index < DEFAULT_EXTRA_CONTENTS.length"> BASE </template>
            <template v-else> USER </template>
          </td>
          <td>
            <template v-if="index > DEFAULT_EXTRA_CONTENTS.length - 1">
              <v-btn @click="onClickDeleteAction(item)">Delete</v-btn>
            </template>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import type { Storage } from '@/types/storage';
import { CHROME_STORAGE } from '@/constants/common';
import { DEFAULT_EXTRA_CONTENTS } from '@/constants/extracontent';
import { HELLO_WORLD_IMAGE } from '@/constants/sample';
import useChromeStorage from '@/composables/usechromestorage';
import ScanCard from '@/components/scan/ScanCard.vue';

const { getChromeStorage, pushChromeStorageExtraContent, removeChromeStorageExtraContent } =
  useChromeStorage();

const chromeLocal = ref<Storage>({});
const chromeSync = ref<Storage>({});
const image = ref<string>('');
const actions = ref<Array<string>>([]);
onBeforeMount(async () => {
  const local = await getChromeStorage(CHROME_STORAGE.LOCAL);
  chromeLocal.value = local;
  image.value = local.image ?? HELLO_WORLD_IMAGE;
  const sync = await getChromeStorage(CHROME_STORAGE.SYNC);
  chromeSync.value = sync;
  actions.value.push(...DEFAULT_EXTRA_CONTENTS, ...(sync.extraContent ?? []));
});

const newAction = ref<string>('');
const onClickAddAction = () => {
  const newActionValue = newAction.value.trim();
  if (!newActionValue || actions.value.includes(newActionValue)) {
    alert('New action must be not empty and not duplicated in the action list.');
    return;
  }
  actions.value.push(newActionValue);
  pushChromeStorageExtraContent(newActionValue);
  newAction.value = '';
};
const onClickDeleteAction = (content: string) => {
  const confirmDelete = confirm('Are you sure to delete this action?');
  if (!confirmDelete) {
    return;
  }
  const removeIndex = actions.value.indexOf(content);
  if (removeIndex > -1) {
    actions.value.splice(removeIndex, 1);
  }

  removeChromeStorageExtraContent(content, removeIndex - DEFAULT_EXTRA_CONTENTS.length);
};
</script>
