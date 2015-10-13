//  The core game loop

    var PhaserGame = function () {

        this.background = null;
        this.foreground = null;

        this.player = null;
        this.cursors = null;
        this.speed = 300;

        this.weapons = [];
        this.currentWeapon = 0;
        this.weaponName = null;

    };

    PhaserGame.prototype = {

        init: function () {

            this.game.renderer.renderSession.roundPixels = true;

            this.physics.startSystem(Phaser.Physics.ARCADE);

        },

        preload: function () {

				 game.load.tilemap('level1', '../images/level1.json', null, Phaser.Tilemap.TILED_JSON);
				 game.load.image('tiles-1', '../images/tiles-1.png');
				 game.load.spritesheet('droid', '../images/droid.png', 32, 32);
				 game.load.spritesheet('dude', '../images/dude.png', 32, 48);
					//  game.load.image('starSmall', '../images/star.png');
					//  game.load.image('starBig', '../images/star2.png');
					game.load.image('fireBullet','../images/fire.png')
					game.load.image('star', '../images/star.png');
					game.load.image('spikes','../images/spikes.png');
					game.load.image('aid','../images/firstaid.png');
					game.load.image('background', '../images/background2.png');
					//  Firefox doesn't support mp3 files, so use ogg
					game.load.audio('backgroundMusic', ['../audio/music1.mp3', '../audio/music1.ogg']);

            //  We need this because the assets are on Amazon S3
            //  Remove the next 2 lines if running locally
            this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue007/';
            this.load.crossOrigin = 'anonymous';

            this.load.image('background', 'assets/back.png');
            this.load.image('foreground', 'assets/fore.png');
            this.load.image('player', 'assets/ship.png');
            this.load.bitmapFont('shmupfont', 'assets/shmupfont.png', 'assets/shmupfont.xml');

            for (var i = 1; i <= 11; i++)
            {
                this.load.image('bullet' + i, 'assets/bullet' + i + '.png');
            }

            //  Note: Graphics are not for use in any commercial project

        },

        create: function () {

            this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
            this.background.autoScroll(-40, 0);

            this.weapons.push(new Weapon.SingleBullet(this.game));
            this.weapons.push(new Weapon.FrontAndBack(this.game));
            this.weapons.push(new Weapon.ThreeWay(this.game));
            this.weapons.push(new Weapon.EightWay(this.game));
            this.weapons.push(new Weapon.ScatterShot(this.game));
            this.weapons.push(new Weapon.Beam(this.game));
            this.weapons.push(new Weapon.SplitShot(this.game));
            this.weapons.push(new Weapon.Pattern(this.game));
            this.weapons.push(new Weapon.Rockets(this.game));
            this.weapons.push(new Weapon.ScaleBullet(this.game));
            this.weapons.push(new Weapon.Combo1(this.game));
            this.weapons.push(new Weapon.Combo2(this.game));

            this.currentWeapon = 0;

            for (var i = 1; i < this.weapons.length; i++)
            {
                this.weapons[i].visible = false;
            }

            this.player = this.add.sprite(64, 200, 'player');

            this.physics.arcade.enable(this.player);

            this.player.body.collideWorldBounds = true;

            this.foreground = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'foreground');
            this.foreground.autoScroll(-60, 0);

            this.weaponName = this.add.bitmapText(8, 364, 'shmupfont', "ENTER = Next Weapon", 24);

            //  Cursor keys to fly + space to fire
            this.cursors = this.input.keyboard.createCursorKeys();

            this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

            var changeKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            changeKey.onDown.add(this.nextWeapon, this);

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
							 player.animations.add('turplayern', [4], 20, true);
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
								this.weapons.push((new Weapon.SingleBullet(this.game)));

        },

        nextWeapon: function () {

            //  Tidy-up the current weapon
            if (this.currentWeapon > 9)
            {
                this.weapons[this.currentWeapon].reset();
            }
            else
            {
                this.weapons[this.currentWeapon].visible = false;
                this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
                this.weapons[this.currentWeapon].setAll('exists', false);
            }

            //  Activate the new one
            this.currentWeapon++;

            if (this.currentWeapon === this.weapons.length)
            {
                this.currentWeapon = 0;
            }

            this.weapons[this.currentWeapon].visible = true;

            this.weaponName.text = this.weapons[this.currentWeapon].name;

        },

        update: function () {

            this.player.body.velocity.set(0);

            if (this.cursors.left.isDown)
            {
                this.player.body.velocity.x = -this.speed;
            }
            else if (this.cursors.right.isDown)
            {
                this.player.body.velocity.x = this.speed;
            }

            if (this.cursors.up.isDown)
            {
                this.player.body.velocity.y = -this.speed;
            }
            else if (this.cursors.down.isDown)
            {
                this.player.body.velocity.y = this.speed;
            }

            if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                this.weapons[this.currentWeapon].fire(this.player);
            }

        }

    };

    game.state.add('Game', PhaserGame, true);
