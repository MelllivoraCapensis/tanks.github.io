/*eslint-disable*/
import './css/style.css';
import Tank from './tankMaker';
import World from './worldMaker';
import Field from './fieldMaker';
import Target from './target.js';
const container = document.getElementById('container');
const result = document.getElementById('result');
const field = new Field(container);
const world = new World(field, 500, 500, 200, 200, 10, 10);
const tank = new Tank(world, field, 800, 600);
const target1 = new Target(world, field, 100, 100, 200, 100);
//const target2 = new Target(world, field, 100, 100, 700, 900);
//const target3 = new Target(world, field, 100, 100, 1500, 300);
//const target4 = new Target(world, field, 100, 100, 200, 1100);

result.onclick = () => {
	field.dom.webkitRequestFullscreen();
}
