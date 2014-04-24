var path = require('path');
var packagePath = require("package-path").sync;
var lookup = require('./lookup');

var fs = require('fs');
var readFile = fs.readFileSync;
var exists  = fs.existsSync;

module.exports = showHelp;

function findFilename (parentFilename) {
  var i = -1;
  var len = lookup.length;
  var root = packagePath(parentFilename || module.parent.filename);
  var filename;

  while (++i < len) {
    filename = path.join(root, lookup[i]);
    if (!exists(filename)) continue;
    return filename;
  }
}

function format (content) {
  content = content.split('\n').map(tab).join('\n');
  return '\n' + content;
}

function tab (line) {
  return '  ' + line;
}

function man (dir) {
  var filename;
  if (!(filename = findFilename(dir))) return '';
  return format(read(filename));
}

function read (filename) {
  return readFile(filename).toString();
}

function showHelp (dir, transform) {
  console.log(!transform ? man(dir) : transform(man(dir)));
  process.exit();
}
