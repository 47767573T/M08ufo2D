/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        //var de movimiento
        this.UFO_MAX_SPEED = 200;
        this.UFO_FRICTION = 30;
        this.UFO_ACCELERATION = 180;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('ufo', 'assets/UFO_low.png');
        this.load.image('pickup', 'assets/Pickup_low.png');
        //Background Tilled
        this.game.load.tilemap('bgTilledMap', 'assets/bgTilled.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('bgLow', 'assets/Background_low.png');
        /*//piezas de background orden
        this.load.image('bgArribaIzquierda', 'assets/Background-0-0.png');
        this.load.image('bgArriba', 'assets/Background-0-1.png');
        this.load.image('bgArribaDerecha', 'assets/Background-0-2.png');
        this.load.image('bgIzquierda', 'assets/Background-1-0.png');
        this.load.image('bgCentro', 'assets/Background-1-1.png');
        this.load.image('bgDerecha', 'assets/Background-1-2.png');
        this.load.image('bgAbajoIzquierda', 'assets/Background-2-0.png');
        this.load.image('bgAbajo', 'assets/Background-2-1.png');
        this.load.image('bgAbajoDerecha', 'assets/Background-2-2.png');*/
        //this.load.image('background', 'assets/Background_low.png');
        //this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        this.createWalls();
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        this.physics.enable(this.ufo);
        this.cursor = this.input.keyboard.createCursorKeys();
        this.ufo.body.maxVelocity.setTo(this.UFO_MAX_SPEED, this.UFO_MAX_SPEED);
        this.ufo.body.drag.setTo(this.UFO_FRICTION, this.UFO_FRICTION);
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(1);
    };
    mainState.prototype.createWalls = function () {
        this.map = this.game.add.tilemap('bgTilledMap');
        this.map.addTilesetImage('Background_low', 'bgLow');
        this.walls = this.map.createLayer("Tile Layer 1");
        var background = this.map.createLayer('Tile Layer 2');
        this.map.setCollisionBetween(1, 100, true, 'walls');
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        this.game.debug.bodyInfo(this.ufo, 0, 0);
        if (this.cursor.left.isDown) {
            this.ufo.body.acceleration.x = -this.UFO_ACCELERATION;
        }
        else if (this.cursor.right.isDown) {
            this.ufo.body.acceleration.x = this.UFO_ACCELERATION;
        }
        else if (this.cursor.up.isDown) {
            this.ufo.body.acceleration.y = -this.UFO_ACCELERATION;
        }
        else if (this.cursor.down.isDown) {
            this.ufo.body.acceleration.y = this.UFO_ACCELERATION;
        }
        else {
            this.ufo.body.acceleration.y = 0;
            this.ufo.body.acceleration.x = 0;
        }
    };
    return mainState;
})(Phaser.State);
var SimpleGame = (function () {
    function SimpleGame() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=main.js.map