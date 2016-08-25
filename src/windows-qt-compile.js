var fs = require('fs-extra');
var path = require('path');
var util = require('util');
var exec = require('child_process').exec;
var qmake = require('./qmake');
var findExecname = require('./find-execname');
var maxBuffer = 1024 * 1024 * 1024;


module.exports = function (opts, callback) {

    if(!process.env.QMAKE_PATH) {
        callback && callback(new Error('Environment variable QMAKE_PATH undefined'));
        return;
    }

    if(!process.env.JOM_PATH) {
        callback && callback(new Error('Environment variable JOM_PATH undefined'));
        return;
    }

    if(!process.env.VCVARSALL_PATH) {
        callback && callback (new Error('Environment variable VCVARSALL_PATH undefined'));
        return;
    }

    qmake(
        path.join(process.env.QMAKE_PATH, 'qmake.exe'),
        opts.qmakeArgs,
        opts.src,
        '-r -spec win32-msvc2010',
        opts.debug,
        function (err) {
            if(err) {
                callback && callback(err);
                return;
            }
            if (opts.verbose) {
                console.log('qmake done');
            }

            var new_env = util._extend(process.env, {LANG: "en"});
            var vcvarsall = path.join(process.env.VCVARSALL_PATH, 'vcvarsall.bat');
            var jom = path.join(process.env.JOM_PATH, 'jom.exe');
            var cmd = '"'+vcvarsall+'" x86 && "'+jom+'"';
            exec(cmd, {env: new_env, maxBuffer: maxBuffer}, function (err, stdout, stderr) {
                if (err) {
                    callback && callback(err);
                    return;
                }

                callback && callback(null);
                /*

                findExecname(opts.src, function (err, execname) {
                    if (err) {
                        callback && callback(err);
                    } else {
                        var execname = path.join(opts.dest, (opts.debug?'debug':'release'), execname)+'.exe';
                        callback && callback(null, execname);
                    }
                })*/
            });

    });

}
