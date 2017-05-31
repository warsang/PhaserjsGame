Small javascript game based on phaser framework. This project was supposed to be a teaser game. However it was not finished by lack of time.

It does not work with sails latest version, you should probably install something before sails 0.10

**Overview:**

MVC architecture:

* Views: All .ejs files are in it

* gruntfile.js: All grunt applications. Grunt allows to install many modules which will facilitate development

* Controlles:Here are most of the important nodejs files. route.js allows to route all .ejs files . Please refer to [sails documentation ](http://www.programwitherik.com/five-tips-when-working-with-routes-on-sails-js/ )for routing types. 

* Assets: Contains basic images and js files


To run:

    sails lift