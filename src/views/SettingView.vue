<template>
  <h1 class="mb-4">Setting</h1>
  <div class="mb-3">
    <h2 class="mb-2">Extension settings</h2>
    <v-select
      label="Capture method (*)"
      hint="hint"
      class="mb-2"
      :items="CAPTURE_METHOD_LIST"
      item-title="name"
      item-value="value"
      item-props="props"
      v-model="captureMethod"
      persistent-hint
    >
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          {{ TOOLTIP.CAPTURE_METHOD }}
        </v-tooltip>
      </template>
      <template #message>
        <div v-html="captureMethodHint"></div>
      </template>
    </v-select>
    <v-select
      label="Selecting method (*)"
      class="mb-2"
      :items="SELECTING_METHOD_LIST"
      item-title="name"
      item-value="value"
      item-props="props"
      v-model="selectingMethod"
      persistent-hint
    >
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          {{ TOOLTIP.SELECTING_METHOD }}
        </v-tooltip>
      </template>
    </v-select>
    <v-combobox
      label="History limit records (*)"
      :hint="`Save history will take more storage. Storage usage: ${chromeLocalUsage}%`"
      class="mb-2"
      :items="HISTORY_LIMIT_SIZE_LIST"
      v-model="historyLimitSize"
      persistent-hint
    >
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          {{ TOOLTIP.HISTORY_LIMIT_SIZE }}
        </v-tooltip>
      </template>
    </v-combobox>
    <v-select
      label="Fast Forward Default Command"
      :items="commandList"
      v-model="fastForwardCommand"
      class="mb-2"
      persistent-hint
    >
      <template v-slot:prepend>
        <v-switch
          :label="'Fast Forward: ' + (isFastForward ? 'ON' : 'OFF')"
          v-model="isFastForward"
          color="primary"
          hide-details
        ></v-switch>
      </template>
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          Automatically execute the default command after capture, skipping the popup.
        </v-tooltip>
      </template>
    </v-select>
  </div>
  <div class="mb-3">
    <h2 class="mb-2">Assistant settings</h2>
    <v-select
      label="Choose your Assistant (*)"
      class="mb-2"
      :items="API_LIST"
      item-title="name"
      item-value="value"
      v-model="api"
      persistent-hint
    >
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          {{ TOOLTIP.API }}
        </v-tooltip>
      </template>
    </v-select>
    <v-select
      label="Assistant model (*)"
      hint="hint"
      class="mb-2"
      :items="apiModelList"
      item-title="name"
      item-value="value"
      v-model="apiModelListModel"
      @update:modelValue="updateApiModel"
      persistent-hint
    >
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          {{ TOOLTIP.API_MODEL }}
        </v-tooltip>
      </template>
      <template #message>
        <div v-html="apiHint?.model"></div>
      </template>
    </v-select>
    <v-text-field label="Assistant model name (*)" class="mb-2" v-model="apiModel" persistent-hint>
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          {{ TOOLTIP.API_MODEL_NAME }}
        </v-tooltip>
      </template>
    </v-text-field>
    <v-text-field
      v-if="api === 'openai-compatible'"
      label="Base URL (*)"
      hint="e.g. http://localhost:11434/v1/chat/completions"
      class="mb-2"
      v-model="apiUrl"
      persistent-hint
    >
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          Enter the full URL for the chat completions endpoint.
        </v-tooltip>
      </template>
    </v-text-field>
    <v-text-field
      :label="'API key ' + (oldApiKey === '' ? '(*)' : '(Optional)')"
      hint="hint"
      class="mb-2"
      :placeholder="apiKeyPlaceholder"
      v-model="apiKey"
      persistent-hint
      persistent-placeholder
    >
      <template v-slot:append>
        <v-tooltip location="bottom">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
          </template>
          {{ TOOLTIP.API_KEY }}
        </v-tooltip>
      </template>
      <template #message>
        <div v-html="apiHint?.api_key"></div>
      </template>
    </v-text-field>
  </div>

  <div class="d-flex flex-wrap ga-3">
    <v-btn color="primary" @click="setData">Update</v-btn>
    <v-btn color="secondary" @click="onClearAPIKey" v-if="api">
      Clear {{ getAIName(api) }} API Key
    </v-btn>
    <v-btn @click="onClickGotoDashboard"> Go to Dashboard </v-btn>
    <template v-if="isDev">
      <v-btn @click="check">Check</v-btn>
      <v-btn @click="clearData">Clear</v-btn>
      <v-btn @click="test">Test</v-btn>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, computed, watch } from 'vue';
import router from '@/router';
import type { Storage } from '@/types/storage';
import { API } from '@/constants/ai';
import { CHROME_STORAGE } from '@/constants/common';
import {
  TOOLTIP,
  DEFAULT,
  CAPTURE_METHOD_LIST,
  SELECTING_METHOD_LIST,
  HISTORY_LIMIT_SIZE_LIST,
  API_LIST,
  API_MODEL_LIST
} from '@/constants/setting';
import useCommon from '@/composables/usecommon';
import useAI from '@/composables/useai';
import useChromeStorage from '@/composables/usechromestorage';

const { isDev, log, getStorageUsage, base64ImageToImageObject } = useCommon();
const { getAIName, maskAPIKey } = useAI();
const {
  getChromeStorage,
  setChromeStorage,
  clearChromeStorage,
  pushChromeStorageHistory,
  clearChromeStorageHistory
} = useChromeStorage();

onBeforeMount(async () => {
  await fetchData();
});

const chromeLocal = ref<Storage>({});
const chromeSync = ref<Storage>({});
const image = ref<string>('');
const captureMethod = ref<string>();
const selectingMethod = ref<number>();
const historyLimitSize = ref<number>();
const isFastForward = ref<boolean>(false);
const fastForwardCommand = ref<string>('');
const extraContent = ref<string[]>([]);
const api = ref<string>();
const apiModel = ref<string>();
const apiUrl = ref<string>();
const apiKey = ref<string>();
const oldApiKey = ref<string>();
const chromeLocalUsage = ref<number>();

const fetchData = async () => {
  const local = await getChromeStorage(CHROME_STORAGE.LOCAL, null);
  log('Chrome storage local: ', local);
  chromeLocal.value = local;
  image.value = local.image ?? DEFAULT.image;
  oldApiKey.value = api.value ? local.apiKey?.[api.value] : '';

  const sync = await getChromeStorage(CHROME_STORAGE.SYNC, null);
  log('Chrome storage sync: ', sync);
  chromeSync.value = sync;
  captureMethod.value = sync.captureMethod ?? DEFAULT.captureMethod;
  selectingMethod.value = sync.selectingMethod ?? DEFAULT.selectingMethod;
  historyLimitSize.value = sync.historyLimitSize ?? DEFAULT.historyLimitSize;
  isFastForward.value = sync.fastForward ?? DEFAULT.isFastForward;
  fastForwardCommand.value = sync.fastForwardCommand ?? DEFAULT.fastForwardCommand;
  extraContent.value = sync.extraContent ?? DEFAULT.extraContent;
  api.value = sync.api ?? DEFAULT.api;
  apiModel.value = sync.apiInfo?.[api.value]?.apiModel ?? DEFAULT.apiInfo.gemini.apiModel;
  apiUrl.value = sync.apiInfo?.[api.value]?.apiUrl ?? '';

  const { usage } = await getStorageUsage(CHROME_STORAGE.LOCAL);
  chromeLocalUsage.value = Math.round(usage * 100);
};

watch(api, (newAPI) => {
  if (!newAPI) return;
  let apiModelValue = DEFAULT.apiInfo[newAPI].apiModel;
  let storageApiModel = chromeSync.value?.apiInfo?.[newAPI];
  if (storageApiModel) {
    apiModelValue = storageApiModel.apiModel;
  }

  apiModel.value = apiModelValue;
  apiUrl.value = chromeSync.value?.apiInfo?.[newAPI]?.apiUrl ?? '';
  apiKey.value = '';
  oldApiKey.value = chromeLocal.value?.apiKey?.[newAPI] ?? '';
});

const apiModelList = computed(() => {
  if (!api.value) return [];
  return API_MODEL_LIST[api.value];
});
const apiModelListModel = computed(() => {
  if (!api.value) return '';
  let apiModelValue = API_MODEL_LIST[api.value]?.find((item) => item.value === apiModel.value);
  if (apiModelValue) {
    return apiModelValue.value;
  }
  return '';
});
const updateApiModel = (value: string) => {
  apiModel.value = value;
};

const apiKeyPlaceholder = computed(() => {
  return maskAPIKey(oldApiKey.value ?? '');
});
// Hints
const captureMethodHint = computed(() => {
  const captureMethodWithHint = CAPTURE_METHOD_LIST.find(
    (item) => item.value === captureMethod.value
  );
  return captureMethodWithHint?.hint;
});
const commandList = computed(() => {
  return [...new Set([...DEFAULT.extraContent, ...extraContent.value])];
});
const apiHint = computed(() => {
  const apiWithHint = API_LIST.find((item) => item.value === api.value);
  return apiWithHint?.hint;
});

const onClearAPIKey = async () => {
  if (!api.value) return '';
  apiKey.value = '';
  oldApiKey.value = '';
  await setChromeStorage(CHROME_STORAGE.LOCAL, {
    apiKey: {
      ...chromeLocal.value?.apiKey,
      [api.value]: ''
    }
  });
  alert('Clear API key successfully!');
};

const onClickGotoDashboard = () => {
  router.push({ name: 'dashboard' });
};

const check = () => {
  log('captureMethod', captureMethod.value);
  log('selectingMethod', selectingMethod.value);
  log(
    'historyLimitSize',
    historyLimitSize.value,
    parseInt(historyLimitSize.value as unknown as string) ?? DEFAULT.historyLimitSize
  );
  log('api', api.value);
  log('apiModel', apiModel.value);
  log('apiKey', apiKey.value);
};

const setData = async () => {
  if (!api.value) return '';
  if (apiKey.value?.trim() !== '') {
    await setChromeStorage(CHROME_STORAGE.LOCAL, {
      apiKey: {
        ...chromeLocal.value.apiKey,
        [api.value]: apiKey.value?.trim() ?? ''
      }
    });
  }
  await setChromeStorage(CHROME_STORAGE.SYNC, {
    captureMethod: captureMethod.value?.trim(),
    selectingMethod: selectingMethod.value,
    api: api.value.trim(),
    apiInfo: {
      [api.value]: {
        apiModel: apiModel.value?.trim() ?? '',
        apiUrl: apiUrl.value?.trim() ?? ''
      }
    },
    historyLimitSize: parseInt(historyLimitSize.value as unknown as string),
    isFastForward: isFastForward.value,
    fastForwardCommand: fastForwardCommand.value
  });
  alert('Update setting successfully!');
};
const clearData = async () => {
  await clearChromeStorage(CHROME_STORAGE.LOCAL);
  clearChromeStorageHistory();
  await clearChromeStorage(CHROME_STORAGE.SYNC);
};

const test = async () => {
  if (!api.value) return '';
  let rawResult: any;
  let jsonResult: any;
  let result: string = '';
  if (api.value === 'gemini') {
    const { useGemini } = useAI();
    const { buildRequestMessage, sendRequest } = useGemini();
    const imageObject = base64ImageToImageObject(image.value);
    const messages = buildRequestMessage([
      'image to text',
      {
        type: 'image',
        content: imageObject
      }
    ]);
    rawResult = await sendRequest(
      {
        api_model: apiModel.value?.trim(),
        api_key: oldApiKey.value?.trim()
      },
      {
        messages: messages
      }
    );
    jsonResult = await rawResult.json();

    result =
      jsonResult.candidates?.[0]?.content.parts?.[0]?.text ??
      jsonResult.error?.message ??
      'Unexpected error. Check raw result.';
  } else if (
    api.value === 'openai' ||
    api.value === 'deepseek' ||
    api.value === 'xai' ||
    api.value === 'openai-compatible'
  ) {
    let endpoint = API.OPENAI.uri;
    switch (api.value) {
      case 'deepseek':
        endpoint = API.DEEPSEEK.uri;
        break;
      case 'xai':
        endpoint = API.XAI.uri;
        break;
      case 'openai-compatible':
        endpoint = apiUrl.value?.trim() ?? '';
        break;
    }
    const { useOpenAI } = useAI();
    const { buildRequestMessage, sendRequest } = useOpenAI(endpoint);
    const messages = buildRequestMessage([
      'image to text',
      {
        type: 'image',
        content: image.value
      }
    ]);
    rawResult = await sendRequest(
      {
        api_model: apiModel.value?.trim(),
        api_key: oldApiKey.value?.trim()
      },
      {
        messages: messages
      }
    );
    jsonResult = await rawResult.json();
    result =
      jsonResult.choices?.[0]?.message.content ??
      jsonResult.error?.message ??
      'Unexpected error. Check raw result.';
  }
  const newHistory = {
    api: api.value,
    apiInfo: {
      apiModel: apiModel.value?.trim() ?? ''
    },
    session: {
      content: image.value,
      extraContent: ['image to text']
    },
    timestamp: Date.now(),
    success: rawResult.status === 200,
    result: result,
    rawResult: JSON.stringify(jsonResult)
  };
  pushChromeStorageHistory(newHistory);
  log('raw', rawResult);
  log('log new history', newHistory);
};
</script>
