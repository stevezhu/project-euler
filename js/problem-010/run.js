/*
	Summation of primes

	The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

	Find the sum of all the primes below two million.
 */

var utils = require('lib/utils.js');
var primes = require('lib/primes.js');

var self = module.exports = {
	problemNumber: 10,
	description: 'Sum of all the primes below two million',
	answer: 142913828922,
	given: [2000000],
	solutions: {
		'solution': {
			fn: function(max) {
				var primesList = primes.sieve(max);
				var sum = 0;
				for (var i = 1; i < primesList.length; i++) {
					sum += primesList[i];
				}
				return sum;
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
