#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var cmd_args = /release/gi;

if(cmd_args.test(process.env.CORDOVA_CMDLINE))
{
	var rootdir = process.argv[2];
	var dist_dir = path.join(rootdir, '../sikher-dist');
	var build_files = [
		[path.join(rootdir, 'platforms/android/build/outputs/apk/android-release-unsigned.apk'), path.join(dist_dir, 'Sikher-android.apk')]
	]

	build_files.forEach(function(val, index, array) {
		fs.createReadStream(val[0]).pipe(fs.createWriteStream(val[1]));
		console.log('Successfully copied', val[0], 'to', val[1])
	});
}
else
{
	console.error('\nIf you want a copy of the build files in /dist then you must specify the --release flag when building e.g. cordova build --release');
}
