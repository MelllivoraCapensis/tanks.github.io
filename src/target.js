/*eslint-disable*/
export default class Target {
	constructor(world, field, width, height, leftInWorld, topInWorld) {
     //params
      this.size = {
      	width: width, 
      	height: height
      }
      this.field = field;
      this.world = world;
      this.moveDuration = 5;
      this.maxSpeed = 200;

      //state
      this.left = leftInWorld;
      this.top = topInWorld;
      this.resource = 10;

      //initial methods
      this.createDom();
      this.markCells();
      //this.startMoving();
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
      this.deleteFromDom();
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

 move(randomSpeed) {
    let start = null;
    const leftStart = this.left;
    const topStart = this.top;
    const step = (timeStamp) => {
      if (!start) {
        start = timeStamp;
      }
      const progress = timeStamp - start;
      this.leftSetter = leftStart + randomSpeed.toRight * progress / 1000;
      this.topSetter = topStart + randomSpeed.toBottom * progress / 1000;
        if(progress < this.moveDuration * 1000)
              window.requestAnimationFrame(step);
   };
      window.requestAnimationFrame(step);
  }

  startMoving() {
       let timerId = setInterval(() => {
          if(this.resource === 0)
          {
            clearInterval(timerId);
            return;
          }
          let randomSpeed = {
          toRight: Math.floor((Math.random() - 0.5) * this.maxSpeed),
          toBottom: Math.floor((Math.random() - 0.5) * this.maxSpeed)
        }         
          this.move(randomSpeed);
        },this.moveDuration * 1000);
   }

  deleteFromDom() {
    this.deMarkCells();
    this.world.dom.removeChild(this.dom);
  }
  placeDom() {
    this.dom.style.left = this.left - 
          this.size.width / 2 + 'px';
    this.dom.style.top = this.top - 
          this.size.height / 2 + 'px';
  }
	createDom() {
		this.dom = document.createElement('div');
    this.world.dom.appendChild(this.dom);
    this.dom.classList.add('target');
    this.dom.style.width = this.size.width + 'px';
    this.dom.style.height = this.size.height + 'px';
    this.dom.innerHTML = this.resource;
    this.placeDom();
	}
}