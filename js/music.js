// music.js

var globalAudio = new Audio('./img/music.mp3');
globalAudio.loop = true;

// 播放音乐函数
function playMusic() {
  globalAudio.play();
}

// 暂停音乐函数
function pauseMusic() {
  globalAudio.pause();
}

// 设置音量
function setVolume(volume) {
  globalAudio.volume = volume;
}

// 示例：将音量设置为0.5（50%）
setVolume(0.5);
