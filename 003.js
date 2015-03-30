/*
	Largest prime factor

	The prime factors of 13195 are 5, 7, 13 and 29.

	What is the largest prime factor of the number 600851475143 ?
 */

var utils = require('./utils.js');

var self = module.exports = {
	problemNumber: 3,
	description: 'Largest prime factor of 600851475143',
	given: [600851475143],
	answer: 6857,
	solutions: {
		'solution': {
			fn: function(num) {
				for (var i = 2; i < num;) {
					if (num % i === 0) {
						num /= i;
					} else {
						i++;
					}
				}
				return num;
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
