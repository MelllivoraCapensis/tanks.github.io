/*eslint-disable*/
import './css/style.css';
import Tank from './tankMaker';
import World from './worldMaker';
import Field from './fieldMaker';
import Target from './target';
import Zombie from './zombie'
const container = document.getElementById('container');
const result = document.getElementById('result');
const field = new Field(container);
const world = new World(field, 100, 100, 500, 500, 10, 10);
const tank = new Tank(world, field, 300, 300);
const zombie1 = new Zombie(world, field, 40, 40, 500, 500, tank);
const zombie2 = new Zombie(world, field, 40, 40, 100, 100, tank);
const zombie3 = new Zombie(world, field, 40, 40, 400, 300, tank);
//const target3 = new Target(world, field, 100, 100, 1500, 300);
//const target4 = new Target(world, field, 100, 100, 200, 1100);
result.onclick = () => {
	field.dom.webkitRequestFullscreen();
}

