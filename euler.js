var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

var renameFiles = function(digits) {
	var files = fs.readdirSync('./'); // get all files in current dir
	var dirPattern = /problem-(0*)?(\d+)$/; // match and retrieve the problem number without leading zeroes
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var match = file.match(dirPattern);
		if (match !== null) {
			var num = match[2];
			var newDir = 'problem-';
			for (var j = num.length; j < digits; j++) { // prepend 0's
				newDir += '0';
			}
			newDir += num;
			fs.renameSync(file, newDir); // rename
		}
	}
};

var commands = {
	run: function() {
		var files = fs.readdirSync('./'); // get all files in current dir
		var dirPattern = /problem-\d+/; // match all problem-* directories
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			if (dirPattern.test(file)) {
				require(path.resolve('./', file, 'run.js')); // run the file if match success
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
