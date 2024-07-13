<template>
  <h1 class="mb-4">Tips</h1>
  <div class="d-flex flex-wrap ga-3">
    <div class="text-h5">Tips and how to use function of this extension</div>
    <v-divider></v-divider>
    <div class="text-body-1">
      <div class="text-h6 font-weight-bold">
        Turn on <b>Allow access to file URLs</b> to use with local file (like PDF, image, etc)
      </div>
      <div class="text-subtitle-1 font-weight-bold">Step 1: Go to Extension details</div>
      - Right-click at Extensions icon (1)<br />
      - Click on "Manage Extension" (2)<br />
      - Click on "Details" (3)<br />
      <v-img :src="AllowAccessToFileURLs1" /><br />
      <div class="text-subtitle-1 font-weight-bold">Step 2: Turn on Allow access to file URLs</div>
      - Find the "Allow access to file URLs" option<br />
      - Toggle the "Allow access to file URLs" option (Image below)<br />
      <v-img :src="AllowAccessToFileURLs2" /><br />
      <div class="text-subtitle-1 font-weight-bold">Step 3: Open the file by browser</div>
      - Open the file with Browser<br />
      - Using the extension like normal
    </div>
    <v-divider></v-divider>
    <div class="text-body-1">
      <div class="text-h6 font-weight-bold">Get the Image from the Clipboard</div>
      <div class="text-subtitle-1 font-weight-bold">Step 1: Copy the image to the clipboard</div>
      - Browser method: Use the copy Image function of right-click menu of the Browser<br />
      - Windows method:<br />
      + Windows + Shift + S<br />
      + Print Screen key<br />
      - Other: Try to use the screenshot function and then go to step 2<br />
      <b>*Note:</b> For Windows, Copy image from local file won't work!
      <div class="text-subtitle-1 font-weight-bold">Step 2: Get the Image from the Clipboard</div>
      - Turn on the extension for current URL<br />
      - Click at the extension Icon at the bottom right of the web page<br />
      - Click at the paste icon<br />
      <v-img :src="Clipboard1" /><br />
      <v-img :src="Clipboard2" /><br />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AllowAccessToFileURLs1 from '@/assets/imgs/tips/allow-access-to-file-urls-1.png';
import AllowAccessToFileURLs2 from '@/assets/imgs/tips/allow-access-to-file-urls-2.png';
import Clipboard1 from '@/assets/imgs/tips/clipboard-1.png';
import Clipboard2 from '@/assets/imgs/tips/clipboard-2.png';
</script>
