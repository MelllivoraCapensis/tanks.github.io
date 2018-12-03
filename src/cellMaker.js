/*eslint-disable*/
export default class Cell {
	constructor(world, leftNum, topNum, width, height) {
	   //params
	   this.size = {
	   	width: width,
	   	height: height
	   }
       this.leftNum = leftNum;
       this.topNum = topNum;
       this.world = world;
       
       //state
       this.object = null;
	}	
	createDom() {
		this.cellDom = document.createElement('div');
		this.world.dom.appendChild(this.cellDom);
		this.cellDom.classList.add('cell');
		this.cellDom.style.width = this.size.width + 'px';
		this.cellDom.style.height = this.size.height + 'px';
		this.cellDom.style.left = this.leftNum * this.size.width + 'px';
		this.cellDom.style.top = this.topNum * this.size.height + 'px';
	}

}