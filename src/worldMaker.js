/*eslint-disable*/
import Cell from './cellMaker.js';

export default class World {
  constructor(field, hiddenLeft, hiddenTop,
   widthInCells, heightInCells, cellWidth, cellHeight) {
  //params
  this.sizeInCells = {
  	width: widthInCells,
  	height: heightInCells
  }
  this.cellSize = {
  	width: cellWidth,
  	height: cellHeight
  }
  this.size = {
  	width: this.sizeInCells.width * this.cellSize.width,
  	height: this.sizeInCells.height * this.cellSize.height
  }
  this.field = field;
  
  //state
  this.cells = [];
  this.childs = [];
  this.left = - hiddenLeft;
  this.top = - hiddenTop;
  this.direction = 0;
  
    //initial methods
  this.field.worldSetter = this;
  this.createDom();
  this.addCells();
  }
  set addChildSetter (child) {
  	this.childs.push(child);
  }
  set leftSetter(value) {
  	this.left = value;

   	this.placeDom();
  }
  set topSetter(value) {
  	this.top = value;
   	this.placeDom();
  }
  set directionSetter (value) {
    this.direction = value % (2 * Math.PI);
  }
  set rotateSetter(rotateParamObject) {
  	let x = rotateParamObject.left;
    let y = rotateParamObject.top;
    let deltaAngle = rotateParamObject.angle;
    let oldAngle = this.direction;
    let newAngle = this.direction + deltaAngle;
  	let radius = (x ** 2 + y ** 2) ** 0.5;
  	if(radius === 0)
  	var radiusAngle = 0;
    else
  	var radiusAngle = Math.acos(x / radius);
  	this.directionSetter = newAngle;
  	this.leftSetter = this.left + radius * 
  	  (Math.cos(radiusAngle - oldAngle) - Math.cos(radiusAngle - newAngle));
  	this.topSetter = this.top + radius * 
  	  (Math.sin(radiusAngle - oldAngle) - Math.sin(radiusAngle - newAngle));
    this.placeDom();
  }
  placeDom() {
  this.dom.style.left = this.left + 'px';
  this.dom.style.top = this.top + 'px';
  this.dom.style.transform = 'rotate(' + (- this.direction * 180 / Math.PI) + 'deg)';
  }
  createDom() {
  	this.dom = document.createElement('div');
  	this.dom.classList.add('world');
  	this.field.dom.appendChild(this.dom);
  	this.dom.style.width = this.size.width + 'px';
  	this.dom.style.height = this.size.height + 'px';
  	this.dom.style.transformOrigin = '0 0';
    this.placeDom();
  }
  addCells() {
  	for(let i = 0; i < this.sizeInCells.width ; i++)
  	{
  		this.cells.push([]);
  		for(let j = 0; j < this.sizeInCells.height; j++)
  			this.cells[i].push(new Cell(this, i, j, 
  				this.cellSize.width, this.cellSize.height));
  	}
  }

}
