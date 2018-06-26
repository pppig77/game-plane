
var CONFIG = require('./config');
var Bullet = require('./bullet');

var context = CONFIG.context;

//创建飞机
var Plane = function() {
    this.width = 60;
    this.height = 100;
    this.planex = 320;
    this.planey = 470;
    this.movingLeft = false;
    this.movingRight = false;
    this.planeImg = new Image();
    this.planeImg.src = "./img/plane.png";
};
Plane.prototype.draw = function() {
    context.drawImage(this.planeImg, this.planex, this.planey, 60, 100);
};
Plane.prototype.update = function() {
    if (this.movingLeft && this.planex > 30) {
        this.planex -= 5;
    }
    if (this.movingRight && this.planex < 610) {
        this.planex += 5;
    }
};
Plane.prototype.shoot = function() {
    bullets[bulletIndex] = new Bullet(this.planex + this.width / 2);
    bulletIndex++;
}

module.exports = Plane;