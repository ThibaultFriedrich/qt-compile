var fs = require('fs');


module.exports = function (pro, callback) {

    fs.readFile(pro, 'utf8', function (err, content) {
        if (err) {
            callback && callback(err);
            return;
        }

        var match = content.match(/TARGET[ ]*=[ ]*([a-zA-Z0-9_-]+)[ ]*[\r\n]+/);

        if (match && match[1]) {
            callback && callback (null, match[1]);
        }

    });
}
