var fs = require('fs');
var path = require('path');

var runFiles = function() {
	var dir = './';
	var files = fs.readdirSync(dir);
	var filePattern = /([0-9])+?.js/;
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		if (filePattern.test(file)) {
			require(dir + file);
		}
	}
};
runFiles();

// adds 0 to the beginning of file names
var renameFiles = function(max) {
	var digits = String(max).length;
	for (var i = 1; i < max; i++) {
		var file = './' + i + '.js';
		if (fs.existsSync(file)) {
			var numString = String(i);
			var newFile = '';
			for (var j = numString.length; j < digits; j++) {
				newFile += '0';
			}
			newFile += numString + '.js';
			console.log(newFile);
			fs.renameSync(file, newFile);
		}
	}
};
