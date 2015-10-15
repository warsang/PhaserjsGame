var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

function preload() {
	game.load.tilemap('level1', '../images/level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles-1', '../images/tiles-1.png');
		game.load.spritesheet('droid', '../images/droid.png', 32, 32);
		game.load.spritesheet('dude', '../images/dude.png', 32, 48);
	//  game.load.image('starSmall', '../images/star.png');
	//  game.load.image('starBig', '../images/star2.png');
	 game.load.image('star', '../images/star.png');
	 game.load.image('spikes','../images/spikes.png');
	 game.load.image('aid','../images/firstaid.png');
	 game.load.image('background', '../images/background2.png');
	 //  Firefox doesn't support mp3 files, so use ogg
	game.load.audio('backgroundMusic', ['../audio/music1.mp3', '../audio/music1.ogg']);
}

var score = 0;
var scoreText;
var life = 5;
var lifeText;
var map;
var tileset;
var layer;
var player;
var droid;
var facing = 'left';
var jumpTimer = 0;
var timerAidKit;
var cursors;
var bg;
var baddyMovTimer;
var music;

function create() {
	//  We're going to be using physics, so enable the Arcade Physics system
		 game.physics.startSystem(Phaser.Physics.ARCADE);

// Black
		 game.stage.backgroundColor = '#000000';
//Tile for bg
		bg = game.add.tileSprite(0, 0, 800, 600, 'background');
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
		 game.physics.enable(droid, Phaser.Physics.ARCADE);
		 game.physics.arcade.enable(droid);
		 droid.body.bounce.y=0.2;
		 droid.body.collideWorldBounds=true;
		 droid.body.setSize(20, 32, 5, 16);
		 droid.animations.add('left', [0, 1], 10, true);
		 droid.animations.add('right', [2,3], 10, true);





		 // The player and its settings
	player = game.add.sprite(32, game.world.height - 150, 'dude');
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

	//Music stuff
		music = game.add.audio('backgroundMusic');

		music.play();

	stars = game.add.group();

	stars.enableBody = true;

	//  Here we'll create 12 of them evenly spaced apart
	for (var i = 0; i < 12; i++)
	{
			//  Create a star inside of the 'stars' group
			var star = stars.create(i * 70, 0, 'star');

			//  Let gravity do its thing
			star.body.gravity.y = 6;

			//  This just gives each star a slightly random bounce value
			star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	//Score text setup
	scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
	scoreText.fixedToCamera = true;
	//Life text set up
	lifeText = game.add.text(16, 40, 'Lives: 5', { fontSize: '32px', fill: '#fff' });
	lifeText.fixedToCamera = true;

	//  Create our Timer
		timerAidKit = game.time.create(false);
		baddyMovTimer = game.time.create(false);

		//  Set a TimerEvent to occur after x seconds
		timerAidKit.loop(150000*Math.random(), dropAidKit, this);
		baddyMovTimer.loop(1000,droidMovement,this);

		//  Start the timer running - this is important!
		//  It won't start automatically, allowing you to hook it to button events and the like.
		timerAidKit.start();
		baddyMovTimer.start();
}


function update() {
	//Check for collisions between stuff
	 game.physics.arcade.collide(player, layer);
	 game.physics.arcade.collide(stars,layer);
	 game.physics.arcade.collide(spikes,layer);
	 game.physics.arcade.collide(firstAid,layer);
	 game.physics.arcade.collide(droid,layer);


	 //  Reset the players velocity (movement)
	player.body.velocity.x = 0;
	droid.body.velocity.x =0;

	if (cursors.left.isDown)
	{
			//  Move to the left
			player.body.velocity.x = -150;

			player.animations.play('left');
	}
	else if (cursors.right.isDown)
	{
			//  Move to the right
			player.body.velocity.x = 150;

			player.animations.play('right');
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
}

function collectStar (player, star) {

	// Removes the star from the screen
star.kill();

//  Add and update the score
score += 10;
scoreText.text = 'Score: ' + score;

}

function loseLife (player)
{
	//if player hits a Spike
if (life <= 0)
{
	player.kill();
		lifeText.text = 'Game over';
}
else {
	life --;
	lifeText.text = 'Lives: ' + life;
}
}

function extraLife(player,firstAid)
{
	life ++;
	lifeText.text = 'Lives: ' + life;
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

	if( droid.x >= 647)
	game.add.tween(droid).to( { x: '-102' }, 4000, Phaser.Easing.Linear.None, true);
	else if(droid.x <=555) {
			game.add.tween(droid).to( { x: '+102' }, 4000, Phaser.Easing.Linear.None, true);
	}
}

/*function changeVolume(pointer) {

		if (pointer.y < 100)
		{
				music.mute = false;
		}
		else if (pointer.y < 300)
		{
				music.volume += 0.1;
		}
		else
		{
				music.volume -= 0.1;
		}

}*/

function render() {

		game.debug.cameraInfo(game.camera, 32, 32);
		game.debug.spriteCoords(player, 32, 500);
		game.debug.soundInfo(music, 20, 32);
}


/* FONCTION CHANGER DE MAP -- Voir classe Map

if(joueur.x < 0 || joueur.y < 0 || joueur.x > 14 || joueur.y > 14) {

  switch(joueur.direction) {
    case DIRECTION.BAS :
      nom = "map";
      num += 4;
      nom += num;
      map = new Map(nom);
      coordx = joueur.x;
      coordy = 0;
      break;
    case DIRECTION.GAUCHE :
      nom = "map";
      num--;
      nom += num;
      map = new Map(nom);
      coordx = 14;
      coordy = joueur.y;
      break;
    case DIRECTION.DROITE :
      nom = "map";
      num++;
      nom += num;
      map = new Map(nom);
      coordx = 0;
      coordy = joueur.y;
      break;
    case DIRECTION.HAUT :
      nom = "map";
      num -= 4;
      nom += num;
      map = new Map(nom);
      coordx = joueur.x;
      coordy = 14;
      break;
    default :
      break;
  }

  joueur = new perso("joueur.png", coordx, coordy, direction, vie, argent);
  map.addPerso(joueur);
}
*/
