<template>
  <div>
    <p v-if="checkedCamera && noCamera">Sorry, you'll need a camera and a <span title="Android Chrome or Apple Safari :(">specific</span> device in order to experience this.</p>
    
    <p v-if="checkedCamera && !noCamera && mediaDevices.length" class="centered">
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
        .then(storeVideoDevices.bind(this));
        // .then(lookForStream.bind(this));

      // TODO this is also in the other example, it's like they call two things and hope one works before the other, or dont care that it does
      window.setTimeout(lookForStream.bind(this), 200);
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

  // TODO this is what happens in the other example, the only difference I can see
  return getVideoDevices();
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
    .then(storeVideoDevices.bind(this))
    .catch(handleError);
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
    border: 1px blue solid;
    margin: 0 auto;
    display: block;
  }
</style>
