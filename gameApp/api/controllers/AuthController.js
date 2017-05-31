/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: Provides the base authentication
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').waterlocked({
  register: function(req, res) {
         var params = req.body,
                         def = waterlock.Auth.definition,
                         criteria = { },
                         scopeKey = def.email !== undefined ? 'email' : 'username';
console.log("scopeKey", scopeKey);
         var attr = {
             email: params.email,
             password: params.password
         };
         attr[scopeKey] = params[scopeKey];
         criteria[scopeKey] = attr[scopeKey];

         waterlock.engine.findAuth(criteria, function(err, user) {
             if (user) {
                 return res.badRequest("User already exists");
             }
             else if (err) { console.log("error: " + err);}
             else {
                 waterlock.engine.findOrCreateAuth(criteria, attr, function(err, user) {
                     if (err) {
                         return res.badRequest(err);
                     }
                     delete user.password;
                     return res.ok(user);
                 });
             }
         });
     },
     login:function(req,res){
       return res.render('auth/login');
     }

});
