//LoadState



var loadState = {

  preload: function(){

    //add loading label on screen
    var loadingLabel= game.add.text(80,150,'loading...',{fontSize:'30px', fill:'#ffffffff'});

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
  },

  create: function(){
    //call menu state
    game.state.start('menu');
  },

};
