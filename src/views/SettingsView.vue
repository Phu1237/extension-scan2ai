<template>
  <div class="py-12">
    <h2 class="text-2xl font-bold">Simple</h2>
    <div class="mt-8 max-w-md">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="text-gray-700">What type of event is it?</span>
          <select
            class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="apiModel"
          >
            <option value="0">Gemini</option>
            <option value="1">OpenAI</option>
          </select>
        </label>
        <label class="block">
          <span class="text-gray-700">Full name</span>
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
import { ref } from 'vue'
const fetchData = () => {
  console.log(apiModel.value)
  return
}

const apiModel = ref(null)
</script>
