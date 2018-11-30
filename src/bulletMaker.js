import SoundMaker from './soundMaker';

export default class BulletMaker {
  constructor(bulletWidth, field, left, top, gunDirection, tankSpeed) {
    this.animTimeStep = 10;
    this.relSpeed = 800;
    this.tankSpeed = tankSpeed;
    this.gunDirection = gunDirection;
    this.size = {
      width: bulletWidth,
      height: 5,
    };

    this.bulletSound = new SoundMaker('./audio/bullet02_shot.wav');
    this.bulletSound.volumeSetter = 0.5;
    this.bulletSound.play();
    this.createBulletDom(left, top);
    this.moveBullet();
  }

  get fullSpeed() {
    return {
      toRight: this.relSpeed * Math.cos(this.gunDirection),
      toBottom: -this.relSpeed * Math.sin(this.gunDirection),
    };
  }

  set leftSetter(value) {
    this.left = value;
    this.placeBulletDom();
  }

  set topSetter(value) {
    this.top = value;
    this.placeBulletDom();
  }

  moveBullet() {
    let start = null;
    const leftStart = this.left;
    const topStart = this.top;
    const step = (timeStamp) => {
      if (!start) {
        start = timeStamp;
      }
      const progress = timeStamp - start;
      this.leftSetter = leftStart + this.fullSpeed.toRight
		* progress / 1000;
      this.topSetter = topStart + this.fullSpeed.toBottom
		* progress / 1000;
      if (this.left < field.clientWidth
			&& this.left > -this.size.width
			&& this.top < field.clientHeight
			&& this.top > -this.size.height) { window.requestAnimationFrame(step); } else {
        field.removeChild(this.bulletDom);
      }
    };
    window.requestAnimationFrame(step);
  }

  placeBulletDom() {
    this.bulletDom.style.left = `${this.left}px`;
    this.bulletDom.style.top = `${this.top}px`;
  }

  createBulletDom(left, top) {
    this.bulletDom = document.createElement('div');
    this.bulletDom.classList.add('bullet');
    this.bulletDom.style.width = `${this.size.width}px`;
    this.bulletDom.style.height = `${this.size.height}px`;
    field.appendChild(this.bulletDom);
    this.leftSetter = left;
    this.topSetter = top;
    this.placeBulletDom();
  }
}
