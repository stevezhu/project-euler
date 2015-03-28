var fs = require('fs');
var path = require('path');

for (var i = 1; i < 100; i++) {
	var file = path.resolve('./' + i + '.js');
	if (fs.existsSync(file)) {
		require(file);
	}
}
