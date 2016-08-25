var os = require('os');
var path = require('path');
var fs = require('fs-extra');
var windowsQtCompile = require('./windows-qt-compile');
var callsite = require('callsite');


module.exports = function (opts, callback) {

    var previousCwd = process.cwd();

    var stack = callsite();
    var dirname = path.dirname(requester = stack[1].getFileName());

    if (undefined === opts) {
        opts = {};
    }

    if (undefined === opts.clean) {
        opts.clean = true;
    }

    if (undefined === opts.verbose) {
        opts.verbose = false;
    }

    if (undefined === opts.qmakeArgs) {
        opts.qmakeArgs = '';
    }

    if (undefined === opts.debug) {
        opts.debug = false;
    }

    if (undefined === opts.src) {
        callback && callback(new Error('missing argument "src"'));
        return;
    }

    if (!path.isAbsolute(opts.src)) {
        opts.src = path.join(dirname, opts.src);
    }

    if (undefined === opts.dest) {
        opts.dest = 'build';
    }

    if (!path.isAbsolute(opts.dest)) {
        opts.dest = path.join(dirname, opts.dest);
    }



    if (opts.clean) {
        fs.emptyDirSync(opts.dest);
    } else {
        fs.ensureDirSync(opts.dest);
    }

    process.chdir(opts.dest);


    if ('win32' === os.platform()) {
        windowsQtCompile(opts, function (err, execname) {
            process.chdir(previousCwd);
            callback(err, execname);
        });
    } else {
        console.error(new Error('The os '+os.platform()+' is not managed for now.'));
    }
};
