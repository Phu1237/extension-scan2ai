<template>
  <h1 class="mb-4">Instruction</h1>
  <div class="text-h6">
    <div class="font-weight-bold">Notice:</div>
    This extension just work best with websites.<br />
    <a href="https://chromewebstore.google.com/">Chrome Web Store</a> will not be works.<br />
    For file open from your local file (like PDF, image, etc), please see
    <RouterLink :to="{ name: 'tips' }">Tips</RouterLink>
  </div>
  <v-divider class="my-4"></v-divider>
  <div class="text-body-1">
    <div class="text-h6 font-weight-bold">How to use</div>
    <div class="text-subtitle-1 font-weight-bold">Step 1:</div>
    - Choose the Assitant you want to use<br />
    + Gemini: <span v-html="API.GEMINI.hint.api_key"></span><br />
    + OpenAI: <span v-html="API.OPENAI.hint.api_key"></span><br />
    <div class="text-subtitle-1 font-weight-bold">Step 2:</div>
    - Go to <RouterLink :to="{ name: 'setting' }">Setting</RouterLink> (1)<br />
    - Choose your Assistant model (2)<br />
    - Fill in the API key field (3)<br />
    + Other fields can be default<br />
    - Click Update button (4)<br />
    <v-img :src="SettingAPIKeyImage" /><br />
    <div class="text-subtitle-1 font-weight-bold">Step 3: Start using extension's features</div>
    - Go to the website you want use this extension for<br />
    - Click on the Extension icon in the Extension menu<br />
    + When the extension is available, it will be have a <b>ON</b> text<br />
    <v-img :src="ExtensionOnImage" width="100px" /><br />
    - You can start Selecting the area you want to scan<br />
    - After the result dialog is shown, you can click on the Scan button to start action with it<br />
    <iframe
      width="1020"
      height="630"
      src="https://www.youtube.com/embed/A9s2cmzjEFE?si=Qf0ISs5l17vWLi8W"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import SettingAPIKeyImage from '@/assets/imgs/instruction/setting-api-key.png';
import ExtensionOnImage from '@/assets/imgs/instruction/extension-on.png';
import { API } from '@/constants/ai';
</script>
