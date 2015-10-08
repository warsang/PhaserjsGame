/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
 /**
  * Allow any authenticated user.
  */
 /*module.exports = function (req, res, next) {

   // User is allowed, proceed to controller
   var is_auth = req.isAuthenticated()
   if (is_auth) return next();
   // User is not allowed
   else return res.redirect("/login");
 };
*/
 /**
  * Policy Mappings
  * (sails.config.policies)
  *
  * Policies are simple functions which run **before** your controllers.
  * You can apply one or more policies to a given controller, or protect
  * its actions individually.
  *
  * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
  * below by its filename, minus the extension, (e.g. "authenticated")
  *
  * For more information on configuring policies, check out:
  * http://sailsjs.org/#!documentation/
  */


 module.exports.policies = {

   '*': true,
   PostController:{
   	restricted:['sessionAuth'],
   	open:true
   }
 };
