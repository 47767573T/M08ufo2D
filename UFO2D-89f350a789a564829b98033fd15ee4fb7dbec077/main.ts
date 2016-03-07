/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;
    private ufo:Phaser.Sprite;
    private cursor:Phaser.CursorKeys;
    private walls:Phaser.TilemapLayer;

    //var de movimiento
    private UFO_MAX_SPEED = 200;
    private UFO_FRICTION = 30;
    private UFO_ACCELERATION = 180;

    //Background
    private map:Phaser.Tilemap;



    preload():void {
        super.preload();

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
    }

    create():void {
        super.create();
        this.createWalls();


        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);

        this.physics.enable(this.ufo);
        this.cursor = this.input.keyboard.createCursorKeys();

        this.ufo.body.maxVelocity.setTo(this.UFO_MAX_SPEED, this.UFO_MAX_SPEED);
        this.ufo.body.drag.setTo(this.UFO_FRICTION, this.UFO_FRICTION);
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(1);
    }

    private createWalls() {
        this.map = this.game.add.tilemap('bgTilledMap');
        this.map.addTilesetImage('Background_low', 'bgLow');


        this.walls = this.map.createLayer("Tile Layer 1");


        var background = this.map.createLayer('Tile Layer 2');
        this.map.setCollisionBetween(1, 100, true, 'walls');
    }

    update():void {
        super.update();
        this.game.debug.bodyInfo(this.ufo, 0, 0);

            if (this.cursor.left.isDown) {
                this.ufo.body.acceleration.x =-this.UFO_ACCELERATION;

            } else if (this.cursor.right.isDown) {
                this.ufo.body.acceleration.x =this.UFO_ACCELERATION;

            } else if (this.cursor.up.isDown) {
                this.ufo.body.acceleration.y =-this.UFO_ACCELERATION;

            } else if (this.cursor.down.isDown) {
                this.ufo.body.acceleration.y =this.UFO_ACCELERATION;
            } else {
                this.ufo.body.acceleration.y =0;
                this.ufo.body.acceleration.x =0;
            }

    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new SimpleGame();
};
