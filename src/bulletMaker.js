import Sound from './soundMaker';

export default class Bullet {
  constructor(bulletWidth, world, field, left, top, absDirection, tankSpeed) {
    // params
    this.relSpeed = 800;
    this.tankSpeed = tankSpeed;
    this.direction = absDirection;
    this.size = {
      width: bulletWidth,
      height: 5,
    };
    this.field = field;
    this.world = world;

    // state, initial value
    this.left = left;
    this.top = top;
    
    // initial methods
    this.sound = new Sound('./audio/bullet02_shot.wav');
    this.sound.volumeSetter = 0.5;
    this.sound.play();

    this.createDom();
    this.world.addChildSetter = this;
    this.move();
  }

  get cell() {
   let i = Math.max(0, Math.min(this.world.sizeInCells.width - 1,
      Math.floor(this.left / this.world.cellSize.width)));
    let j = Math.max(0, Math.min(this.world.sizeInCells.height - 1,
      Math.floor(this.top / this.world.cellSize.height)));
    return this.world.cells[i][j];
  }

  get fullSpeed () {
    return {
      toRight: this.relSpeed * Math.cos(this.direction),
      toBottom: -this.relSpeed * Math.sin(this.direction),
    };
  }
  
  get topInField () {
    return (this.top - this.field.topInWorld) * Math.cos(this.field.directionInWorld) +
      (this.left - this.field.leftInWorld) * Math.sin(this.field.directionInWorld);
  }

  get leftInField () {
     return (this.left - this.field.leftInWorld) * Math.cos(this.field.directionInWorld) -
      (this.top - this.field.topInWorld) * Math.sin(this.field.directionInWorld);
  }

  set leftSetter(value) {
    this.left = Math.max(0, Math.min(this.world.size.width, value));
    this.placeInDom();
  }

  set topSetter(value) {
    this.top = Math.max(0, Math.min(this.world.size.height, value));
    this.placeInDom();
  }

  move() {
    let start = null;
    const leftStart = this.left;
    const topStart = this.top;
    const step = (timeStamp) => {
      if (!this.isEndOfPath()) {
        window.requestAnimationFrame(step);
      } else {
        this.deleteFromDom();
      }
      if (!start) {
        start = timeStamp;
      }
      const progress = timeStamp - start;
      this.leftSetter = leftStart + this.fullSpeed.toRight * progress / 1000;
      this.topSetter = topStart + this.fullSpeed.toBottom * progress / 1000;
   };
    window.requestAnimationFrame(step);
  }

  isEndOfPath() {
    console.log(this.cell)
   return this.leftInField >= this.field.size.width
      || this.leftInField <= 0
      || this.topInField >= this.field.size.height
      || this.topInField <= 0
      || this.cell.object !== null
      || this.left <= 0
      || this.top <= 0
      || this.left >= this.world.size.width
      || this.top >= this.world.size.height;
  }

  deleteFromDom() {
    if(this.cell !== undefined)
    if(this.cell.object !== null)
    {
      this.cell.object.resourceSetter = this.cell.object.resource -1;
    }
    this.world.dom.removeChild(this.dom);
    setTimeout(() => {
    this.sound.deleteFromDom();
  }, 1000)
  }

  placeInDom() {
    this.dom.style.left = `${this.left}px`;
    this.dom.style.top = `${this.top}px`;
  }

  createDom() {
    this.dom = document.createElement('div');
    this.dom.classList.add('bullet');
    this.dom.style.width = `${this.size.width}px`;
    this.dom.style.height = `${this.size.height}px`;
    this.world.dom.appendChild(this.dom);
    this.placeInDom();
  }
}
