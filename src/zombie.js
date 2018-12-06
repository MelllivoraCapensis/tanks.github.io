/*eslint-disable*/
import Sound from './soundMaker';
export default class Zombie {
	constructor(world, field, width, height, leftInWorld, topInWorld, target) {
     //params
      this.size = {
      	width: width, 
      	height: height
      }
      this.field = field;
      this.world = world;
      this.moveDuration = 5;
      this.maxSpeed = 50;
      this.target = target;
      this.minDistToObject = 5;
      this.killingPower = 5;

      //state
      this.left = leftInWorld;
      this.top = topInWorld;
      this.resource = 1;

      //initial methods
      this.createDom();
      this.markCells();
      this.startMoving();
      this.sound = new Sound ('./audio/zombie.mp3', true);
      this.sound.volumeSetter = 0.01;
      document.domContentLoad = () => {
        this.sound.play();
      }
	} 
  set leftSetter (value) {
      this.deMarkCells();
      this.left = Math.max(this.size.width / 2,
        Math.min(this.world.size.width - 
        this.size.width / 2, value));
      this.markCells();
      this.placeDom();
  }
  set topSetter (value) {
     this.deMarkCells();
     this.top = Math.max(this.size.height / 2, 
       Math.min(this.world.size.height - 
        this.size.height / 2, value));
     this.markCells();
     this.placeDom();
  }
  set resourceSetter(value) {
    this.resource = value;
    this.dom.innerHTML = this.resource;
    if(this.resource === 0)
      this.delete();
  }

  get direction () {
    return Math.atan(- (this.target.top - this.top) / (this.target.left - this.left)) + 
        (this.target.left - this.left <= 0 ? Math.PI : 0);
  }
  distToObject (obj) {
    return ((this.left - obj.left) ** 2 + 
      (this.top - obj.top) ** 2) ** 0.5;
  }
  get currentSpeed () {
    if(this.distToObject(this.target) < this.minDistToObject)
     return {
        toRight: 0,
        toBottom: 0
      };
     return {
      toRight: this.maxSpeed * Math.cos(this.direction),
      toBottom: - this.maxSpeed * Math.sin(this.direction)
    }
  }

  get cells() {
    let leftMinCellInd = Math.max(0, Math.min(this.world.sizeInCells.width - 1, 
      Math.floor((this.left - this.size.width / 2) / this.world.cellSize.width)));
    let leftMaxCellInd = Math.max(0, Math.min(this.world.sizeInCells.width - 1,
      Math.floor((this.left + this.size.width / 2) / this.world.cellSize.width)));
    let topMinCellInd = Math.max(0, Math.min(this.world.sizeInCells.height - 1,
      Math.floor((this.top - this.size.height / 2) / this.world.cellSize.height)));
    let topMaxCellInd = Math.max(0, Math.min(this.world.sizeInCells.height - 1, 
      Math.floor((this.top + this.size.height / 2) / this.world.cellSize.height)));
    let cells = [];
    for(let i = leftMinCellInd; i <= leftMaxCellInd; i ++)
      for(let j = topMinCellInd; j <= topMaxCellInd; j ++)
      {
        cells.push(this.world.cells[i][j]);
      }
    return cells;
  }
  deMarkCells() {
    if(this.cells === undefined)
      return;
    this.cells.forEach((cell) => {
      cell.object = null;
    })
  }
  markCells() {
     if(this.cells === undefined)
      return;
      this.cells.forEach((cell) => {
    //cell.createDom(); 
      cell.object = this;
    })
  }
 
 step() {

 }
 move() {
    let start = null;
    const leftStart = this.left;
    const topStart = this.top;
    const step = (timeStamp) => {
      if (!start) {
        start = timeStamp;
      }
      const progress = timeStamp - start;
      this.leftSetter = leftStart + this.currentSpeed.toRight * progress / 1000;
      this.topSetter = topStart + this.currentSpeed.toBottom * progress / 1000;
        if(progress < this.moveDuration * 1000)
              window.requestAnimationFrame(step);
   };
      window.requestAnimationFrame(step);
  }

  startMoving() {
      let start = null;
      const step = (timeStamp) => {
      document.getElementById('result').innerHTML = 
      this.currentSpeed.toRight.toFixed(0) + ' ' 
      + this.currentSpeed.toBottom.toFixed(0) + ' ' +
      this.direction.toFixed(1);
      if (!start) {
        start = timeStamp;
      }
      const deltaFrame = timeStamp - start;
      if(this.distToObject(this.target) < this.target.size.width / 2)
        this.target.resourceSetter = this.target.resource - 
          deltaFrame * this.killingPower / 1000;
      this.leftSetter = this.left + this.currentSpeed.toRight * deltaFrame / 1000;
      this.topSetter = this.top + this.currentSpeed.toBottom * deltaFrame / 1000;
      start = timeStamp;
        if(this.resource > 0)
              window.requestAnimationFrame(step);
   }
   window.requestAnimationFrame(step);
   }
  
  delete() {
    this.deMarkCells();
    this.world.dom.removeChild(this.dom);
    this.sound.deleteFromDom();
  }
  placeDom() {
    this.dom.style.left = this.left - 
          this.size.width / 2 + 'px';
    this.dom.style.top = this.top - 
          this.size.height / 2 + 'px';
    this.dom.style.transform = 'rotate(' + (- this.direction * 180 / Math.PI) + 'deg)';
  }
	createDom() {
		this.dom = document.createElement('div');
    this.world.dom.appendChild(this.dom);
    this.dom.style.width = this.size.width + 'px';
    this.dom.style.height = this.size.height + 'px';
    this.dom.classList.add('zombie');
    this.dom.innerHTML = this.resource;
    this.placeDom();
	}
}
