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
  this.hidden = {
  	left: hiddenLeft,
  	top: hiddenTop
  }
  //initial methods
  this.createDom();
  this.addCells();
  }
  set hiddenLeftSetter(value) {
  	this.hidden.left = Math.max(0, Math.min(this.size.width - this.field.size.width, value));
  	this.placeDom();
  }
  set hiddenTopSetter(value) {
  	this.hidden.top = Math.max(0, Math.min(this.size.height -this.field.size.height, value));
  	this.placeDom();

  }
  placeDom() {
  this.dom.style.left = - this.hidden.left + 'px';
  this.dom.style.top = - this.hidden.top + 'px';
  }
  createDom() {
  	this.dom = document.createElement('div');
  	this.dom.classList.add('world');
  	this.field.dom.appendChild(this.dom);
  	this.dom.style.width = this.size.width + 'px';
  	this.dom.style.height = this.size.height + 'px';
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