
var CONFIG = require('./config');
var Bullet = require('./bullet');
var Plane = require('./plane');
var Monster = require('./monster');

var context = CONFIG.context;
var container = CONFIG.container;

var GAME = {
    /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts 
   * @return {[type]}      [description]
   */
    opts: {
        level: CONFIG.level,
    },
    init: function() {
        this.status = 'start';
        this.bindEvent();
    },
    bindEvent: function() {
        var self = this;
        var playBtn = document.querySelector('.js-play');
        var replayBtn = document.querySelectorAll('.js-replay');
        var nextBtn = document.querySelector('.js-next');
        // 开始游戏按钮绑定
        playBtn.onclick = function() {
            self.play();
        };
        for (var i in replayBtn) {
            replayBtn[i].onclick = function() {
                self.opts.level = 1;
                scores = 0;
                self.play();
            };
        }
        nextBtn.onclick = function() {
            self.opts.level += 1;
            self.play();
        };
    },
    keypress: function() {
        window.addEventListener("keydown", this.buttonDown);
        window.addEventListener("keypress", this.keyPressed);
        window.addEventListener("keyup", this.buttonUp);
    },
    keyPressed: function(e) {
        if (e.keyCode === 32) {
            GAME.plane.shoot();
        }
    },
    buttonDown: function(e) {
        if (e.keyCode === 37) {
            GAME.plane.movingRight = false;
            GAME.plane.movingLeft = true;
        }
        if (e.keyCode === 39) {
            GAME.plane.movingLeft = false;
            GAME.plane.movingRight = true;
        }
    },
    buttonUp: function(e) {
        if (e.keyCode === 37) {
            GAME.plane.movingLeft = false;
        }
        if (e.keyCode === 39) {
            GAME.plane.movingRight = false;
        }
    },
    //清理画布
    clear: function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    },
    //循环画布
    loop: function() {
        GAME.clear();
        for (var i in bullets) {
            bullets[i].draw();
            bullets[i].update();
        }
        if (GAME.enemies[0].direction == 'right') {
            if (GAME.enemies.some(function(i) {
                return i.x > 620 && i.life;
            })) {
                GAME.enemies.every(function(i) {
                    return i.direction = 'left',
                    i.y += i.size;
                });
            }
        }
        if (GAME.enemies[0].direction == 'left') {
            if (GAME.enemies.some(function(i) {
                return i.x < 30 && i.life;
            })) {
                GAME.enemies.every(function(i) {
                    return i.direction = 'right',
                    i.y += i.size;
                });
            }
        }
        for (var i in GAME.enemies) {
            GAME.enemies[i].move();
            GAME.enemies[i].draw();
        }
        GAME.plane.draw();
        GAME.plane.update();
        GAME.score();
        stop = requestAnimationFrame(GAME.loop);
        if (GAME.enemies.some(function(i) {
            return i.y > 420 && i.life;
        })) {
            console.log('失败');
            window.cancelAnimationFrame(stop);
            GAME.clear();
            GAME.failed();
        };
        if (GAME.enemies.every(function(i) {
            return i.life === false;
        })) {
            console.log('胜利');
            window.cancelAnimationFrame(stop);
            GAME.clear();
            if (GAME.opts.level === 6) {
                GAME.setStatus('all-success');
            } else {
                GAME.setStatus('success');
            }
        };
    },
    /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * stop 游戏暂停
   */
    setStatus: function(status) {
        this.status = status;
        container.setAttribute("data-status", status);
    },
    play: function() {
        var len = CONFIG.numPerLine;
        var allSize = CONFIG.enemySize + CONFIG.enemyGap;
        this.setStatus('playing');
        this.keypress();
        //飞机
        this.plane = new Plane();
        //怪兽集合
        this.enemies = [];
        bullets = [];
        for (var i = 0; i < this.opts.level; i++) {
            for (var j = 0; j < len; j++) {
                var obj = new Monster((100 + j * allSize), (20 + i * allSize));
                this.enemies.push(obj);
            }
        }
        this.loop();
    },
    score: function() {
        context.font = '18px 微软雅黑';
        context.fillStyle = 'white';
        context.fillText('分数: ' + scores, 20, 30);
        context.fillText('关卡: ' + this.opts.level, 20, 60);
    },
    failed: function() {
        this.setStatus('failed');
        var score = document.querySelector('.score');
        score.innerHTML = scores;
    },
}

module.exports = GAME;