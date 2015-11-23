
var game =  new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });


function preload(){


	game.load.tilemap('level1', '../images/level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles-1', '../images/tiles-1.png');
		game.load.spritesheet('droid', '../images/droid.png', 32, 32);
		game.load.spritesheet('dude', '../images/dude.png', 32, 48);
	 game.load.image('star', '../images/star.png');
	 game.load.image('spikes','../images/spikes.png');
	 game.load.image('aid','../images/firstaid.png');
	 game.load.image('background', '../images/background2.png');
	 game.load.image('bullet','../images/bullet1.png');

	 //  Firefox doesn't support mp3 files, so use ogg
	game.load.audio('backgroundMusic', ['../audio/music1.mp3', '../audio/music1.ogg']);
}

var life = 1;
var scoreText;
var lifeText;
var map;
var tileset;
var layer;
var player;
var droid;
var droid1;
var droid2;
var droid3;
var droid4;
var droid5;
var droid6;
var droid7;
var facing = 'left';
var jumpTimer = 0;
var w = 800;
var h = 600;
var timerAidKit;
var cursors;
var bg;
var baddyMovTimer;
var lifeTimer = 0;
var music;
var weapons=[];
var currentWeapon=0;
var bullets=[];

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);


// Black
		 game.stage.backgroundColor = '#000000';
//Tile for bg
    bg = game.add.tileSprite(0, 0, w, h, 'background');
		bg.fixedToCamera = true;

//Create map from tileset
		map = game.add.tilemap('level1');

		map.addTilesetImage('tiles-1');

//Collision des tiles
		map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

 		layer = map.createLayer('Tile Layer 1');

		//  Un-comment this on to see the collision tiles
	 // layer.debug = true;

	 layer.resizeWorld();

 //Adds gravity to everything
	game.physics.arcade.gravity.y = 250;

	//Bullet related stuff
		//weapons = game.add.sprite(32, game.world.height -150,'bullet');
		weapons.push(new Weapon.SingleBullet(this.game));

		var currentWeapon = 0;

		for (var i = 1; i < weapons.length; i++)
		{
				weapons[i].visible = false;
		}

		 //The firstAid group contains the aid kits that give you back some life
		 firstAid = game.add.group();

		 //The spikes group contains the spikes player must avoid
		 spikes = game.add.group();

		 //enable physics for objects in this group
		 spikes.enableBody = true;
		 firstAid.enableBody = true;



		 //Here we create some spikes
		 for (var i = 0; i < 5; i++)
		 {
				 //  Create a spike inside of the 'spikes' group
				 var spike = spikes.create(i * 70, game.world.height - 95, 'spikes');
		 }

		 //The droid and it's settings
	 	 droid = game.add.sprite(647, 960, 'droid');
		 droid.life = 0;
		 game.physics.enable(droid, Phaser.Physics.ARCADE);
		 game.physics.arcade.enable(droid);
		 droid.body.bounce.y=0.2;
		 droid.body.collideWorldBounds=true;
		 droid.body.setSize(20, 32, 5, 16);
		 droid.animations.add('left', [0, 1], 10, true);
		 droid.animations.add('right', [2,3], 10, true);

		 //Another droid
		 droid1 = game.add.sprite(37, 592, 'droid');
		droid1.life = 0;
		game.physics.enable(droid1, Phaser.Physics.ARCADE);
		game.physics.arcade.enable(droid1);
		droid1.body.bounce.y=0.2;
		droid1.body.collideWorldBounds=true;
		droid1.body.setSize(20, 32, 5, 16);
		droid1.animations.add('left', [0, 1], 10, true);
		droid1.animations.add('right', [2,3], 10, true);

		droid2 = game.add.sprite(731, 888, 'droid');
	 droid2.life = 0;
	 game.physics.enable(droid2, Phaser.Physics.ARCADE);
	 game.physics.arcade.enable(droid2);
	 droid2.body.bounce.y=0.2;
	 droid2.body.collideWorldBounds=true;
	 droid2.body.setSize(20, 32, 5, 16);
	 droid2.animations.add('left', [0, 1], 10, true);
	 droid2.animations.add('right', [2,3], 10, true);

	droid3 = game.add.sprite(207, 832, 'droid');
	droid3.life = 0;
	game.physics.enable(droid3, Phaser.Physics.ARCADE);
	game.physics.arcade.enable(droid3);
	droid3.body.bounce.y=0.2;
	droid3.body.collideWorldBounds=true;
	droid3.body.setSize(20, 32, 5, 16);
	droid3.animations.add('left', [0, 1], 10, true);
	droid3.animations.add('right', [2,3], 10, true);

	droid4 = game.add.sprite(423, 960, 'droid');
	droid4.life = 0;
	game.physics.enable(droid4, Phaser.Physics.ARCADE);
	game.physics.arcade.enable(droid4);
	droid4.body.bounce.y=0.2;
	droid4.body.collideWorldBounds=true;
	droid4.body.setSize(20, 32, 5, 16);
	droid4.animations.add('left', [0, 1], 10, true);
	droid4.animations.add('right', [2,3], 10, true);

	droid5 = game.add.sprite(658, 240, 'droid');
	droid5.life = 0;
	game.physics.enable(droid5, Phaser.Physics.ARCADE);
	game.physics.arcade.enable(droid5);
	droid5.body.bounce.y=0.2;
	droid5.body.collideWorldBounds=true;
	droid5.body.setSize(20, 32, 5, 16);
	droid5.animations.add('left', [0, 1], 10, true);
	droid5.animations.add('right', [2,3], 10, true);

	droid6 = game.add.sprite(386, 176, 'droid');
	droid6.life = 0;
	game.physics.enable(droid6, Phaser.Physics.ARCADE);
	game.physics.arcade.enable(droid6);
	droid6.body.bounce.y=0.2;
	droid6.body.collideWorldBounds=true;
	droid6.body.setSize(20, 32, 5, 16);
	droid6.animations.add('left', [0, 1], 10, true);
	droid6.animations.add('right', [2,3], 10, true);



		 // The player and its settings
	player = game.add.sprite(32, game.world.height - 150, 'dude');
	player.life = life; //adds a property to player giving him... Life!
	player.score = 0; // adds a property to player giving him a score
	game.physics.enable(player, Phaser.Physics.ARCADE);
	//Camera follows player
			   game.camera.follow(player);
	//  We need to enable physics on the player
	game.physics.arcade.enable(player);
	//  Player physics properties. Give the little guy a slight bounce.
	player.body.bounce.y = 0.2;
	player.body.collideWorldBounds = true;
  player.body.setSize(20, 32, 5, 16);
	//  Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	 player.animations.add('turn', [4], 20, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);

	cursors = game.input.keyboard.createCursorKeys();
	game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

	//Music stuff
    music = game.add.audio('backgroundMusic');

    music.play();

	stars = game.add.group();

	stars.enableBody = true;

	//  Here we'll create 12 of them evenly spaced apart
	for (var i = 0; i < 8; i++)
	{
			//  Create a star inside of the 'stars' group
			if(i==0){

			var star = stars.create(75, 592, 'star');
			}
			else if (i==1)
			{
					var star = stars.create(699, 688, 'star');
			}
			else if (i==2)
			{
					var star = stars.create(585, 960, 'star');
			}

			else if (i==3)
			{
					var star = stars.create(421, 960, 'star');
			}
			else if (i==4)
			{
					var star = stars.create(64, 176, 'star');
			}
			else if (i==5)
			{
					var star = stars.create(427, 176, 'star');
			}
			else if (i==6)
			{
					var star = stars.create(694, 240, 'star');
			}
			else if (i==7)
			{
					var star = stars.create(304, 832, 'star');
			}
			//  Let gravity do its thing
			star.body.gravity.y = 6;

			//  This just gives each star a slightly random bounce value
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}


	//Score text setup
	scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
	scoreText.fixedToCamera = true;
	//Life text set up
	lifeText = game.add.text(16, 40, 'Lives: 1', { fontSize: '32px', fill: '#fff' });
	lifeText.fixedToCamera = true;

	//  Create our Timer
    timerAidKit = game.time.create(false);
		baddyMovTimer = game.time.create(false);

    //  Set a TimerEvent to occur after x seconds&
    timerAidKit.loop(9999999*Math.random(), dropAidKit, this);
		baddyMovTimer.loop(1000,droidMovement,this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timerAidKit.start();
		baddyMovTimer.start();

		/*
			 Code for the pause menu
	 */

	 // Create a label to use as a button
	 pause_label = game.add.text(w - 100, 20, 'Pause', { fontSize: '32px', fill: '#fff' });
	 pause_label.inputEnabled = true;
	 pause_label.fixedToCamera = true;
	 pause_label.events.onInputUp.add(function () {
			 // When the pause button is pressed, we pause the game
			 game.paused = true;

			 // And a label to illustrate which menu item was chosen. (This is not necessary)
			 choiceLabel = game.add.text(w/2 - 50, h + 120, 'Click to continue', { fontSize: '30px', fill: '#fff' });
			 choiceLabel.fixedToCamera = true;
	 });

	 // Add a input listener that can help us return from being paused
	 game.input.onDown.add(unpause, self);

	 // And finally the method that handels the pause menu
	 function unpause(event){
			 // Only act if paused
			 if(game.paused){
							 // Unpause the game
							 choiceLabel.kill();
							 game.paused = false;
					 }
	 };
}


function update() {
	//Check for collisions between stuff
	 game.physics.arcade.collide(player, layer);
	 game.physics.arcade.collide(stars,layer);
	 game.physics.arcade.collide(spikes,layer);
	 game.physics.arcade.collide(firstAid,layer);
	 game.physics.arcade.collide(droid,layer);
	 game.physics.arcade.collide(droid1,layer);
	 game.physics.arcade.collide(droid2,layer);
	 game.physics.arcade.collide(droid3,layer);
	 game.physics.arcade.collide(droid4,layer);
	 game.physics.arcade.collide(droid5,layer);
	 game.physics.arcade.collide(droid6,layer);





	 //  Reset the players velocity (movement)
	player.body.velocity.x = 0;
	droid.body.velocity.x =0;
	droid1.body.velocity.x=0;
	droid2.body.velocity.x=0;
	droid3.body.velocity.x=0;
	droid4.body.velocity.x=0;
	//droid7.body.velocity.x=0;
	droid6.body.velocity.x=0;

	unTintSprite(player);//Checks if sprite is tinted in red and untints him
	killSpriteIfNoLife(player); //Checks if player life is 0, kills him if so

	if (cursors.left.isDown)
	{
			//  Move to the left
			player.body.velocity.x = -150;
			player.animations.play('left');
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
				weapons[currentWeapon].fire(player);
		}
	}
	else if (cursors.right.isDown)
	{
			//  Move to the right
			player.body.velocity.x = 150;

			player.animations.play('right');
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	 	{
	 			weapons[currentWeapon].fire(player);
	 	}
	}

	else
	{
			//  Stand still
			player.animations.stop();

			player.frame = 4;
	}

	//  Allow the player to jump if they are touching the ground.
	if (cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTimer)
	{
			player.body.velocity.y = -350;
			jumpTimer = game.time.now + 750;
	}



	//checks if player is overlapping a star
	game.physics.arcade.overlap(player, stars, collectStar, null, this);

	//checks if player is overlapping a spike
	game.physics.arcade.overlap(player, spikes, loseLife, null, this);

	//checks if player is overlapping an aidKit
	game.physics.arcade.overlap(player, firstAid, extraLife, null, this);

	//checks if player is overlapping droid
	game.physics.arcade.overlap(player,droid,loseLife,null,this);
	game.physics.arcade.overlap(player,droid1,loseLife,null,this);
	game.physics.arcade.overlap(player,droid2,loseLife,null,this);
	game.physics.arcade.overlap(player,droid3,loseLife,null,this);
	game.physics.arcade.overlap(player,droid4,loseLife,null,this);
	game.physics.arcade.overlap(player,droid5,loseLife,null,this);
	game.physics.arcade.overlap(player,droid6,loseLife,null,this);


	//checks if bullet is overlapping droid
	for (var i = 0; i < 64; i++){
			game.physics.arcade.overlap(bullets[i],droid,killEnemySprite,null,this);
			game.physics.arcade.overlap(bullets[i],droid1,killEnemySprite,null,this);
			game.physics.arcade.overlap(bullets[i],droid2,killEnemySprite,null,this);
			game.physics.arcade.overlap(bullets[i],droid3,killEnemySprite,null,this);
			game.physics.arcade.overlap(bullets[i],droid4,killEnemySprite,null,this);
			game.physics.arcade.overlap(bullets[i],droid5,killEnemySprite,null,this);
			game.physics.arcade.overlap(bullets[i],droid6,killEnemySprite,null,this);
	}

}

function collectStar (player, star) {

	// Removes the star from the screen
star.kill();
//  Add and update the score
player.score += 10;
scoreText.text = 'Score: ' + player.score;

}

function loseLife (player)
{
	if (game.time.now > lifeTimer)
	{
		lifeTimer = game.time.now + 1000;
		player.tint = 0xff0000; //Tints player in red
		//if player hits a Spike
		if (player.life <= 0)
		{
			player.kill();
			lifeText.text = 'Game over';
		}
		else {
			player.life --;
			lifeText.text = 'Lives: ' + player.life;
		}
	}
}

function killSpriteIfNoLife (sprite)
{
	if (sprite.life == 0)
	{
		sprite.kill();
	}
}

function killEnemySprite(bullets,droid)
{
	droid.kill();
	player.score += 10;
	scoreText.text = 'Score: ' + player.score;
}

function unTintSprite(sprite)
{
	if (game.time.now > lifeTimer && sprite.tint == 0xff0000)
	sprite.tint = 0xffffff; //Tints sprite to default
}



function extraLife(player,firstAid)
{
	player.life ++;
	lifeText.text = 'Lives: ' + player.life;
	firstAid.kill();
}

function dropAidKit()
{
	//Randomly creates a firstAid kit
	var aidKit = firstAid.create(Math.random() * 800,0,'aid');
	//  Let gravity do its thing
	aidKit.body.gravity.y = 9;
}

function droidMovement() {

	//	Here you'll notice we are using a relative value for the tween.
			//	You can specify a number as a string with either + or - at the start of it.
			//	When the tween starts it will take the sprites current X value and add +x to it.

	if( droid.x >= 647){
  game.add.tween(droid).to( { x: '-102' }, 4000, Phaser.Easing.Linear.None, true);}
	else if(droid.x <=555) {
		  game.add.tween(droid).to( { x: '+102' }, 4000, Phaser.Easing.Linear.None, true);
	}

	if( droid1.x >= 110
{
  game.add.tween(droid1).to( { x: '-102' }, 4000, Phaser.Easing.Linear.None, true);
}
	else if(droid1.x <=75) {
		  game.add.tween(droid1).to( { x: '+102' }, 4000, Phaser.Easing.Linear.None, true);
	}

	if( droid3.y >= 820)
	{
	game.add.tween(droid3).to( { y: '-140' }, 4000, Phaser.Easing.Linear.None, true);
	}
	else if(droid3.y <=690) {
			game.add.tween(droid3 ).to( { y: '+140' }, 4000, Phaser.Easing.Linear.None, true);
	}

	if( droid4.x >= 420){
	game.add.tween(droid4).to( { x: '-102' }, 4000, Phaser.Easing.Linear.None, true);}
	else if(droid4.x <=345) {
			game.add.tween(droid4 ).to( { x: '+102' }, 4000, Phaser.Easing.Linear.None, true);
	}

}


function render() {

  //  game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(player, 32, 500);
	//	game.debug.soundInfo(music, 20, 32);
}
