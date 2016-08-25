var path = require('path');
var fs = require('fs-extra');
var chai = require('chai');
var expect = chai.expect;
var os = require('os');

if ('win32' === os.platform()) {

    var windowsQtCompile = require('../src/qt-compile');

    process.env.QMAKE_PATH = 'C:\\Qt\\Qt5.4.1\\5.4\\msvc2010_opengl\\bin';
    process.env.JOM_PATH = 'C:\\Qt\\Qt5.4.1\\Tools\\QtCreator\\bin'
    process.env.VCVARSALL_PATH = 'C:\\Program Files (x86)\\Microsoft Visual Studio 10.0\\VC';

    describe('compile', function () {
        this.timeout(10000);
        describe('hello-world', function () {

            it('absolute path src', function (done) {
                fs.removeSync(path.join(__dirname, 'build'));
                windowsQtCompile({
                    src: path.join(__dirname, '../examples/hello-world/hello-world.pro'),
                    dest: 'build'
                }, function (err, execname) {
                    expect(err).to.be.null;
                    var referenceName = path.join(__dirname, 'build/release/hello-world.exe');
                    //expect(execname).to.be.equal(referenceName);
                    fs.access(referenceName, fs.R_OK, function (err) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });
            it('relative path src', function (done) {
                fs.removeSync(path.join(__dirname, 'build'));
                windowsQtCompile({
                    src: '../examples/hello-world/hello-world.pro',
                    dest: 'build'
                }, function (err, execname) {
                    expect(err).to.be.null;
                    var referenceName = path.join(__dirname, 'build/release/hello-world.exe');
                    //expect(execname).to.be.equal(referenceName);
                    fs.access(referenceName, fs.R_OK, function (err) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            it('absolute path dest', function (done) {
                fs.removeSync(path.join(__dirname, 'build'));
                windowsQtCompile({
                    src: path.join(__dirname, '../examples/hello-world/hello-world.pro'),
                    dest: path.join(__dirname, 'build')
                }, function (err, execname) {
                    expect(err).to.be.null;
                    var referenceName = path.join(__dirname, 'build/release/hello-world.exe');
                    //expect(execname).to.be.equal(referenceName);
                    fs.access(referenceName, fs.R_OK, function (err) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            it('relative path dest', function (done) {
                fs.removeSync(path.join(__dirname, 'build'));
                windowsQtCompile({
                    src: path.join(__dirname, '../examples/hello-world/hello-world.pro'),
                    dest: 'build'
                }, function (err, execname) {
                    expect(err).to.be.null;
                    var referenceName = path.join(__dirname, 'build/release/hello-world.exe');
                    //expect(execname).to.be.equal(referenceName);
                    fs.access(referenceName, fs.R_OK, function (err) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            it('build already exists', function (done) {
                fs.removeSync(path.join(__dirname, 'build'));
                fs.ensureDirSync(path.join(__dirname, 'build'));
                var already = path.join(__dirname, 'build/already.txt');
                fs.writeFileSync(already, 'here');
                windowsQtCompile({
                    src: path.join(__dirname, '../examples/hello-world/hello-world.pro'),
                    dest: 'build',
                    clean: false
                }, function (err, execname) {
                    expect(err).to.be.null;
                    var referenceName = path.join(__dirname, 'build/release/hello-world.exe');
                    //expect(execname).to.be.equal(referenceName);
                    fs.access(referenceName, fs.R_OK, function (err) {
                        expect(err).to.be.null;
                        fs.access(already, fs.R_OK, function (err) {
                            expect(err).to.be.null;
                            done();
                        });
                    });
                });
            });

            it('build doesn\'t already exists', function (done) {
                fs.removeSync(path.join(__dirname, 'build'));
                windowsQtCompile({
                    src: path.join(__dirname, '../examples/hello-world/hello-world.pro'),
                    dest: 'build',
                    clean: false
                }, function (err, execname) {
                    expect(err).to.be.null;
                    var referenceName = path.join(__dirname, 'build/release/hello-world.exe');
                    //expect(execname).to.be.equal(referenceName);
                    fs.access(referenceName, fs.R_OK, function (err) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

            it('clean with build already exists', function (done) {
                fs.removeSync(path.join(__dirname, 'build'));
                fs.ensureDirSync(path.join(__dirname, 'build'));
                var already = path.join(__dirname, 'build/already.txt');
                fs.writeFileSync(already, 'here');
                windowsQtCompile({
                    src: path.join(__dirname, '../examples/hello-world/hello-world.pro'),
                    dest: 'build',
                    clean: true
                }, function (err, execname) {
                    expect(err).to.be.null;
                    var referenceName = path.join(__dirname, 'build/release/hello-world.exe');
                    //expect(execname).to.be.equal(referenceName);
                    fs.access(referenceName, fs.R_OK, function (err) {
                        expect(err).to.be.null;
                        fs.access(already, fs.R_OK, function (err) {
                            expect(err).to.be.not.null;
                            done();
                        });
                    });
                });
            });

            it('clean with build doesn\'t already exists', function (done) {
                fs.removeSync(path.join(__dirname, 'build'));
                windowsQtCompile({
                    src: path.join(__dirname, '../examples/hello-world/hello-world.pro'),
                    dest: 'build',
                    clean: true
                }, function (err, execname) {
                    expect(err).to.be.null;
                    var referenceName = path.join(__dirname, 'build/release/hello-world.exe');
                    //expect(execname).to.be.equal(referenceName);
                    fs.access(referenceName, fs.R_OK, function (err) {
                        expect(err).to.be.null;
                        done();
                    });
                });
            });

        });
    });

}
