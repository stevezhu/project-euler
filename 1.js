/*
	Multiples of 3 and 5

	If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

	Find the sum of all the multiples of 3 or 5 below 1000.
 */

var utils = require('./utils.js');

var givenMax = 1000;

module.exports = {
	problemNumber: 1,
	description: 'Sum of all multiples of 3 or 5 below 1000',
	answer: 233168,
	solutions: {
		'solution': {
			fn: function(max) {
				var sum = 0;
				for (var i = 1; i < max; i++) {
					if (i % 3 === 0 || i % 5 === 0) {
						sum += i;
					}
				}
				return sum;
			},
			run: function() {
				return this.fn(givenMax);
			}
		}
	}
};

utils.logAndCheckSolutions(module.exports);
utils.benchmarkSolutions(module.exports.solutions);
