/*eslint-disable*/
export default class Field {
  constructor(container, width, height) {
  //initial method
  this.createdom();
  }
  set worldSetter(world) {
    this.world = world;
  }

  set tankResourceSetter (value) {
    this.showTankResource(value);
    if(value === 0)
      this.en
  }

  get size () {
    return {
      width: this.dom.clientWidth,
      height: this.dom.clientHeight
    }
  }
  get leftInWorld () {
     return this.world.top * Math.sin(- this.directionInWorld) - 
       this.world.left * Math.cos(- this.directionInWorld);
  }
  get topInWorld () {
     return - this.world.left * Math.sin(- this.directionInWorld) - 
      this.world.top * Math.cos(- this.directionInWorld);
  }
  get directionInWorld () {
    return (Math.PI * 2 - this.world.direction) % (2* Math.PI);
  }
 
 showTankResource(value) {
  this.tankResourceDom.innerHTML = value;
 }

 endGame() {
   this.dom.classList.add('fieldEndGame'); 
 }

 createdom() {
  	this.dom = document.createElement('div');
    container.appendChild(this.dom);
    this.dom.classList.add('field');
    this.tankResourceDom = document.createElement('div');
    this.tankResourceDom.classList.add('tankResource');
    this.dom.appendChild(this.tankResourceDom);
  }
}
