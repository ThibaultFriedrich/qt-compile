var path = require('path');
var chai = require('chai');
var expect = chai.expect;

var findExecname = require('../src/find-execname');
describe('find execname', function () {

    it('hello-world', function (done) {
        var pro = path.join(__dirname, '../examples/hello-world/hello-world.pro');

        findExecname(pro, function (err, name) {
            expect(err).to.be.null;
            expect(name).to.be.equal('hello-world');
            done();
        });
    });

});
