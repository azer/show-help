var path = require('path');
var packagePath = require("package-path").sync;
var lookup = require('./lookup');

var fs = require('fs');
var readFile = fs.readFileSync;
var exists  = fs.existsSync;

module.exports = showHelp;

function findFilename (options) {
  var i = -1;
  var len = lookup.length;
  var root = packagePath(options.parentFilename || module.parent.filename);
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

function man (options) {
  if (!options.filename) {
    options.filename = findFilename(options);
  }

  if (!options.filename) return '';

  return format(read(options.filename));
}

function read (filename) {
  return readFile(filename).toString();
}

function showHelp (options) {
  typeof options == 'string' && (options = { filename: options });
  options || (options = {});

  console.log(!options.transform ? man(options) : options.transform(man(options)));
  process.exit();
}
