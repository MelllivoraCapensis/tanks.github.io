export default class TankGun {
  constructor(tank, barrelDirection) {
    this.tank = tank;
    this.barrel = {
        	size: {
        	  width: 6,
        	  height: 50,
        	},
    };
    this.turret = {
        	size: {
        	   width: 40,
        	   height: 50,
        	},
    };
    this.direction = barrelDirection;
    this.createTankGunDom();
  }

  set directionSetter(value) {
    this.direction = value;
    this.rotateTurrent();
  }

  rotateTurrent() {
    this.turretDom.style.transform = `rotate(${
      -this.direction * 180 / Math.PI + 90}deg)`;
  }

  createTankGunDom() {
    this.turretDom = document.createElement('div');
    this.tank.tankDom.appendChild(this.turretDom);
    this.turretDom.classList.add('tankTurret');
    this.turretDom.style.width = `${this.turret.size.width}px`;
    this.turretDom.style.height = `${this.turret.size.height}px`;
    this.turretDom.style.top = `${(this.tank.size.height
        	- this.turret.size.height) / 2}px`;
    this.turretDom.style.left = `${(this.tank.size.width
        	- this.turret.size.width) / 2}px`;
    this.rotateTurrent();

    this.barrelDom = document.createElement('div');
    this.turretDom.appendChild(this.barrelDom);
    this.barrelDom.classList.add('tankBarrel');
    this.barrelDom.style.width = `${this.barrel.size.width}px`;
    this.barrelDom.style.height = `${this.barrel.size.height}px`;
    this.barrelDom.style.left = `${(this.turret.size.width
        	- this.barrel.size.width) / 2}px`;
    this.barrelDom.style.top = `${-this.barrel.size.height}px`;
  }
}
