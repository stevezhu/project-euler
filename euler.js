var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

var renameFiles = function(digits) {
	var dir = './';
	var files = fs.readdirSync(dir);
	var filePattern = /0*?([1-9]\d*)(1?).js/;
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var match = file.match(filePattern);
		if (match !== null) {
			var num = match[1];
			var newFile = '';
			for (var j = num.length; j < digits; j++) {
				newFile += '0';
			}
			newFile += num + '.js';
			fs.renameSync(file, newFile);
		}
	}
};

var commands = {
	run: function() {
		var dir = './';
		var files = fs.readdirSync(dir);
		var filePattern = /\d+.js/;
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			if (filePattern.test(file)) {
				require(dir + file);
			}
		}
	},
	rename: function(max) {
		renameFiles(3);
	}
};

var command = commands[argv._[0]];
if (command) {
	command();
} else {
	console.log('Invalid command. Use `run` or `rename`.');
}
