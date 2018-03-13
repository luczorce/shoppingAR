<template>
  <video id="video" width="640" height="480" autoplay></video>
</template>

<script>
let video;

export default {
  name: 'home',
  mounted() {
    loadCamera();
  },
  methods: {}
}

//////

// Get access to the camera!
function loadCamera() {
  video = document.getElementById('video');
  console.log(video);

  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now

      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
      });
  }
}
</script>

<style>
  canvas {
    border: 1px tomato solid;
  }
</style>