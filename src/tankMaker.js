/* eslint disable */
import BulletMaker from './bulletMaker';
import TankGun from './tankGun';
import SoundMaker from './soundMaker';

const delFromArray = (array, elemToDel) => {
  const ind = array.indexOf(elemToDel);
  if (ind >= 0) { array.splice(ind, 1); }
};

const addUniqToArray = (array, elemToAdd) => {
  const ind = array.indexOf(elemToAdd);
  if (ind >= 0) { return; }
  array.push(elemToAdd);
};

const isFightKeyCode = keyCode => (keyCode === 'KeyA' || keyCode === 'KeyW' || keyCode === 'KeyD');
const isMoveKeyCode = keyCode => (keyCode === 'ArrowLeft' || keyCode === 'ArrowRight'
    || keyCode === 'ArrowUp' || keyCode === 'ArrowDown');

const getCoords = (domElem) => {
  const rect = domElem.getBoundingClientRect();
  return {
    left: rect.x,
    top: rect.y,
  };
};

export default class TankMaker {
  constructor(field, left, top) {
    this.animTimeStep = 10;
    this.fireRate = 10;
    this.speed = {
      linear: 120,
      radial: 1,
    };
    this.field = field;
    this.bulletWidth = 5;
    this.gunRotateStep = 0.05;
    this.size = {
      width: 70,
      height: 100,
    };

    this.left = left;
    this.top = top;
    this.keyCodes = {
      move: [],
      fight: [],
    };
    this.direction = Math.PI / 2;
    this.moveSound = new SoundMaker('./audio/tankMove.mp3', true);
    this.turretSound = new SoundMaker('./audio/turretMove.mp3', true);
    this.turretSound.volumeSetter = 1;
    this.createTankDom();
	  this.addManipulation();
    this.tankGun = new TankGun(this, Math.PI / 2);
  }

  set moveSoundSetter(value) {
    if (value === 'stop') this.moveSound.stop();
    if (value === 'play') this.moveSound.play();
  }

  set turretSoundSetter(value) {
    if (value === 'stop') this.turretSound.stop();
    if (value === 'play') this.turretSound.play();
  }

  set directionSetter(value) {
    this.direction = value;
    this.placeTankDom();
  }

  get endOfBarrel() {
    const radius = this.tankGun.turret.size.height / 2
    + this.tankGun.barrel.size.height;
    const angle = this.tankGun.direction + this.direction - Math.PI / 2;
    const left = this.left + (radius) * Math.cos(angle)
     - this.tankGun.barrel.size.width / 2;
    const top = this.top - (radius)
     * Math.sin(angle) - this.tankGun.barrel.size.width / 2;
    return {
      left,
      top,
    };
  }

  get currentSpeed() {
    const up = this.keyCodes.move.indexOf('ArrowUp') >= 0;
    const down = this.keyCodes.move.indexOf('ArrowDown') >= 0;
    const linear = up - down;
    return {
        	toRight: linear * this.speed.linear * Math.cos(this.direction),
        	toBottom: -linear * this.speed.linear * Math.sin(this.direction),
      radial: linear * this.speed.radial,
    };
  }

  get fieldBounds() {
    return {
      left: getCoords(this.field).left,
      right: getCoords(this.field).left + this.field.offsetWidth,
      top: getCoords(this.field).top,
      bottom: getCoords(this.field).top + this.field.offsetHeight,
    };
  }

  set leftSetter(value) {
    this.left = value;
    this.placeTankDom();
  }

  set topSetter(value) {
    this.top = value;
    this.placeTankDom();
  }

  placeTankDom() {
    this.tankDom.style.left = `${this.left - this.size.width / 2}px`;
    this.tankDom.style.top = `${this.top - this.size.height / 2}px`;
    this.tankDom.style.transform = `rotate(${90 - this.direction * 180 / Math.PI
    }deg)`;
  }

  createTankDom(left, top) {
    this.tankDom = document.createElement('div');
    this.tankDom.classList.add('tank');
    this.tankDom.style.width = `${this.size.width}px`;
    this.tankDom.style.height = `${this.size.height}px`;
    field.appendChild(this.tankDom);
    this.placeTankDom();
  }

  moveTank() {
    const timerId = setInterval(() => {
      if (this.keyCodes.move.length === 0) {
        clearInterval(timerId);
        return;
      }
      this.keyCodes.move.forEach((keyCode) => {
           	this.handleKey(keyCode);
      });
    }, this.animTimeStep);
  }

  handleKey(keyCode) {
    switch (keyCode) {
      case 'KeyW':
        const bullet = new BulletMaker(this.bulletWidth, this.field, this.endOfBarrel.left,
          this.endOfBarrel.top, this.tankGun.direction
           + this.direction - Math.PI / 2, this.currentSpeed);
        break;
      case 'KeyA':
        this.tankGun.directionSetter = this.tankGun.direction
          + this.gunRotateStep;
        break;
      case 'KeyD':
        this.tankGun.directionSetter = this.tankGun.direction
          - this.gunRotateStep;
        break;
      case 'ArrowLeft':
        this.directionSetter = Math.max(0, Math.min(this.direction + this.animTimeStep
              * this.currentSpeed.radial / 1000, Math.PI));
        break;
      case 'ArrowRight':
        this.directionSetter = Math.max(0, Math.min(this.direction - this.animTimeStep
              * this.currentSpeed.radial / 1000, Math.PI));
        break;
      case 'ArrowUp':
        this.topSetter = Math.max(0,
          this.top + this.currentSpeed.toBottom * this.animTimeStep / 1000);
        this.leftSetter = Math.max(0,
          this.left + this.currentSpeed.toRight * this.animTimeStep / 1000);
        break;
      case 'ArrowDown':
        this.topSetter = this.top + this.currentSpeed.toBottom
            * this.animTimeStep / 1000;
        this.leftSetter = this.left + this.currentSpeed.toRight
            * this.animTimeStep / 1000;
        break;
        default: ;
    }
  }

  makeFight() {
    const timerId = setInterval(() => {
      if (this.keyCodes.fight.length === 0) {
        clearInterval(timerId);
        return;
      }

      this.keyCodes.fight.forEach((keyCode) => {
            	this.handleKey(keyCode);
      });
    }, 1000 / this.fireRate);
  }

  addManipulation() {
    	window.onkeyup = (e) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') 
        this.moveSoundSetter = 'stop';
      if (e.code === 'KeyA' || e.code === 'KeyD') 
        this.turretSoundSetter = 'stop';
    		delFromArray(this.keyCodes.move, e.code);
    		delFromArray(this.keyCodes.fight, e.code);
    	};
    window.onkeydown = (e) => {
      if (isMoveKeyCode(e.code)) {
          console.log(e.code)
        	if (e.code === 'ArrowUp' || e.code === 'ArrowDown') 
            this.moveSoundSetter = 'play';
           	if (this.keyCodes.move.length === 0) {
	        		this.moveTank();
	        	}
	        	addUniqToArray(this.keyCodes.move, e.code);
	        }
           if (e.code === 'KeyA' || e.code === 'KeyD') 
            this.turretSoundSetter = 'play';
	        if (isFightKeyCode(e.code)) {
	        	if (this.keyCodes.fight.length === 0) {
	        		this.makeFight();
	        	}
	        	addUniqToArray(this.keyCodes.fight, e.code);
      }
    };
  }
}
