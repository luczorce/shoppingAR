<template>
  <div>
    <p v-if="checkedCamera && noCamera">Sorry, you'll need a camera and a <span title="Android Chrome or Apple Safari :(">specific</span> device in order to experience this.</p>
    
    <p v-if="checkedCamera && !noCamera && mediaDevices.length" class="centered">
      <button type="button" v-on:click="toggleCamera()">toggle camera feed</button>
    </p>
    <video id="video" autoplay playsinline></video>

    <pre>{{ mediaDevices }}</pre>
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

      // NOTE in webRTC example, this is run first
      navigator.mediaDevices.enumerateDevices()
        .then(storeVideoDevices.bind(this))
        .catch(handleError);

      // NOTE in webRTC example this immediately follows enumerateDevices
      // there is no chaining, no waiting for the promise to resolve ???
      connectToCamera.call(this);
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

  // NOTE in webRTC example, they search for the devices again
  return navigator.mediaDevices.enumerateDevices();
}

function connectToCamera() {
  let constraints = createConstraints.call(this);
  
  // stop any running stream
  stopStream();

  navigator.mediaDevices.getUserMedia(constraints)
    .then(caughtCameraStream)
    .then(storeVideoDevices.bind(this))
    .catch(handleError);
}

function createConstraints() {
  const deviceId = (this.mediaDevices.length) ? this.mediaDevices[this.mediaDeviceIndex].deviceId : undefined;

  return {
    video: {
      width: {max: size.width},
      height: {max: size.height},
      deviceId: deviceId
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

function handleError(error) {
  console.log(error);
}

function init() {
  video = document.getElementById('video');
  size = determineWindowSize();

  video.width = size.width;
  video.height = size.height;
}

function storeVideoDevices(devices) {
  let videoDevices = devices.filter(dev => dev.kind === 'videoinput');
  this.mediaDevices = videoDevices;
}

function stopStream() {
  if (!stream) return;

  stream.getTracks().forEach(track => {
    track.stop();
  });
}

// move through the mediaDevices, updating the source of the video stream
function toggleCamera() {
  this.mediaDeviceIndex++;

  if (this.mediaDeviceIndex === this.mediaDevices.length) {
    this.mediaDeviceIndex = 0;
  }

  connectToCamera.call(this);
}

</script>

<style>
  .centered {
    text-align: center;
  }

  video {
    border: 1px red solid;
    margin: 0 auto;
    display: block;
  }
</style>
