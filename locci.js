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
var exec = require('child_process').exec;
var glob = require('glob');
var files = [];
var ftypes = args[1] ? args[1].split(",") : ["php","js","py","jade","java","html"];
var lCounts = [];
var path = args[0] ? args[0]+"**/*." : "**/*.";

//Start the processing
start();

function start(){
  findFiles(ftypes);
  countLines();
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
        files.push.apply(files, fileList);
      }
    }catch(e){
      console.log("Invalid Path");
      process.exit(0);
    }
  }
}

function countLines(){
  for(var i=0,len=files.length;i<len;i++){
    exec("wc -l "+files[i], function(error, stdout, stderr) {
      console.log();
      lCounts.push(parseInt(stdout.split(" ")[0]));
      if(lCounts.length === files.length){
        onFinish();
      }
    });
  }
}

function onFinish(){
  var total = function(){
    var tmp=0;
    for(var i=0,len=lCounts.length;i<len;i++){
      tmp += lCounts[i];
    }
    return tmp;
  }();
  console.log("---------------------------------");
  console.log("Total File Count: "+files.length);
  console.log("---------------------------------");
  console.log("Total Lines Count: "+total);
}