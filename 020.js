/*
	Factorial digit sum

	n! means n × (n − 1) × ... × 3 × 2 × 1

	For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
	and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

	Find the sum of the digits in the number 100!
 */

var utils = require('lib/utils.js');
var BigNumber = require('bignumber.js');

var self = module.exports = {
	problemNumber: 20,
	description: 'Sum of the digits in the number 100!',
	answer: 648,
	given: [100],
	solutions: {
		'brute force': {
			fn: (function() {
				var factorial = function(n) {
					var product = new BigNumber(1);
					for (var i = 2; i <= n; i++) {
						product = product.mul(i);
					}
					return product;
				};
				return function(n) {
					var factorialString = factorial(n).toFixed();
					var sum = 0;
					for (var i = 0; i < factorialString.length; i++) {
						var digit = parseInt(factorialString[i]);
						sum += digit;
					}
					return sum;
				};
			})()
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);