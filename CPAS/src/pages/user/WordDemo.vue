<template>
  <div>
    <p>Enter/paste your document here:</p>
    <textarea id="content" cols="60" rows="10">
    <p>We all live in a yellow submarine, yellow submarine, yellow submarine, yellow submarine</p>
    <p>Images can also be exported if you source them as base64 DATA URI.</p>
    <img src="../../assets/img-logo-fe.jpg">
  </textarea
    >
    <b-btn id="convert" @click="exportWord()">Convert</b-btn>
    <div id="download-area"></div>
  </div>
</template>

<script>
import * as htmlDocx from 'html-docx-js';
import { saveAs } from 'file-saver';
export default {
  methods: {
    exportWord() {
      let convert = document.getElementById('content');
      let content = '<!DOCTYPE html><html><body>' + convert + '</body></html>';
      console.log(convert);
      let converted = htmlDocx.asBlob(content, 'portrait');
      saveAs(converted, 'test.docx');
    },
    convertImagesToBase64() {
      //   contentDocument = tinymce.get('content').getDoc();
      //   var regularImages = contentDocument.querySelectorAll('img');
      //   var canvas = document.createElement('canvas');
      //   var ctx = canvas.getContext('2d');
      //   [].forEach.call(regularImages, function(imgElement) {
      //     // preparing canvas for drawing
      //     ctx.clearRect(0, 0, canvas.width, canvas.height);
      //     canvas.width = imgElement.width;
      //     canvas.height = imgElement.height;
      //     ctx.drawImage(imgElement, 0, 0);
      //     // by default toDataURL() produces png image, but you can also export to jpeg
      //     // checkout function's documentation for more details
      //     var dataURL = canvas.toDataURL();
      //     imgElement.setAttribute('src', dataURL);
      //   });
      //   canvas.remove();
    }
  }
};
</script>

<style></style>
