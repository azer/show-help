## show-help

Outputs help for parent package and exits. See Also: [show-version](http://github.com/azer/show-version)

## Install

```bash
$ npm install show-help
```

## Usage

```js
if(argv.help) require('show-help')();
```

Will show the content of first found file from the [lookup paths](#lookup).

## Options

```js
require('show-help')({
  filename: 'doc.md',
  transform: parseMarkdown
});
```

![](https://dl.dropboxusercontent.com/s/ctqwvswr8l2fn7m/npmel_26.jpg)
