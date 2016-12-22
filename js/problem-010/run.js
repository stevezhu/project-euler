/*
	Summation of primes

	The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.

	Find the sum of all the primes below two million.
 */

const utils = require('../lib/utils');
const primes = require('../lib/primes');

let self = module.exports = {
	problemNumber: 10,
	description: 'Sum of all the primes below two million',
	answer: 142913828922,
	given: [2000000],
	solutions: {
		'solution': {
			fn: function(max) {
				let primesList = primes.sieve(max);
				let sum = 0;
				for (let i = 1; i < primesList.length; i++) {
					sum += primesList[i];
				}
				return sum;
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
