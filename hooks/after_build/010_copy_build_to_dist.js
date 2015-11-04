#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cmd_args = /release/gi;
var rootdir = process.argv[2];
var dist_dir = path.join(rootdir, '../sikher-dist');

if(cmd_args.test(process.env.CORDOVA_CMDLINE))
{
	console.log('Copying production release to '+dist_dir+'\n');
	var build_files = [
		[path.join(rootdir, 'platforms/android/build/outputs/apk/android-release-unsigned.apk'), path.join(dist_dir, 'android-release-unsigned.apk')]
	]

	build_files.forEach(function(val, index, array) {
		fs.createReadStream(val[0]).pipe(fs.createWriteStream(val[1]));
		console.log('Successfully copied', val[0], 'to', val[1]);
	});
}
else
{
	console.log('\nCopying debug release to '+dist_dir);
	console.log('If you want a production release then you must specify the --release flag when building e.g. cordova build --release\n');

	var build_files = [
		[path.join(rootdir, 'platforms/android/build/outputs/apk/android-debug.apk'), path.join(dist_dir, 'android-debug.apk')]
	]

	build_files.forEach(function(val, index, array) {
		fs.createReadStream(val[0]).pipe(fs.createWriteStream(val[1]));
		console.log('Successfully copied', val[0], 'to', val[1]);
	});
}
