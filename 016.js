/*
	Power digit sum

	2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

	What is the sum of the digits of the number 2^1000?
 */

var utils = require('lib/utils.js');
var BigNumber = require('bignumber.js');

var self = module.exports = {
	problemNumber: 16,
	description: 'Sum of the digits of the number 2^1000',
	answer: 1366,
	given: [2, 1000],
	solutions: {
		'brute force': {
			fn: function(base, exponent) {
				var product = new BigNumber(1);
				for (var i = 0; i < exponent; i++) {
					product = product.mul(base);
				}
				product = product.toFixed(); // string

				var sum = 0;
				for (var i = 0; i < product.length; i++) {
					sum += parseInt(product[i]);
				}
				return sum;
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
