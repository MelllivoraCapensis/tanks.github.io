export default class Sound {
  constructor(src, repeat) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    this.volume = {
      min: 0.05,
      max: 0.2,
    };
    this.sound.volume = this.volume.min;
    this.sound.loop = repeat;
    document.body.appendChild(this.sound);
  }

  set volumeSetter(value) {
    this.sound.volume = value;
  }
  deleteFromDom() {
    document.body.removeChild(this.sound);
  }
  play() {
    this.sound.play();
  }
  stop() {
    this.sound.pause();
    this.sound.currentTime = 0;
  }
}
