<template>
  <div>
    <p v-if="checkedCamera && noCamera">Sorry, you'll need a camera in order to experience this.</p>

    <video id="video" autoplay></video>
    <p v-if="checkedCamera && !noCamera" class="centered">
      <button type="button" v-on:click="playVideo">capture video</button>
    </p>
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
  methods: {
    playVideo: playVideo
  },
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

function caughtCameraStream(stream) {
  // video.src = window.URL.createObjectURL(stream);
  video.srcObject = stream;
}

// detect whether or not we have access to a camera
function detectGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function determineWindowSize() {
  const offset = 50;
  
  // return { 
  //   width: window.innerWidth - offset,
  //   height: window.innerHeight - offset
  // };

  const square = window.innerWidth - offset;
  return {
    width: square,
    height: square
  }
}

function handleErrorInCamera(error) {
  console.log(error);
}

// Get access to the camera!
function loadCamera() {
  let constraints, size;

  video = document.getElementById('video');
  size = determineWindowSize();
  constraints = {
    video: {
      width: {max: size.width},
      height: {max: size.height},
    }
  }

  video.width = size.width;
  video.height = size.height;
  
  // Not adding `{ audio: true }` since we only want video now
  navigator.mediaDevices.getUserMedia(constraints)
    .then(caughtCameraStream)
    .catch(handleErrorInCamera);
}

// update our data to reflect the lack of camera
function noCamera() {
  this.noCamera = true;
}

function playVideo() {
  video.play();
}
</script>

<style>
  .centered {
    text-align: center;
  }
</style>
