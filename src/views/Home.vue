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
      loadCamera.call(this);
    } else {
      noCamera.call(this);
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

// detect whether or not we have access to a camera
function detectGetUserMedia() {

  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.enumerateDevices);
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

function init() {
  video = document.getElementById('video');
  size = determineWindowSize();

  video.width = size.width;
  video.height = size.height;
}

// Get access to the camera!
function loadCamera() {
  navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
    let videoDevices = deviceInfos.filter(dev => dev.kind === 'videoinput');

    this.mediaDevices = videoDevices;
  }).then(lookForStream.bind(this));
}

// get the stream data for the defined device
function lookForStream() {
  let constraints = createConstraints.call(this);

  navigator.mediaDevices.getUserMedia(constraints)
    .then(caughtCameraStream)
    .catch(handleErrorInCamera);
}

// update our data to reflect the lack of camera
function noCamera() {
  this.noCamera = true;
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
    border: 1px tomato solid;
    margin: 0 auto;
    display: block;
  }
</style>
