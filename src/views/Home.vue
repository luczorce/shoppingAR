<template>
  <div>
    <p v-if="checkedCamera && noCamera">Sorry, you'll need a camera and a <span title="Android Chrome or Apple Safari :(">specific</span> device in order to experience this.</p>
    
    <p v-if="checkedCamera && !noCamera" class="centered">
      <button type="button" v-on:click="toggleCamera()">toggle camera feed</button>
    </p>
    <canvas id="canvas"></canvas>
    <video id="video" autoplay playsinline></video>
  </div>
</template>

<script>
import augment from '../../node_modules/js-aruco/index.js'

let detector, markerInterval;
let drawingInterval;
let canvas, size, stream, video;
let mediaDeviceIds = [];
let mediaDeviceIndex = 0;

export default {
  name: 'home',
  data: function() {
    return {
      noCamera: false,
      checkedCamera: false
    };
  },
  methods: {
    toggleCamera: toggleCamera
  },
  mounted() {
    init();

    if (detectGetUserMedia()) {
      initAR();

      // NOTE in webRTC example, this is run first
      navigator.mediaDevices.enumerateDevices()
        .then(storeVideoDevices)
        .catch(handleError);

      // NOTE in webRTC example this immediately follows enumerateDevices
      // there is no chaining, no waiting for the promise to resolve ???
      connectToCamera();
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

  drawingInterval = requestAnimationFrame(drawVideoToCanvas);
  markerInterval = requestAnimationFrame(detectMarker);

  // NOTE in webRTC example, they search for the devices again
  return navigator.mediaDevices.enumerateDevices();
}

function connectToCamera() {
  let constraints = createConstraints();
  
  // stop any running stream
  stopStream();

  navigator.mediaDevices.getUserMedia(constraints)
    .then(caughtCameraStream)
    .then(storeVideoDevices)
    .catch(handleError);
}

function createConstraints() {
  const deviceId = (mediaDeviceIds.length) ? {exact: mediaDeviceIds[mediaDeviceIndex]} : undefined;

  return {
    video: {
      // TODO bring this back when we get safari working
      // width: {max: size.width},
      // height: {max: size.height},
      deviceId: deviceId
    }
  };
}

function detectGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.enumerateDevices);
}

function detectMarker() {
  const context = canvas.getContext('2d');
  // TODO why this wouldn't work in init, is beyond me right now
  context.strokeStyle = 'red';
  context.lineWidth = 5;

  if (canvas.height) {
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const markers = detector.detect(imageData);

    markers.forEach((marker) => {
      let corners = marker.corners;

      context.beginPath();
      context.moveTo(corners[0].x, corners[0].y);
      context.lineTo(corners[1].x, corners[1].y);
      context.lineTo(corners[2].x, corners[2].y);
      context.lineTo(corners[3].x, corners[3].y);
      context.lineTo(corners[0].x, corners[0].y);
      context.stroke();
    });
  }

  window.requestAnimationFrame(detectMarker);
}

function determineWindowSize() {
  const offset = 50;
  const square = window.innerWidth - offset;
  
  return {
    width: square,
    height: square
  }
}

function determineCanvasSize() {
  canvas.width = size.width;
  canvas.height = (size.width / video.videoWidth) * video.videoHeight;
}

function drawVideoToCanvas() {
  // TODO why cant we do this once?
  determineCanvasSize();
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  window.requestAnimationFrame(drawVideoToCanvas);
}

function handleError(error) {
  console.log(error);
}

function init() {
  video = document.getElementById('video');
  canvas = document.getElementById('canvas');
  size = determineWindowSize();
}

function initAR() {
  detector = new augment.AR.Detector();
}

function storeVideoDevices(devices) {
  let videoDevices = devices.filter(dev => dev.kind === 'videoinput');
  mediaDeviceIds = videoDevices.map(dev => dev.deviceId);
}

function stopStream() {
  if (!stream) return;

  stream.getTracks().forEach(track => {
    track.stop();
  });
}

// move through the mediaDevices, updating the source of the video stream
function toggleCamera() {
  if (markerInterval) window.cancelAnimationFrame(markerInterval);
  if (drawingInterval) window.cancelAnimationFrame(drawingInterval);

  mediaDeviceIndex++;

  if (mediaDeviceIndex === mediaDeviceIds.length) {
    mediaDeviceIndex = 0;
  }

  connectToCamera();
}

</script>

<style>
  .centered {
    text-align: center;
  }

  video {
    display: none;
  }

  canvas {
    display: block;
    margin: 0 auto;
  }
</style>
