//menuState

var menuState = {

  create : function(){
    var nameLabel = game.add.text(80,80, 'Menu',{fontSize:'50px',fill: '#ffffffff'});

    var startLabel = game.add.text(80,80, 'Press w to start!',{fontSize:'50px',fill: '#ffffffff'});

    var wkey = game.input.keyboard.addKey(Phaser.keyboard.W);

    wkey.onDown.addOnce(this.start,this);
},
    start: function(){
    alert.window('hello');
    },

};
