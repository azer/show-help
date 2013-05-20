var firstVal = require("first-val"),
    readFile = require('fs').readFileSync,
    exists   = require("fs").existsSync,
    puts     = require('util').puts,
    join     = require('path').join,
    lookup   = require('./lookup');

module.exports = showHelp;

function findFilename(){
  var result;

  lookup
    .map(function(filename){
      return join(__dirname, '../../', filename);
    })
    .some(function(filename){
      if(!exists(filename)) return false;

      result = filename;
      return true;
    });

  return result;
}

function format(content){
  content = content
    .split('\n')
    .map(function(line){
      return '  ' + line;
    })
    .join('\n');

  return '\n' + content;
}

function man(){
  var filename;

  if( ! ( filename = findFilename() ) ) return '';

  return format(readFile(filename).toString());
}

function showHelp(){
  process.stdout.write('\u001B[2J\u001B[0;0f');

  puts(man());
  process.exit();
}

showHelp();
