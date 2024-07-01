<template>
  <h1>Dashboard</h1>
  <div class="d-flex flex-column ga-3">
    <img :src="image" />
    <div class="d-flex flex-wrap ga-3">
      <template v-for="(action, index) in actions" :key="index">
        <v-btn
          color="primary"
          :loading="clickActionLoading"
          :disabled="clickActionLoading"
          @click="onClickAction(action)"
        >
          {{ action }}
        </v-btn>
      </template>
    </div>
    <v-textarea
      label="Result"
      variant="outlined"
      :error="!responseSuccess"
      :loading="clickActionLoading"
      v-model="responseResult"
      readonly
      auto-grow
    ></v-textarea>
    <v-divider />
    <v-text-field
      label="New action"
      hint="Add new action"
      append-icon="mdi-plus-circle-outline"
      @click:append="onClickAddAction"
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
import { CHROME_STORAGE } from '@/constants/common';
import useAI from '@/composables/useai';
import useChromeStorage from '@/composables/usechromestorage';
import { DEFAULT_EXTRA_CONTENTS } from '@/constants/extracontent';
import type { Storage } from '@/types/storage';

const { sendRequest, handleResponse } = useAI();
const { getChromeStorage, pushChromeStorageExtraContent, removeChromeStorageExtraContent } =
  useChromeStorage();

const chromeLocal = ref<Storage>({});
const chromeSync = ref<Storage>({});
const image = ref<string>('');
const actions = ref<Array<string>>([]);
onBeforeMount(async () => {
  const local = await getChromeStorage(CHROME_STORAGE.LOCAL);
  chromeLocal.value = local;
  image.value = local.image ?? '';
  const sync = await getChromeStorage(CHROME_STORAGE.SYNC);
  chromeSync.value = sync;
  actions.value.push(...DEFAULT_EXTRA_CONTENTS, ...(sync.extraContent ?? []));
});

const responseResult = ref<string>('');
const responseSuccess = ref<boolean>(true);
const clickActionLoading = ref<boolean>(false);
const onClickAction = async (action: string) => {
  clickActionLoading.value = true;
  responseResult.value = 'Loading...';
  responseSuccess.value = true;
  const response = await sendRequest(
    {
      local: chromeLocal.value,
      sync: chromeSync.value
    },
    action
  );
  const { result, success } = await handleResponse(
    {
      local: chromeLocal.value,
      sync: chromeSync.value
    },
    response
  );
  responseResult.value = result;
  responseSuccess.value = success;
  clickActionLoading.value = false;
};

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
