var _ = require('lodash');
var math = require('mathjs');

self = module.exports = {
	greatestProduct: function(arr, numAdj) {
		var greatestProduct;
		for (var i = numAdj - 1, product = undefined; i < arr.length; i++) {
			var prev = arr[i - numAdj];
			var next = arr[i];
			if (prev === 0 || _.isUndefined(product)) {
				var adj = arr.slice(i - numAdj + 1, i + 1);
				product = math.prod.apply(null, adj);
			} else {
				product = product / prev * next;
			}
			if (_.isUndefined(greatestProduct) || product > greatestProduct) {
				greatestProduct = product;
			}
		}
		return greatestProduct;
	}
};
