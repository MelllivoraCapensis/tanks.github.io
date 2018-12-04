!function(t){var e={};function i(o){if(e[o])return e[o].exports;var s=e[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(o,s,function(e){return t[e]}.bind(null,s));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="dist/",i(i.s=1)}([function(t,e,i){},function(t,e,i){"use strict";i.r(e);i(0);function o(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var s=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.sound=document.createElement("audio"),this.sound.src=e,this.sound.setAttribute("preload","auto"),this.sound.setAttribute("controls","none"),this.sound.style.display="none",this.volume={min:.05,max:.2},this.sound.volume=this.volume.min,this.sound.loop=i,document.body.appendChild(this.sound)}var e,i,s;return e=t,(i=[{key:"deleteFromDom",value:function(){document.body.removeChild(this.sound)}},{key:"play",value:function(){this.sound.play()}},{key:"stop",value:function(){this.sound.pause(),this.sound.currentTime=0}},{key:"volumeSetter",set:function(t){this.sound.volume=t}}])&&o(e.prototype,i),s&&o(e,s),t}();function n(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var r=function(){function t(e,i,o,n,r,h,l){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.relSpeed=500,this.tankSpeed=l,this.direction=h,this.size={width:e,height:5},this.field=o,this.world=i,this.left=n,this.top=r,this.leftInField=0,this.topInField=0,this.sound=new s("./audio/bullet02_shot.wav"),this.sound.volumeSetter=.5,this.sound.play(),this.createDom(),this.world.addChildSetter=this,this.move()}var e,i,o;return e=t,(i=[{key:"move",value:function(){var t=this,e=null,i=this.left,o=this.top;window.requestAnimationFrame(function s(n){t.isEndOfPath()?t.deleteFromDom():window.requestAnimationFrame(s),e||(e=n);var r=n-e;t.leftSetter=i+t.fullSpeed.toRight*r/1e3,t.topSetter=o+t.fullSpeed.toBottom*r/1e3})}},{key:"isEndOfPath",value:function(){return this.leftInField>=this.field.size.width||this.leftInField<=0||this.topInField>=this.field.size.height||this.topInField<=0||null!==this.cell.object}},{key:"deleteFromDom",value:function(){var t=this;void 0!==this.cell&&null!==this.cell.object&&(this.cell.object.resourceSetter=this.cell.object.resource-1),this.world.dom.removeChild(this.dom),setTimeout(function(){t.sound.deleteFromDom()},1e3)}},{key:"placeInDom",value:function(){this.dom.style.left="".concat(this.left,"px"),this.dom.style.top="".concat(this.top,"px")}},{key:"createDom",value:function(){this.dom=document.createElement("div"),this.dom.classList.add("bullet"),this.dom.style.width="".concat(this.size.width,"px"),this.dom.style.height="".concat(this.size.height,"px"),this.world.dom.appendChild(this.dom),this.placeInDom()}},{key:"cell",get:function(){var t=Math.max(0,Math.min(this.world.sizeInCells.width-1,Math.floor(this.left/this.world.cellSize.width))),e=Math.max(0,Math.min(this.world.sizeInCells.height-1,Math.floor(this.top/this.world.cellSize.height)));return this.world.cells[t][e]}},{key:"fullSpeed",get:function(){return{toRight:this.relSpeed*Math.cos(this.direction),toBottom:-this.relSpeed*Math.sin(this.direction)}}},{key:"leftSetter",set:function(t){this.left=Math.max(0,Math.min(this.world.size.width,t)),this.leftInField=this.left-this.field.left,this.placeInDom()}},{key:"topSetter",set:function(t){this.top=Math.max(0,Math.min(this.world.size.height,t)),this.topInField=this.top-this.field.top,this.placeInDom()}}])&&n(e.prototype,i),o&&n(e,o),t}();function h(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var l=function(){function t(e,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.tank=e,this.barrel={size:{width:6,height:50}},this.turret={size:{width:40,height:50}},this.direction=i,this.createTankGunDom()}var e,i,o;return e=t,(i=[{key:"rotateTurret",value:function(){this.turretDom.style.transform="rotate(".concat(180*-this.direction/Math.PI+90,"deg)")}},{key:"createTankGunDom",value:function(){this.turretDom=document.createElement("div"),this.tank.dom.appendChild(this.turretDom),this.turretDom.classList.add("tankTurret"),this.turretDom.style.width="".concat(this.turret.size.width,"px"),this.turretDom.style.height="".concat(this.turret.size.height,"px"),this.turretDom.style.top="".concat((this.tank.size.height-this.turret.size.height)/2,"px"),this.turretDom.style.left="".concat((this.tank.size.width-this.turret.size.width)/2,"px"),this.rotateTurret(),this.barrelDom=document.createElement("div"),this.turretDom.appendChild(this.barrelDom),this.barrelDom.classList.add("tankBarrel"),this.barrelDom.style.width="".concat(this.barrel.size.width,"px"),this.barrelDom.style.height="".concat(this.barrel.size.height,"px"),this.barrelDom.style.left="".concat((this.turret.size.width-this.barrel.size.width)/2,"px"),this.barrelDom.style.top="".concat(-this.barrel.size.height,"px")}},{key:"directionSetter",set:function(t){this.direction=t,this.rotateTurret()}}])&&h(e.prototype,i),o&&h(e,o),t}();function a(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var d=function(t,e){var i=t.indexOf(e);i>=0&&t.splice(i,1)},c=function(t,e){t.indexOf(e)>=0||t.push(e)},u=function(t){return"KeyW"===t},f=function(t){return"KeyA"===t||"KeyD"===t},m=function(){function t(e,i,o,s){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.animTimeStep=10,this.fireRate=5,this.speed={linear:100,radial:1},this.world=e,this.field=i,this.bulletWidth=5,this.gunRotateStep=.005,this.size={width:70,height:100},this.minDistToEdge={horizontal:100,vertical:100},this.left=o,this.top=s,this.keyCodes={move:[],turn:[],fight:[],turret:[]},this.direction=Math.PI/2,this.createDom(),this.addManipulation(),this.world.addChildSetter=this,this.tankGun=new l(this,Math.PI/2)}var e,i,o;return e=t,(i=[{key:"isMoveKeyCode",value:function(t){return t===Object.keys(this.arrowHandlers)[0]||t===Object.keys(this.arrowHandlers)[2]}},{key:"isTurnKeyCode",value:function(t){return t===Object.keys(this.arrowHandlers)[1]||t===Object.keys(this.arrowHandlers)[3]}},{key:"moveWorld",value:function(){this.distToEdge.left<=this.minDistToEdge.horizontal&&this.currentSpeed.toRight<0&&(this.world.leftSetter=this.world.left-this.currentSpeed.toRight*this.animTimeStep/1e3),this.distToEdge.right<=this.minDistToEdge.horizontal&&this.currentSpeed.toRight>0&&(this.world.leftSetter=this.world.left-this.currentSpeed.toRight*this.animTimeStep/1e3),this.distToEdge.top<=this.minDistToEdge.vertical&&this.currentSpeed.toBottom<0&&(this.world.topSetter=this.world.top-this.currentSpeed.toBottom*this.animTimeStep/1e3),this.distToEdge.bottom<=this.minDistToEdge.vertical&&this.currentSpeed.toBottom>0&&(this.world.topSetter=this.world.top-this.currentSpeed.toBottom*this.animTimeStep/1e3)}},{key:"placeDom",value:function(){this.dom.style.left="".concat(this.left-this.size.width/2,"px"),this.dom.style.top="".concat(this.top-this.size.height/2,"px"),this.dom.style.transform="rotate(".concat(90-180*this.direction/Math.PI,"deg)")}},{key:"createDom",value:function(t,e){this.dom=document.createElement("div"),this.dom.classList.add("tank"),this.dom.style.width="".concat(this.size.width,"px"),this.dom.style.height="".concat(this.size.height,"px"),this.world.dom.appendChild(this.dom),this.placeDom(),this.sound={move:new s("./audio/tankMove.mp3",!0),turretTurn:new s("./audio/turretMove.mp3",!0)}}},{key:"move",value:function(){var t=this;this.sound.move.play();var e=setInterval(function(){if(0===t.keyCodes.move.length)return clearInterval(e),void t.sound.move.stop();t.keyCodes.move.forEach(function(e){t.handleKey(e)})},this.animTimeStep)}},{key:"fight",value:function(){var t=this,e=0,i=0,o=setInterval(function(){0!==t.keyCodes.fight.length?(t.keyCodes.fight.forEach(function(o){Math.floor(e/1e3*t.fireRate===i)&&(t.handleKey(o),i++)}),e+=t.animTimeStep):clearInterval(o)},this.animTimeStep)}},{key:"turn",value:function(){var t=this,e=setInterval(function(){0!==t.keyCodes.turn.length?t.keyCodes.turn.forEach(function(e){t.handleKey(e)}):clearInterval(e)},this.animTimeStep)}},{key:"turretTurn",value:function(){var t=this;this.sound.turretTurn.play();var e=setInterval(function(){if(0===t.keyCodes.turret.length)return clearInterval(e),void t.sound.turretTurn.stop();t.keyCodes.turret.forEach(function(e){t.handleKey(e)})},this.animTimeStep)}},{key:"handleKey",value:function(t){switch(t){case"KeyW":new r(this.bulletWidth,this.world,this.field,this.endOfBarrel.left,this.endOfBarrel.top,this.tankGun.direction+this.direction-Math.PI/2,this.currentSpeed);break;case"KeyA":this.tankGun.directionSetter=this.tankGun.direction+this.gunRotateStep;break;case"KeyD":this.tankGun.directionSetter=this.tankGun.direction-this.gunRotateStep;break;case"ArrowLeft":this.arrowHandlers.ArrowLeft.call(this);break;case"ArrowRight":this.arrowHandlers.ArrowRight.call(this);break;case"ArrowUp":this.arrowHandlers.ArrowUp.call(this);break;case"ArrowDown":this.arrowHandlers.ArrowDown.call(this)}}},{key:"addManipulation",value:function(){var t=this;window.onkeyup=function(e){t.isMoveKeyCode(e.code)&&d(t.keyCodes.move,e.code),t.isTurnKeyCode(e.code)&&d(t.keyCodes.turn,e.code),f(e.code)&&d(t.keyCodes.turret,e.code),u(e.code)&&d(t.keyCodes.fight,e.code)},window.onkeydown=function(e){t.isMoveKeyCode(e.code)&&(0===t.keyCodes.move.length?(c(t.keyCodes.move,e.code),t.move()):c(t.keyCodes.move,e.code)),t.isTurnKeyCode(e.code)&&(0===t.keyCodes.turn.length&&(c(t.keyCodes.turn,e.code),t.turn()),c(t.keyCodes.turn,e.code)),f(e.code)&&(0===t.keyCodes.turret.length?(c(t.keyCodes.turret,e.code),t.turretTurn()):c(t.keyCodes.turret,e.code)),u(e.code)&&(0===t.keyCodes.fight.length&&(c(t.keyCodes.fight,e.code),t.fight()),c(t.keyCodes.fight,e.code))}}},{key:"moveSoundSetter",set:function(t){"stop"===t&&this.sound.move.stop(),"play"===t&&this.sound.move.play()}},{key:"turretSoundSetter",set:function(t){"stop"===t&&this.sound.turretTurn.stop(),"play"===t&&this.sound.turretTurn.play()}},{key:"directionSetter",set:function(t){this.direction=t%(2*Math.PI),this.placeDom()}},{key:"arrowHandlers",get:function(){var t=this;return{ArrowUp:function(){t.topSetter=t.top+t.currentSpeed.toBottom*t.animTimeStep/1e3,t.leftSetter=t.left+t.currentSpeed.toRight*t.animTimeStep/1e3},ArrowLeft:function(){t.directionSetter=t.direction+t.animTimeStep*t.currentSpeed.radial/1e3,t.world.rotateSetter={left:t.left,top:t.top,angle:-t.animTimeStep*t.currentSpeed.radial/1e3}},ArrowDown:function(){t.topSetter=t.top+t.currentSpeed.toBottom*t.animTimeStep/1e3,t.leftSetter=t.left+t.currentSpeed.toRight*t.animTimeStep/1e3},ArrowRight:function(){t.directionSetter=t.direction-t.animTimeStep*t.currentSpeed.radial/1e3,t.world.rotateSetter={left:t.left,top:t.top,angle:t.animTimeStep*t.currentSpeed.radial/1e3}}}}},{key:"endOfBarrel",get:function(){var t=this.tankGun.turret.size.height/2+this.tankGun.barrel.size.height,e=this.tankGun.direction+this.direction-Math.PI/2;return{left:this.left+t*Math.cos(e)-this.tankGun.barrel.size.width/2,top:this.top-t*Math.sin(e)-this.tankGun.barrel.size.width/2}}},{key:"currentSpeed",get:function(){var t=(this.keyCodes.move.indexOf("ArrowUp")>=0)-(this.keyCodes.move.indexOf("ArrowDown")>=0);return{toRight:t*this.speed.linear*Math.cos(this.direction),toBottom:-t*this.speed.linear*Math.sin(this.direction),radial:this.speed.radial*t}}},{key:"leftSetter",set:function(t){this.left=Math.max(this.size.height/2,Math.min(this.world.size.width-this.size.height/2,t)),this.moveWorld(),this.placeDom()}},{key:"topSetter",set:function(t){this.top=Math.max(this.size.height/2,Math.min(this.world.size.height-this.size.height/2,t)),this.moveWorld(),this.placeDom()}},{key:"topInField",get:function(){return(this.left+this.world.left)*Math.sin(-this.world.direction)+(this.top+this.world.top)*Math.cos(-this.world.direction)}},{key:"leftInField",get:function(){return(this.left+this.world.left)*Math.cos(-this.world.direction)-(this.top+this.world.top)*Math.sin(-this.world.direction)}},{key:"distToEdge",get:function(){return{left:this.leftInField,top:this.topInField,right:this.field.size.width-this.leftInField,bottom:this.field.size.height-this.topInField}}}])&&a(e.prototype,i),o&&a(e,o),t}();function p(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var y=function(){function t(e,i,o,s,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.size={width:s,height:n},this.leftNum=i,this.topNum=o,this.world=e,this.object=null}var e,i,o;return e=t,(i=[{key:"createDom",value:function(){this.cellDom=document.createElement("div"),this.world.dom.appendChild(this.cellDom),this.cellDom.classList.add("cell"),this.cellDom.style.width=this.size.width+"px",this.cellDom.style.height=this.size.height+"px",this.cellDom.style.left=this.leftNum*this.size.width+"px",this.cellDom.style.top=this.topNum*this.size.height+"px"}}])&&p(e.prototype,i),o&&p(e,o),t}();function w(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var v=function(){function t(e,i,o,s,n,r,h){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.sizeInCells={width:s,height:n},this.cellSize={width:r,height:h},this.size={width:this.sizeInCells.width*this.cellSize.width,height:this.sizeInCells.height*this.cellSize.height},this.field=e,this.startHiddenLeft=i,this.startHiddenTop=o,this.cells=[],this.childs=[],this.left=-i,this.top=-o,this.direction=0,this.field.leftSetter=this.startHiddenLeft,this.field.topSetter=this.startHiddenTop,this.createDom(),this.addCells()}var e,i,o;return e=t,(i=[{key:"placeDom",value:function(){console.log(this.left,this.top,this.direction),this.dom.style.left=this.left+"px",this.dom.style.top=this.top+"px",this.dom.style.transform="rotate("+180*-this.direction/Math.PI+"deg)"}},{key:"createDom",value:function(){this.dom=document.createElement("div"),this.dom.classList.add("world"),this.field.dom.appendChild(this.dom),this.dom.style.width=this.size.width+"px",this.dom.style.height=this.size.height+"px",this.dom.style.transformOrigin="0 0",this.placeDom()}},{key:"addCells",value:function(){for(var t=0;t<this.sizeInCells.width;t++){this.cells.push([]);for(var e=0;e<this.sizeInCells.height;e++)this.cells[t].push(new y(this,t,e,this.cellSize.width,this.cellSize.height))}}},{key:"addChildSetter",set:function(t){this.childs.push(t)}},{key:"leftSetter",set:function(t){this.left=t,this.placeDom()}},{key:"topSetter",set:function(t){this.top=t,this.placeDom()}},{key:"rotateSetter",set:function(t){var e=t.left,i=t.top,o=t.angle,s=this.direction,n=this.direction+o,r=Math.pow(Math.pow(e,2)+Math.pow(i,2),.5);if(0===r)var h=0;else h=Math.acos(e/r);this.direction=n,this.left=this.left+r*(Math.cos(h-s)-Math.cos(h-n)),this.top=this.top+r*(Math.sin(h-s)-Math.sin(h-n)),this.placeDom()}}])&&w(e.prototype,i),o&&w(e,o),t}();function g(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var k=function(){function t(e,i,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.createdom()}var e,i,o;return e=t,(i=[{key:"createdom",value:function(){this.dom=document.createElement("div"),container.appendChild(this.dom),this.dom.classList.add("field")}},{key:"size",get:function(){return{width:this.dom.clientWidth,height:this.dom.clientHeight}}}])&&g(e.prototype,i),o&&g(e,o),t}();function S(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var b=function(){function t(e,i,o,s,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.size={width:o,height:s},this.field=i,this.world=e,this.moveDuration=5,this.maxSpeed=200,this.left=n,this.top=r,this.resource=10,this.createDom(),this.markCells()}var e,i,o;return e=t,(i=[{key:"deMarkCells",value:function(){void 0!==this.cells&&this.cells.forEach(function(t){t.object=null})}},{key:"markCells",value:function(){var t=this;void 0!==this.cells&&this.cells.forEach(function(e){e.object=t})}},{key:"move",value:function(t){var e=this,i=null,o=this.left,s=this.top;window.requestAnimationFrame(function n(r){i||(i=r);var h=r-i;e.leftSetter=o+t.toRight*h/1e3,e.topSetter=s+t.toBottom*h/1e3,h<1e3*e.moveDuration&&window.requestAnimationFrame(n)})}},{key:"startMoving",value:function(){var t=this,e=setInterval(function(){if(0!==t.resource){var i={toRight:Math.floor((Math.random()-.5)*t.maxSpeed),toBottom:Math.floor((Math.random()-.5)*t.maxSpeed)};t.move(i)}else clearInterval(e)},1e3*this.moveDuration)}},{key:"deleteFromDom",value:function(){this.deMarkCells(),this.world.dom.removeChild(this.dom)}},{key:"placeDom",value:function(){this.dom.style.left=this.left-this.size.width/2+"px",this.dom.style.top=this.top-this.size.height/2+"px"}},{key:"createDom",value:function(){this.dom=document.createElement("div"),this.world.dom.appendChild(this.dom),this.dom.classList.add("target"),this.dom.style.width=this.size.width+"px",this.dom.style.height=this.size.height+"px",this.dom.innerHTML=this.resource,this.placeDom()}},{key:"leftSetter",set:function(t){this.deMarkCells(),this.left=Math.max(this.size.width/2,Math.min(this.world.size.width-this.size.width/2,t)),this.markCells(),this.placeDom()}},{key:"topSetter",set:function(t){this.deMarkCells(),this.top=Math.max(this.size.height/2,Math.min(this.world.size.height-this.size.height/2,t)),this.markCells(),this.placeDom()}},{key:"resourceSetter",set:function(t){this.resource=t,this.dom.innerHTML=this.resource,0===this.resource&&this.deleteFromDom()}},{key:"cells",get:function(){for(var t=Math.max(0,Math.min(this.world.sizeInCells.width-1,Math.floor((this.left-this.size.width/2)/this.world.cellSize.width))),e=Math.max(0,Math.min(this.world.sizeInCells.width-1,Math.floor((this.left+this.size.width/2)/this.world.cellSize.width))),i=Math.max(0,Math.min(this.world.sizeInCells.height-1,Math.floor((this.top-this.size.height/2)/this.world.cellSize.height))),o=Math.max(0,Math.min(this.world.sizeInCells.height-1,Math.floor((this.top+this.size.height/2)/this.world.cellSize.height))),s=[],n=t;n<=e;n++)for(var r=i;r<=o;r++)s.push(this.world.cells[n][r]);return s}}])&&S(e.prototype,i),o&&S(e,o),t}(),z=document.getElementById("container"),M=document.getElementById("result"),C=new k(z),D=new v(C,50,50,100,100,10,10);new m(D,C,200,200),new b(D,C,10,10,100,100);M.onclick=function(){C.dom.webkitRequestFullscreen()}}]);