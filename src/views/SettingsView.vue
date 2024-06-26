<template>
  <div class="py-12">
    <h2 class="text-2xl font-bold">Extension settings</h2>
    <div class="mt-8 max-w-md">
      <label class="block">
        <span class="text-gray-700">Capture method</span>
        <select
          class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          v-model="captureMethod"
        >
          <option value="0">Chrome API (visible content)</option>
          <option value="1">Chrome API (fullpage)</option>
          <option value="2">Html2canvas</option>
        </select>
      </label>
      <small>ABC</small>
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
            v-model="apiModel"
          >
            <option value="0">Gemini</option>
            <option value="1">OpenAI</option>
          </select>
        </label>
        <label class="block">
          <span class="text-gray-700">Assistant model</span>
          <select
            class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="apiModel"
          >
            <template v-for="(item, index) in availableList" :key="index">
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
            :disabled="apiModelName !== ''"
          />
        </label>
        <label class="block">
          <span class="text-gray-700">API key</span>
          <input
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>

        <button @click="fetchData">Fetch</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import useAI from '@/composables/useai';

const { availableList } = useAI();
console.log(availableList);

const fetchData = () => {
  console.log(apiModel.value);
  return;
};

const captureMethod = ref<number>(0);
const apiModel = ref(null);

const apiModelName = computed(() => {
  return availableList.find((item) => item.value === apiModel.value)?.value;
});
</script>
