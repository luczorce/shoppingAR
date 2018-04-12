<template>
  <div>
    <canvas id="canvas"></canvas>
    <video id="video" autoplay playsinline></video>
  </div>
</template>

<script>
  import augment from '../../node_modules/js-aruco/index.js'

  let detector;
  let drawingInterval, markerInterval;
  let canvas, stream, video;
  let mediaDeviceIds = [];
  let mediaDeviceIndex = 0;
  let THAT;

  export default {
    name: 'Camera',
    props: {
      bus: {type: Object, required: true}
    },
    methods: {
      toggleCamera: toggleCamera
    },
    mounted() {
      let noCamera = false;

      if (!detectGetUserMedia()) {
        noCamera = true; 
      }

      this.bus.$emit('checkedCameraResults', noCamera);
      this.bus.$on('toggleCamera', this.toggleCamera);

      if (noCamera) return false;
      THAT = this;
      init();

      // NOTE in webRTC example, this is run first
      navigator.mediaDevices.enumerateDevices()
        .then(storeVideoDevices)
        .catch(handleError);

      // NOTE in webRTC example this immediately follows enumerateDevices
      // there is no chaining, no waiting for the promise to resolve ???
      connectToCamera();
    },
    destroyed() {
      window.removeEventListener('resize', determineCanvasSize, false);
    }
  }

  //////

  function caughtCameraStream(devicestream) {
    stream = devicestream;
    video.srcObject = stream;

    window.setTimeout(determineCanvasSize, 100);
    // TODO create a throttle
    window.addEventListener('resize', determineCanvasSize, false);
    
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
        deviceId: deviceId
      }
    };
  }

  function detectGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.enumerateDevices);
  }

  function detectMarker() {
    const context = canvas.getContext('2d');
    
    window.requestAnimationFrame(detectMarker);
    if (!canvas.height) return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const markers = detector.detect(imageData);

    THAT.bus.$emit('detectedMarkerData', markers);
    // TODO look up this behavior, if two places are looking
    // for the emit event, only one will catch it
    // Camera is $emit, both Home and LocationImages are $on watching... only Home will catch it
    THAT.bus.$emit('detectedLocationData', markers);
  }

  function determineCanvasSize() {
    let size = video.getBoundingClientRect();
    canvas.width = size.width;
    canvas.height = size.height;
  }

  function drawVideoToCanvas() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(drawVideoToCanvas);
  }

  function handleError(error) {
    console.log(error);
  }

  function init() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
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
    width: 100%;
    /* TODO consider this for adding depth to the screen */
    /*box-shadow: 0 0 20px 14px rgba(255, 255, 255, 0.2);*/
  }

  canvas {
    /*display: none;*/
  }
</style>
