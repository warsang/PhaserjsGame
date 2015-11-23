//Bootstate


var bootState = {

  create : function(){
  //  We're going to be using physics, so enable the Arcade Physics system
     game.physics.startSystem(Phaser.Physics.ARCADE);



    //Calling the load startSystem
    game.state.start('load');
  },
};
