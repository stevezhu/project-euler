/*
	Smallest multiple

	2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

	What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
 */

var utils = require('./utils.js');
var _ = require('lodash');

var isDivisibleByRange = function(num, start, end) {
	for (var i = end; i >= start; i--) {
		if (num % i !== 0) {
			return false;
		}
	}
	return true;
};

// count the number of times a number is divisible by a given factor
var countFactor = function(num, factor) {
	var count = 0;
	while (factor <= num && num % factor === 0) {
		num /= factor;
		count++;
	}
	return count;
};

var givenRange = [1, 20];

module.exports = {
	problemNumber: 5,
	description: 'Smallest positive number that is evenly divisible by all of the numbers from 1 to 20',
	answer: 232792560,
	solutions: {
		'brute force': {
			// range is an array in the form [start, end]
			fn: function(range) {
				var start = range[0];
				var end = range[1];
				var num = end;
				while (!isDivisibleByRange(num, start, end)) {
					num += end; // add end of range each time because otherwise the number isn't divisible by it
				}
				return num;
			},
			run: function() {
				return this.fn(givenRange);
			}
		},
		'prime factorization': {
			fn: function(range) {
				var start = range[0];
				var end = range[1];
				// gets the greatest power of each prime factor for each number from 1 to 20
				var primeFactors = {};
				for (var i = start; i <= end; i++) {
					var num = i;
					for (var factor = 2; factor <= num;) {
						var count = countFactor(num, factor);
						if (count > 0) {
							num /= count * factor;
							if (!_.has(primeFactors, factor) || count > primeFactors[factor]) {
								primeFactors[factor] = count;
							}
						} else {
							factor++;
						}
					}
				}
				return _.reduce(primeFactors, function(result, value, key) {
					return result * Math.pow(key, value);
				}, 1);
			},
			run: function() {
				return this.fn(givenRange);
			}
		}
	}
};

utils.logAndCheckSolutions(module.exports);
utils.benchmarkSolutions(module.exports.solutions);
