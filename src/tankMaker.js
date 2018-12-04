/* eslint-disable */
import Bullet from './bulletMaker';
import TankGun from './tankGun';
import Sound from './soundMaker';

const delFromArray = (array, elemToDel) => {
  const ind = array.indexOf(elemToDel);
  if (ind >= 0) { array.splice(ind, 1); }
};

const addUniqToArray = (array, elemToAdd) => {
  const ind = array.indexOf(elemToAdd);
  if (ind >= 0) { return; }
  array.push(elemToAdd);
};

const shiftElemsOfArray = (array, shiftDelta) => {
  return array.map((elem, ind, array) => {
         return array[(ind - shiftDelta + array.length) % array.length]
  })
}

const createObjectFromArrays = (arrayKeys, arrayValues) => {
  return Object.assign(...arrayKeys.map((elem, i, arr) => {
       let obj = {};
       obj[elem] = arrayValues[i];
       return obj;
  }))
}

const isFightKeyCode = keyCode => keyCode === 'KeyW';
const isTurretKeyCode = keyCode => keyCode === 'KeyA' || keyCode === 'KeyD';
const getCoords = (domElem) => {
  const rect = domElem.getBoundingClientRect();
  return {
    left: rect.x,
    top: rect.y,
  };
};
export default class Tank {
  constructor(world, field, leftInWorld, topInWorld) {
    this.animTimeStep = 10;
    this.fireRate = 5;
    this.speed = {
      linear: 100,
      radial: 1,
    };
    this.world = world;
    this.field = field;
    this.bulletWidth = 5;
    this.gunRotateStep = 0.005;
    this.size = {
      width: 70,
      height: 100,
    };
    this.minDistToEdge = {
      horizontal: 100,
      vertical: 100
    }
    
    //state
    this.left = leftInWorld;
    this.top = topInWorld;
    this.keyCodes = {
      move: [],
      turn: [],
      fight: [],
      turret: []
    };
    this.direction = Math.PI / 2;
    
    //initial methods
    this.createDom();
	  this.addManipulation();
    this.world.addChildSetter = this;
    this.tankGun = new TankGun(this, Math.PI / 2);
  }

  set moveSoundSetter(value) {
    if (value === 'stop') this.sound.move.stop();
    if (value === 'play') this.sound.move.play();
  }

  set turretSoundSetter(value) {
    if (value === 'stop') this.sound.turretTurn.stop();
    if (value === 'play') this.sound.turretTurn.play();
  }

  set directionSetter(value) {
    this.direction = value % (2 * Math.PI);
    this.placeDom();
  }

  get arrowHandlers() {
      let object =  {
      ArrowUp: () => {
        this.topSetter = this.top + this.currentSpeed.toBottom 
           * this.animTimeStep / 1000;
        this.leftSetter = this.left + this.currentSpeed.toRight 
          * this.animTimeStep / 1000;
       },
      ArrowLeft: () => {
        this.directionSetter = this.direction + this.animTimeStep
              * this.currentSpeed.radial / 1000;
        this.world.rotateSetter = {
          left: this.left,
          top: this.top,
          angle: - this.animTimeStep
          * this.currentSpeed.radial / 1000
        }
       },   

      ArrowDown: () => {
        this.topSetter = this.top + this.currentSpeed.toBottom 
          * this.animTimeStep / 1000;
        this.leftSetter = this.left + this.currentSpeed.toRight 
          * this.animTimeStep / 1000;
      },     
      ArrowRight: () => {
        this.directionSetter = this.direction - this.animTimeStep
              * this.currentSpeed.radial / 1000;
          this.world.rotateSetter = {
          left: this.left,
          top: this.top,
          angle: this.animTimeStep
          * this.currentSpeed.radial / 1000
        }
       }
    
    }
    //let deltaShift = - Math.floor((this.direction - Math.PI / 4) / (Math.PI / 2));
   // let newObject = createObjectFromArrays(arr, Object.values(object));
   // console.log(newObject);
    return object;
  }

  get endOfBarrel() {
    const radius = this.tankGun.turret.size.height / 2
    + this.tankGun.barrel.size.height;
    const angle = this.tankGun.direction + this.direction - Math.PI / 2;
    const left = this.left + (radius) * Math.cos(angle)
     - this.tankGun.barrel.size.width / 2;
    const top = this.top - (radius) * Math.sin(angle) 
     - this.tankGun.barrel.size.width / 2;
    return {
      left,
      top,
    };
  }

  get currentSpeed() {
    const up = this.keyCodes.move.indexOf("ArrowUp") >= 0;
    const down = this.keyCodes.move.indexOf("ArrowDown") >= 0;
    const linear = up - down;
    return {
        	toRight: linear * this.speed.linear * Math.cos(this.direction),
        	toBottom: -linear * this.speed.linear * Math.sin(this.direction),
      radial: this.speed.radial * linear,
    };
  }

  /*get fieldBounds() {
    return {
      left: getCoords(this.field).left,
      right: getCoords(this.field).left + this.field.offsetWidth,
      top: getCoords(this.field).top,
      bottom: getCoords(this.field).top + this.field.offsetHeight,
    };
  }*/

  set leftSetter(value) {
    this.left = Math.max(this.size.height / 2, Math.min(this.world.size.width - 
      this.size.height / 2, value));
    this.moveWorld();
    this.placeDom();
  }

  set topSetter(value) {
    this.top = Math.max(this.size.height / 2, Math.min(this.world.size.height -
      this.size.height / 2, value));
    this.moveWorld();
    this.placeDom();
    
  }
  
  get topInField () {
    return (this.left + this.world.left) * Math.sin(- this.world.direction) +
      (this.top + this.world.top) * Math.cos(- this.world.direction);
  }

  get leftInField () {
     return (this.left + this.world.left) * Math.cos(- this.world.direction) -
      (this.top + this.world.top) * Math.sin(- this.world.direction);
  }

  get distToEdge () {
    return {
      left: this.leftInField,
      top: this.topInField,
      right: this.field.size.width - this.leftInField,
      bottom: this.field.size.height - this.topInField
    }
  }
  isMoveKeyCode(keyCode) {
    return keyCode === Object.keys(this.arrowHandlers)[0] ||
     keyCode === Object.keys(this.arrowHandlers)[2];
  }  
  isTurnKeyCode(keyCode) {
    return keyCode === Object.keys(this.arrowHandlers)[1] ||
     keyCode === Object.keys(this.arrowHandlers)[3];
   }
   moveWorld() {
      if(this.distToEdge.left <= this.minDistToEdge.horizontal && 
        this.currentSpeed.toRight < 0)
      this.world.leftSetter = this.world.left - 
        this.currentSpeed.toRight * this.animTimeStep / 1000;
      if(this.distToEdge.right <= this.minDistToEdge.horizontal && 
        this.currentSpeed.toRight > 0)
      this.world.leftSetter = this.world.left - 
        this.currentSpeed.toRight * this.animTimeStep / 1000;
      if(this.distToEdge.top <= this.minDistToEdge.vertical && 
        this.currentSpeed.toBottom < 0)
      this.world.topSetter = this.world.top - 
        this.currentSpeed.toBottom * this.animTimeStep / 1000;
      if(this.distToEdge.bottom <= this.minDistToEdge.vertical && 
        this.currentSpeed.toBottom > 0)
       this.world.topSetter = this.world.top - 
        this.currentSpeed.toBottom * this.animTimeStep / 1000;
  }

  placeDom() {
    this.dom.style.left = `${this.left - this.size.width / 2}px`;
    this.dom.style.top = `${this.top - this.size.height / 2}px`;
    this.dom.style.transform = `rotate(${90 - this.direction * 180 / Math.PI
    }deg)`;
  }

  createDom(left, top) {
    this.dom = document.createElement('div');
    this.dom.classList.add('tank');
    this.dom.style.width = `${this.size.width}px`;
    this.dom.style.height = `${this.size.height}px`;
    this.world.dom.appendChild(this.dom);
    this.placeDom();
    this.sound = {
      move: new Sound('./audio/tankMove.mp3', true),
      turretTurn: new Sound('./audio/turretMove.mp3', true)
    }
  }

  move() {
    this.sound.move.play();
    const timerId = setInterval(() => {
      if (this.keyCodes.move.length === 0) {
        clearInterval(timerId);
        this.sound.move.stop();
        return;
      }
      this.keyCodes.move.forEach((keyCode) => {
           	this.handleKey(keyCode);
      });
       }, this.animTimeStep);
  }

fight() {
    let countTime = 0;
    let countBullet = 0;
    const timerId = setInterval(() => {
      if (this.keyCodes.fight.length === 0) {
        clearInterval(timerId);
        return;
      }
      this.keyCodes.fight.forEach((keyCode) => {
              if(Math.floor(countTime / 1000 * this.fireRate === countBullet))
              {
              this.handleKey(keyCode);
              countBullet ++;
              }
      });
      countTime += this.animTimeStep;
    }, this.animTimeStep);
  }

  turn() {
     const timerId = setInterval(() => {
      if (this.keyCodes.turn.length === 0) {
        clearInterval(timerId);
        return;
      }
      this.keyCodes.turn.forEach((keyCode) => {
            this.handleKey(keyCode);
      });
    }, this.animTimeStep);
  }
  turretTurn() {
      this.sound.turretTurn.play();
      const timerId = setInterval(() => {
      if (this.keyCodes.turret.length === 0) {
        clearInterval(timerId);
        this.sound.turretTurn.stop();
        return;
      }
      this.keyCodes.turret.forEach((keyCode) => {
            this.handleKey(keyCode);
      });
    }, this.animTimeStep);
  }

  handleKey(keyCode) {
    switch (keyCode) {
      case 'KeyW':
        const bullet = new Bullet(this.bulletWidth, this.world, this.field, 
          this.endOfBarrel.left,
          this.endOfBarrel.top,
           this.tankGun.direction 
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
        this.arrowHandlers.ArrowLeft.call(this);
        break;
      case 'ArrowRight':
        this.arrowHandlers.ArrowRight.call(this);
        break;
      case 'ArrowUp':
        this.arrowHandlers.ArrowUp.call(this);
        break;
      case 'ArrowDown':
        this.arrowHandlers.ArrowDown.call(this);
        break;
        default: ;
    }
  }

  addManipulation() {
    	window.onkeyup = (e) => {
      if (this.isMoveKeyCode(e.code))
          delFromArray(this.keyCodes.move, e.code);
      if (this.isTurnKeyCode(e.code))
          delFromArray(this.keyCodes.turn, e.code);
      if (isTurretKeyCode(e.code))
          delFromArray(this.keyCodes.turret, e.code);
      if (isFightKeyCode(e.code))
          delFromArray(this.keyCodes.fight, e.code); 
    	};
    window.onkeydown = (e) => {
      if (this.isMoveKeyCode(e.code)) {
        if(this.keyCodes.move.length === 0)
        {
          addUniqToArray(this.keyCodes.move, e.code);
          this.move();
        }
        else
        addUniqToArray(this.keyCodes.move, e.code);
	    }
      if (this.isTurnKeyCode(e.code)) {
        if(this.keyCodes.turn.length === 0)
        {
          addUniqToArray(this.keyCodes.turn, e.code);
          this.turn();
        }
        addUniqToArray(this.keyCodes.turn, e.code);
      }
       if (isTurretKeyCode(e.code)) {
        if(this.keyCodes.turret.length === 0)
        {
        addUniqToArray(this.keyCodes.turret, e.code);
        this.turretTurn();
        }
        else
        addUniqToArray(this.keyCodes.turret, e.code);
      }
      if (isFightKeyCode(e.code)) {

       if(this.keyCodes.fight.length === 0)
        {
           addUniqToArray(this.keyCodes.fight, e.code);
           this.fight();
        }
        addUniqToArray(this.keyCodes.fight, e.code);      
      }
  }
}
}
