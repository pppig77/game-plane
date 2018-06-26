var CONFIG = require('./config');

var context = CONFIG.context;

//创建怪兽
var Monster = function(left, top) {
    this.x = left;
    this.y = top;
    this.size = 50;
    this.speed = 2;
    this.direction = 'right';
    this.life = true;
    this.num = 7;
    this.enemyImg = new Image();
    this.enemyImg.src = "./img/enemy.png";
    this.boomImg = new Image();
    this.boomImg.src = "./img/boom.png";
};
//画怪兽
Monster.prototype.draw = function() {
    if (this.life) {
        context.drawImage(this.enemyImg, this.x, this.y, this.size, this.size);
    }
};
//怪兽移动
Monster.prototype.move = function() {
    switch (this.direction) {
    case 'right':
        this.x += this.speed;
        break;
    case 'left':
        this.x -= this.speed;
        break;
    }
    for (var i in bullets) {
        if (this.life) {
            if (! (this.x + this.size < bullets[i].x) && !(bullets[i].x + bullets[i].width < this.x) && !(this.y + this.size < bullets[i].y) && !(bullets[i].y + bullets[i].height < this.y)) {
                context.drawImage(this.boomImg, this.x, this.y, this.size, this.size);
                this.life = false;
                delete bullets[i];
                scores++;
            }
        }
    }
}

module.exports = Monster;