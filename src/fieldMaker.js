/*eslint-disable*/
export default class Field {
  constructor(container, width, height) {
  //initial method
  this.createdom();
  }
  get size () {
    return {
      width: this.dom.clientWidth,
      height: this.dom.clientHeight
    }
  }
 createdom() {
  	this.dom = document.createElement('div');
    container.appendChild(this.dom);
    this.dom.classList.add('field');
  }
}