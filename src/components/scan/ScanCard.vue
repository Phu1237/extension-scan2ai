<template>
  <v-card>
    <v-img height="300px" :src="image"></v-img>

    <v-card-title> Run action for this image </v-card-title>

    <v-card-subtitle>
      <v-text-field
        label="Custom action"
        hint="If you want to run a custom action without add to the action list, you can use this."
        class="my-2"
        variant="outlined"
        :append-icon="clickActionLoading ? 'send-lock' : 'mdi-send'"
        @click:append="onClickActionCustom"
        @keydown.enter.prevent="onClickActionCustom"
        v-model="customAction"
        persistent-hint
      ></v-text-field>
      <v-textarea
        label="Result"
        variant="outlined"
        :error="!responseSuccess"
        :loading="clickActionLoading"
        v-model="responseResult"
        readonly
        auto-grow
      ></v-textarea>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" text="SETTING" @click="onClickSetting"></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="showExtraContent ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showExtraContent = !showExtraContent"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="true">
        <v-divider></v-divider>

        <v-card-text>
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
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import router from '@/router';
import type { PropType } from 'vue';
import useAI from '@/composables/useai';
import type { Storage } from '@/types/storage';

const { sendRequest, handleResponse } = useAI();

const props = defineProps({
  chromeLocal: {
    type: Object as PropType<Storage>,
    required: true
  },
  chromeSync: {
    type: Object as PropType<Storage>,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  actions: {
    type: Array<string>,
    required: true
  }
});

const showExtraContent = ref<boolean>(true);

const responseResult = ref<string>('');
const responseSuccess = ref<boolean>(true);
const clickActionLoading = ref<boolean>(false);
const onClickAction = async (action: string) => {
  clickActionLoading.value = true;
  responseResult.value = 'Loading...';
  responseSuccess.value = true;
  try {
    const response = await sendRequest(
      {
        local: props.chromeLocal,
        sync: props.chromeSync
      },
      action
    );
    // TODO: Fix later
    const { result, success } = (await handleResponse(
      {
        local: props.chromeLocal,
        sync: props.chromeSync
      },
      response
    )) as any;
    responseResult.value = result;
    responseSuccess.value = success;
  } catch (err) {
    responseResult.value = String(err);
    responseSuccess.value = false;
  }
  clickActionLoading.value = false;
};
const customAction = ref<string>('');
const onClickActionCustom = async () => {
  const customActionValue = customAction.value.trim();
  if (!customActionValue) {
    alert('Custom action must be not empty.');
    return;
  }
  customAction.value = '';
  clickActionLoading.value = true;
  responseResult.value = 'Loading...';
  responseSuccess.value = true;
  try {
    const response = await sendRequest(
      {
        local: props.chromeLocal,
        sync: props.chromeSync
      },
      customAction.value
    );
    // TODO: Fix later
    const { result, success } = (await handleResponse(
      {
        local: props.chromeLocal,
        sync: props.chromeSync
      },
      response
    )) as any;
    responseResult.value = result;
    responseSuccess.value = success;
    return;
  } catch (err) {
    responseResult.value = String(err);
    responseSuccess.value = false;
  }
  clickActionLoading.value = false;
};

const onClickSetting = () => {
  // Implement your setting logic here
  router.push({ name: 'setting' });
};
</script>
