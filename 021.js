/*
	Amicable numbers

	Let d(n) be defined as the sum of proper divisors of n (numbers less than n which divide evenly into n).
	If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

	For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

	Evaluate the sum of all the amicable numbers under 10000.
 */

var utils = require('lib/utils.js');
var factors = require('lib/factors.js');
var _ = require('lodash');
var math = require('mathjs');

var self = module.exports = {
	problemNumber: 21,
	description: 'Sum of all amicable numbers under 10000',
	answer: 31626,
	given: [10000],
	solutions: {
		'brute force cache': {
			fn: (function() {
				// cache
				var divisorSums = {}; // an object in the form { <number>: <sum of its proper divisors> }
				var getDivisorSum = function(n) {
					if (!_.has(divisorSums, n)) {
						divisorSums[n] = factors.sumOfFactors(n) - n;
					}
					return divisorSums[n];
				};
				return function(max) {
					var sum = 0;
					for (var n = 2; n < max; n++) {
						var divisorSum = getDivisorSum(n);
						// if not prime and number does not equal the sum of its proper divisors and is amicable number
						if (divisorSum !== 1 && n !== divisorSum && n === getDivisorSum(divisorSum)) {
							sum += n;
						}
					}
					return sum;
				};
			})()
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
