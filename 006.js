/*
	Sum square difference

	The sum of the squares of the first ten natural numbers is,

		1^2 + 2^2 + ... + 10^2 = 385

	The square of the sum of the first ten natural numbers is,

		(1 + 2 + ... + 10)^2 = 552 = 3025

	Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.

	Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.
 */

var utils = require('lib/utils.js');

var self = module.exports = {
	problemNumber: 6,
	description: 'Difference between the sum of the squares of the first one hundred natural numbers and the square of the sum',
	given: [100],
	answer: 25164150,
	solutions: {
		'brute force': {
			fn: function(n) {
				var sum = 0;
				var sumOfSquares = 0;
				for (var i = 1; i <= n; i++) {
					sum += i;
					sumOfSquares += i * i;
				}
				var squareOfSum = sum * sum;
				var difference = Math.abs(sumOfSquares - squareOfSum);
				return difference;
			}
		},
		'induction': {
			fn: function(n) {
				var sumOfSquares = Math.pow(n * (n + 1) / 2, 2);
				var squareOfSum = n * (n + 1) * (2 * n + 1) / 6;
				var difference = Math.abs(sumOfSquares - squareOfSum);
				return difference;
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
