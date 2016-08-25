var process = require('process');
var util = require('util');
var exec = require('child_process').exec;

var maxBuffer = 1024 * 1024 * 1024;

module.exports = function (qmake, args, pro, opts, debug, callback) {

    var cmd = '"'+qmake+'" '+pro+' '+opts+' '+(debug?' CONFIG+=debug ':'')+' '+args;
    var new_env = util._extend(process.env, { LANG: "en" });
    exec(cmd, {env: new_env, maxBuffer: maxBuffer}, function (err, stdout, stderr) {
        if (err !== null) {
            callback && callback(err);
            return;
        } else {
            callback && callback(null);
        }
    });

}
