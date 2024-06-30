<template>
  <div class="py-12">
    <h2 class="text-2xl font-bold">Extension settings</h2>
    <div class="mt-8 max-w-md">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="text-gray-700">Capture method</span>
          <select
            class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="captureMethod"
          >
            <template v-for="(item, index) in CAPTURE_METHOD_LIST" :key="index">
              <option :value="item.value">{{ item.name }}</option>
            </template>
          </select>
          <small>ABC</small>
        </label>
        <label class="block">
          <span class="text-gray-700">Selecting method</span>
          <select
            class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="selectingMethod"
          >
            <template v-for="(item, index) in SELECTING_METHOD_LIST" :key="index">
              <option :value="item.value">{{ item.name }}</option>
            </template>
          </select>
          <small>ABC</small>
        </label>
      </div>
    </div>
  </div>
  <div class="py-12">
    <h2 class="text-2xl font-bold">Assistant settings</h2>
    <div class="mt-8 max-w-md">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="text-gray-700">Choose your Assistant</span>
          <select
            class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="api"
          >
            <template v-for="(item, index) in API_LIST" :key="index">
              <option :value="item.value">{{ item.name }}</option>
            </template>
          </select>
        </label>
        <label class="block">
          <span class="text-gray-700">Assistant model</span>
          <select
            class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="apiModel"
          >
            <template v-for="(item, index) in apiModelList" :key="index">
              <option :value="item.value">{{ item.name }}</option>
            </template>
          </select>
        </label>
        <label class="block">
          <span class="text-gray-700">Assistant model name</span>
          <input
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
            :value="apiModelName"
            :disabled="apiModelName !== 'custom'"
          />
        </label>
        <label class="block">
          <span class="text-gray-700">API key</span>
          <input
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
            v-model="apiKey"
          />
        </label>

        <button @click="setData">Update</button>
        <button @click="clearData">Clear</button>
        <button @click="test">Test</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, onBeforeMount, ref } from 'vue';
import useCommon from '@/composables/usecommon';
import useAI from '@/composables/useai';
import useChromeStorage from '@/composables/usechromestorage';
import { CHROME_STORAGE } from '@/constants/common';
import {
  DEFAULT,
  CAPTURE_METHOD_LIST,
  SELECTING_METHOD_LIST,
  API_LIST,
  API_MODEL_LIST
} from '@/constants/setting';
import type { Storage } from '@/types/storage';

const { base64ImageToImageObject } = useCommon();
const { getChromeStorage, setChromeStorage, clearChromeStorage } = useChromeStorage();

onBeforeMount(async () => {
  await fetchData();
});

const chromeLocal = ref<Storage>();
const chromeSync = ref<Storage>();
const image = ref<string>('');
const captureMethod = ref<string>('');
const selectingMethod = ref<number>(0);
const api = ref<string>(DEFAULT.api);
const apiModel = ref<string>('');
const apiKey = ref<string>('');

const fetchData = async () => {
  const local = await getChromeStorage(CHROME_STORAGE.LOCAL, null);
  console.log('Chrome storage local: ', local);
  chromeLocal.value = local;
  image.value = local.image ?? DEFAULT.image;

  const sync = await getChromeStorage(CHROME_STORAGE.SYNC, null);
  console.log('Chrome storage sync: ', sync);
  chromeSync.value = sync;
  captureMethod.value = sync.captureMethod ?? DEFAULT.captureMethod;
  selectingMethod.value = sync.selectingMethod ?? DEFAULT.selectingMethod;
  api.value = sync.api ?? DEFAULT.api;
  apiModel.value = sync.apiInfo?.[api.value]?.apiModel ?? DEFAULT.apiInfo.gemini.apiModel;
  apiKey.value = sync.apiKey?.[api.value] ?? '';
};

watch(api, (newAPI) => {
  apiModel.value =
    chromeSync.value?.apiInfo?.[newAPI]?.apiModel ?? DEFAULT.apiInfo[newAPI].apiModel;
  apiKey.value = chromeLocal.value?.apiKey?.[newAPI] ?? '';
});

const apiModelList = computed(() => {
  return API_MODEL_LIST[api.value];
});
const apiModelName = computed(() => {
  return API_MODEL_LIST[api.value]?.find((item) => item.value === apiModel.value)?.value;
});

const setData = async () => {
  await setChromeStorage(CHROME_STORAGE.LOCAL, {
    apiKey: {
      ...chromeLocal.value?.apiKey,
      [api.value]: apiKey.value.trim()
    }
  });
  await setChromeStorage(CHROME_STORAGE.SYNC, {
    captureMethod: captureMethod.value.trim(),
    selectingMethod: selectingMethod.value,
    api: api.value.trim(),
    apiInfo: {
      [api.value]: {
        apiModel: apiModel.value.trim()
      }
    }
  });
};
const clearData = async () => {
  await clearChromeStorage(CHROME_STORAGE.LOCAL);
  await clearChromeStorage(CHROME_STORAGE.SYNC);
};

const test = async () => {
  console.log('Test');
  let result: any;
  if (api.value === 'openai') {
    const { useOpenAI } = useAI();
    const { buildRequestMessage, makeRequest } = useOpenAI();
    const messages = buildRequestMessage([
      'image to text',
      {
        type: 'image',
        content: image.value
      }
    ]);
    console.log('openai message', messages);
    result = await makeRequest(
      {
        api_model: apiModel.value.trim(),
        api_key: apiKey.value.trim()
      },
      {
        messages: messages
      }
    );
  } else if (api.value === 'gemini') {
    const { useGemini } = useAI();
    const { buildRequestMessage, makeRequest } = useGemini();
    const imageObject = base64ImageToImageObject(image.value);
    const messages = buildRequestMessage([
      'image to text',
      {
        type: 'image',
        content: imageObject
      }
    ]);
    console.log('gemini message', messages);
    result = await makeRequest(
      {
        api_model: apiModel.value.trim(),
        api_key: apiKey.value.trim()
      },
      {
        messages: messages
      }
    );
  }
  console.log(result);
};
</script>
