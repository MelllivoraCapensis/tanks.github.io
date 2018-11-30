/*eslint disable*/
import './css/style.css';
import TankMaker from './tankMaker';

const field = document.getElementById('field');
const result = document.getElementById('result');
const tank1 = new TankMaker(field, 345, 80);
const tank2 = new TankMaker(field, 200, 50);
