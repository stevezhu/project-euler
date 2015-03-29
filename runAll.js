var fs = require('fs');
var path = require('path');

for (var i = 1; i < 100; i++) {
	var file = './' + i + '.js';
	if (fs.existsSync(file)) {
		require(file);
	}
}
