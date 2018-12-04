/*eslint-disable*/
import './css/style.css';
import Tank from './tankMaker';
import World from './worldMaker';
import Field from './fieldMaker';
import Target from './target.js';
const container = document.getElementById('container');
const result = document.getElementById('result');
const field = new Field(container);
const world = new World(field, 50, 50, 100, 100, 10, 10);
const tank = new Tank(world, field, 200, 200);
const target1 = new Target(world, field, 10, 10, 100, 100);
//const target2 = new Target(world, field, 100, 100, 700, 900);
//const target3 = new Target(world, field, 100, 100, 1500, 300);
//const target4 = new Target(world, field, 100, 100, 200, 1100);
result.onclick = () => {
	field.dom.webkitRequestFullscreen();
}
