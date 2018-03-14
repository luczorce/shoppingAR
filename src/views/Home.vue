<template>
  <div>
    <video id="video" playsinline autoplay></video>
  </div>
</template>

<script>
var captstream;
var option = [];
var videoElement;

function gotDevices(deviceInfos) {
  option.length = 0;
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    
    option.push(deviceInfo.deviceId);
  }
}

function gotStream(stream) {
  captstream = stream; // make stream available to console
  videoElement.srcObject = stream;

  // Refresh button list in case labels have become available
  // from start > getUserMedia
  return navigator.mediaDevices.enumerateDevices();
}

function start() {
  if (captstream) {
    captstream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  var videoSource = option[0];
  var constraints = {
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };

  navigator.mediaDevices.getUserMedia(constraints).
      then(gotStream).then(gotDevices).catch(handleError);
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

export default {
  name: 'home',
  mounted() {
    navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
    start();
    videoElement = document.querySelector('video');
  }
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
