<template>
  <div>
    <p v-if="checkedCamera && noCamera">Sorry, you'll need a camera in order to experience this.</p>

    <video id="video" autoplay></video>
  </div>
</template>

<script>
let video;

export default {
  name: 'home',
  data: function() {
    return {
      noCamera: false,
      checkedCamera: false
    };
  },
  methods: {},
  mounted() {
    if (detectGetUserMedia()) {
      loadCamera();
    } else {
      noCamera.call(this);
    }

    this.checkedCamera = true;
  }
}

//////

// detect whether or not we have access to a camera
function detectGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Get access to the camera!
function loadCamera() {
  video = document.getElementById('video');
  
  // Not adding `{ audio: true }` since we only want video now
  navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
}

// update our data to reflect the lack of camera
function noCamera() {
  this.noCamera = true;
}
</script>

<style>
</style>
