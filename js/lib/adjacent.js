const _ = require('lodash');
const math = require('mathjs');

let self = module.exports = {
	/**
	 * Find the greatest product of the given number of ajacent values in an array
	 */
	greatestProduct: function(arr, numAdj) {
		let greatestProduct;
		for (let i = numAdj - 1, product = undefined; i < arr.length; i++) {
			let prev = arr[i - numAdj];
			let next = arr[i];
			if (prev === 0 || _.isUndefined(product)) {
				let adj = arr.slice(i - numAdj + 1, i + 1);
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
