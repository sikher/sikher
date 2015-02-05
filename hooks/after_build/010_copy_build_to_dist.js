#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

console.log('argv', process.argv)
console.log('env', process.env);
 
var rootdir = process.argv[2];
var dist_dir = path.join(rootdir, 'dist');

var build_files = [
	[path.join(rootdir, 'platforms/android/ant-build/CordovaApp-debug.apk'), path.join(dist_dir, 'Sikher-debug.apk')]
]

build_files.forEach(function(val, index, array) {
	fs.createReadStream(val[0]).pipe(fs.createWriteStream(val[1]));
});