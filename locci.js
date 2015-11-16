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

//Get runtime arguments
var args = process.argv;
args.shift();args.shift();

//Include dependencies and init variables
var glob = require('glob');
var files = [];
var ftypes = args[1] ? args[1].split(",") : ["php","js","py","jade","java","html"];
var lCount = 0;
var path = args[0] ? args[0]+"**/*." : "**/*.";

// console.log(ftypes);
// console.log(path);

//Start the processing
start();

function start(){
  findFiles(ftypes);
  console.log(files);
}

function findFiles(ftypes){
  for(var i=0,len=ftypes.length;i<len;i++){
    try{
      //Find all files of i-th file type
      var fileList = glob.sync(path+ftypes[i]);

      if(!fileList || typeof fileList === "undefined"){
        console.log("No ."+ftype[i]+" files found.");
        continue;
      }else{
        console.log("Total File Count: "+files.length);
        files.push.apply(files, fileList);
      }
    }catch(e){
      console.log("Invalid Path");
      process.exit(0);
    }
  }
}

