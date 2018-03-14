<template>
  <div>
    <p v-if="checkedCamera && noCamera">Sorry, you'll need a camera and a <span title="Android Chrome or Apple Safari :(">specific</span> device in order to experience this.</p>
    
    <p v-if="checkedCamera && !noCamera && mediaDevices.length > 1" class="centered">
      <button type="button" v-on:click="toggleCamera()">toggle camera feed</button>
    </p>
    <video id="video" autoplay playsinline></video>
  </div>
</template>

<script>
let video, size, stream;

export default {
  name: 'home',
  data: function() {
    return {
      noCamera: false,
      checkedCamera: false,
      mediaDevices: [],
      mediaDeviceIndex: 0
    };
  },
  methods: {
    toggleCamera: toggleCamera
  },
  mounted() {
    if (detectGetUserMedia()) {
      init();

      getVideoDevices()
        .then(storeVideoDevices.bind(this))
        .then(lookForStream.bind(this));
    } else {
      this.noCamera = true;
    }

    this.checkedCamera = true;
  }
}

//////

function caughtCameraStream(devicestream) {
  stream = devicestream;
  video.srcObject = stream;
}

function createConstraints() {
  return {
    video: {
      width: {max: size.width},
      height: {max: size.height},
      deviceId: this.mediaDevices[this.mediaDeviceIndex].deviceId
    }
  };
}

function detectGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.enumerateDevices);
}

function determineWindowSize() {
  const offset = 50;
  const square = window.innerWidth - offset;
  
  return {
    width: square,
    height: square
  }
}

function handleErrorInCamera(error) {
  console.log(error);
}

function init() {
  video = document.getElementById('video');
  size = determineWindowSize();

  video.width = size.width;
  video.height = size.height;
}

function getVideoDevices() {
  return navigator.mediaDevices.enumerateDevices();
}

function storeVideoDevices(devices) {
  let videoDevices = devices.filter(dev => dev.kind === 'videoinput');
  this.mediaDevices = videoDevices;
}

// get the stream data for the defined device
function lookForStream() {
  let constraints = createConstraints.call(this);

  navigator.mediaDevices.getUserMedia(constraints)
    .then(caughtCameraStream)
    .catch(handleErrorInCamera);
}

// move through the mediaDevices, updating the source of the video stream
function toggleCamera() {
  this.mediaDeviceIndex++;

  if (this.mediaDeviceIndex === this.mediaDevices.length) {
    this.mediaDeviceIndex = 0;
  }

  stopStream();
  lookForStream.call(this);
}

function stopStream() {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}
</script>

<style>
  .centered {
    text-align: center;
  }

  video {
    border: 1px lime solid;
    margin: 0 auto;
    display: block;
  }
</style>
