function playM3u8(url) {
    const video = document.getElementById('video');
    video.volume = 0.3;
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
}

function playPause() {
    const video = document.getElementById('video');
    video.paused ? video.play() : video.pause();
}

function volumeUp() {
    const video = document.getElementById('video');
    if (video.volume <= 0.9) video.volume += 0.1;
}

function volumeDown() {
    const video = document.getElementById('video');
    if (video.volume >= 0.1) video.volume -= 0.1;
}

function mute() {
    const video = document.getElementById('video');
    video.muted = !video.muted;
}

function vidFullscreen() {
    const video = document.getElementById('video');
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

const urlParams = new URLSearchParams(window.location.search);
const streamId = urlParams.get('stream_id');
if (streamId) {
    const streamUrl = `http://tv.dominiotv.xyz:2095/live/IPTVTOC20/Venus020/${streamId}.m3u8`;
    playM3u8(streamUrl);
} else {
    console.error('No se proporcionó un stream_id en la URL');
}

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('keydown', function(event) {
        console.log(event.keyCode);
        console.log(event.key);
        if (event.keyCode === 32) { playPause(); }
        if (event.keyCode === 38 || event.keyCode == "ArrowUp") { volumeUp(); }
        if (event.keyCode === 40 || event.keyCode == "ArrowDown") { volumeDown(); }
        if (event.keyCode === 77 || event.keyCode == "m" || event.keyCode == "M") { mute(); }
        if (event.keyCode === 70 || event.keyCode == "f" || event.keyCode == "F") { vidFullscreen(); }
    });
});