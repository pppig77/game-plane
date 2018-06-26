
var CONFIG = require('./config');

var context = CONFIG.context;

//创建子弹
var Bullet = function(x) {
    //子弹宽高
    this.width = 1;
    this.height = 10;
    this.x = x;
    this.y = 470;
    //子弹速度
    this.vy = 10;
    this.index = bulletIndex;
    this.killability = true;
};
Bullet.prototype.draw = function() {
    context.fillStyle = "white";
    context.fillRect(this.x, this.y, this.width, this.height);
};
Bullet.prototype.update = function() {
    this.y -= this.vy;
    //当子弹到画布外删除子弹
    if (this.y < 0) {
        delete bullets[this.index];
    }
}

module.exports = Bullet;