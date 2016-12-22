/*
	Factorial digit sum

	n! means n × (n − 1) × ... × 3 × 2 × 1

	For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
	and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

	Find the sum of the digits in the number 100!
 */

const utils = require('../lib/utils');
const BigNumber = require('bignumber.js');

let self = module.exports = {
	problemNumber: 20,
	description: 'Sum of the digits in the number 100!',
	answer: 648,
	given: [100],
	solutions: {
		'brute force': {
			fn: (function() {
				let factorial = function(n) {
					let product = new BigNumber(1);
					for (let i = 2; i <= n; i++) {
						product = product.mul(i);
					}
					return product;
				};
				return function(n) {
					let factorialString = factorial(n).toFixed();
					let sum = 0;
					for (let i = 0; i < factorialString.length; i++) {
						let digit = parseInt(factorialString[i]);
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