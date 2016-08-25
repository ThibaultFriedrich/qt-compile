# qt-compile
Module to easily compile qt from nodejs.

For now, it manages :

* qt with MSVC 2010 on windows


## Install

```javascript
npm install qt-compile
```

## Getting started

Setup the environment variables for MSVC 2010

* QMAKE_PATH
* JOM_PATH
* VCVARSALL_PATH

```javascript

var qtCompile = require('qt-compile');


qtCompile({
    clean: true, // default true
    debug: false, // default false
    qmakeArgs: '...', // default ''
    verbose: false, // default false
    src: <path file .pro>,
    dest: <path of the exec, // default '.'
}, function (err) {

});



```
