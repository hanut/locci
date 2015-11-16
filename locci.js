/*
* Locci.js is a simple NodeJS based LOC counter
* script that will return the number of lines
* of code inside code files in the given folder
* and all subdirectories.
* Without any params it will look for the
* following file types -
* .php,.py,.html,.jade,.js,.java etc.
*
* @author Hanut Singh <hanut@koresoft.in>
*/

//Include dependencies and init variables
var fs = require('fs');
var files = [];
var fCount = 0;
var lCount = 0;

start();

function start(customPath){
  console.log("Started...");
  var path = customPath || "./";
  fs.readdirSync(path,function(err,files){
    console.log("getting folders...");
    console.log(err);
    console.log(files);
  });
}