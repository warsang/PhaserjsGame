/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var waterlock = require('waterlock');
 module.exports = waterlock.waterlocked({
	restricted:function(req,res){
		return res.ok("If You can see this you are authenticated");
	},
	open:function(req,res){
		return res.ok("This is open to all!!!");
	},
	loginpost:function(req,res){
		var params = req.body;
		console.log(req.body);
		var criteria = {
				password: params.password,
				email: params.email
		};
		console.log(criteria);
		waterlock.engine.findAuth(criteria, function(err, user) {
			console.log(err, user);
				if (user) {
					return console.log("Youhou, logged in !");
				} else {
					return res.badRequest("Bad credentials :()");
				}
		});
		//return res.render('auth/login');
	}
});
