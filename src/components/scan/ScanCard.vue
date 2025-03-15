<template>
  <v-card>
    <v-img height="300px" :src="image"></v-img>
    <v-btn
      color="primary"
      class="mx-4"
      :loading="clickActionLoading"
      :disabled="clickActionLoading"
      @click="() => {}"
    >
      Refresh scan image
    </v-btn>

    <template v-if="!hasApiKeySetting">
      <v-card-title>
        You need setting API key first to using this function.<br />
        If you don't know what you are doing, click INSTRUCTION<br />
        Click GO TO SETTING to setup API key
      </v-card-title>
      <v-card-actions>
        <v-btn color="primary" text="INSTRUCTION" @click="onClickInstruction"></v-btn>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text="GO TO SETTING" @click="onClickSetting"></v-btn>
      </v-card-actions>
    </template>

    <template v-else>
      <v-card-title>Run action for this image</v-card-title>
      <v-card-subtitle>
        If you want to run a custom action without add to the action list, you can use this.
        <v-text-field
          label="Custom action"
          class="mt-2 mb-4"
          variant="outlined"
          :append-icon="clickActionLoading ? 'mdi-send-lock' : 'mdi-send'"
          @click:append="onClickActionCustom"
          @keydown.enter.prevent="onClickActionCustom"
          v-model="customAction"
          :loading="clickActionLoading"
        ></v-text-field>
        <v-textarea
          :label="resultLabel"
          variant="outlined"
          :base-color="responseSuccess ? 'success' : ''"
          :color="responseSuccess ? 'success' : ''"
          v-model="responseResult"
          active
          auto-grow
          :error="responseSuccess === false"
          :focused="responseResult !== ''"
          @update:focused="() => {}"
          :loading="clickActionLoading"
          readonly
        ></v-textarea>
        <template v-if="chromeSync.api === 'gemini'">
          If you use Gemini, sometimes you will see weird results like "RECITATION".<br />
          It is because the Gemini has already flagged the content so you can't process your image.
          See the description
          <a
            href="https://ai.google.dev/api/rest/v1/GenerateContentResponse#finishreason"
            target="_blank"
            >here</a
          >.
        </template>
      </v-card-subtitle>

      <v-card-actions>
        <v-btn color="primary" text="GO TO SETTING" @click="onClickSetting"></v-btn>

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
            <h3 class="mb-2">Fast actions</h3>
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
    </template>
  </v-card>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import type { PropType } from 'vue';
import type { Storage } from '@/types/storage';
import useAI from '@/composables/useai';

const route = useRoute();
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

const resultLabel = ref<string>('Result');
const responseResult = ref<string>('');
const responseSuccess = ref<boolean>();
const clickActionLoading = ref<boolean>(false);
const onClickAction = async (action: string) => {
  resultLabel.value = 'Result: ' + action;
  clickActionLoading.value = true;
  responseResult.value = 'Loading...';
  responseSuccess.value = undefined;
  try {
    const response = await sendRequest(
      {
        local: props.chromeLocal,
        sync: props.chromeSync
      },
      action
    );
    const { result, success } = await handleResponse(
      {
        local: props.chromeLocal,
        sync: props.chromeSync
      },
      response
    );
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
  resultLabel.value = 'Result: ' + customActionValue;
  customAction.value = '';
  clickActionLoading.value = true;
  responseResult.value = 'Loading...';
  responseSuccess.value = undefined;
  try {
    const response = await sendRequest(
      {
        local: props.chromeLocal,
        sync: props.chromeSync
      },
      customActionValue
    );
    const { result, success } = await handleResponse(
      {
        local: props.chromeLocal,
        sync: props.chromeSync
      },
      response
    );
    responseResult.value = result;
    responseSuccess.value = success;
  } catch (err) {
    responseResult.value = String(err);
    responseSuccess.value = false;
  }
  clickActionLoading.value = false;
};

const onClickInstruction = () => {
  router.push({ name: 'instruction' });
};
const onClickSetting = () => {
  router.push({ name: 'setting' });
};

const hasApiKeySetting = computed(() => {
  return Boolean(props.chromeSync.api ? props.chromeLocal.apiKey?.[props.chromeSync.api] : false);
});
watch(hasApiKeySetting, () => {
  if (route.query.action) {
    const action = route.query.action as string;
    onClickAction(action);
  }
});
</script>
