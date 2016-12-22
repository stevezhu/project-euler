/*
	Smallest multiple

	2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

	What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
 */

const utils = require('../lib/utils');
const factors = require('../lib/factors');
const _ = require('lodash');

let self = module.exports = {
	problemNumber: 5,
	description: 'Smallest positive number that is evenly divisible by all of the numbers from 1 to 20',
	given: [[1, 20]],
	answer: 232792560,
	solutions: {
		'brute force': (function() {
			let isDivisibleByRange = function(num, start, end) {
				for (let i = end; i >= start; i--) {
					if (num % i !== 0) {
						return false;
					}
				}
				return true;
			};

			return {
				// range is an array in the form [start, end]
				fn: function(range) {
					let start = range[0];
					let end = range[1];
					let num = end;
					while (!isDivisibleByRange(num, start, end)) {
						num += end; // add end of range each time because otherwise the number isn't divisible by it
					}
					return num;
				}
			};
		})(),
		'prime factorization': {
			fn: function(range) {
				let start = range[0];
				let end = range[1];
				// gets the greatest power of each prime factor for each number from 1 to 20
				let primeFactors = {};
				for (let i = start; i <= end; i++) {
					let num = i;
					for (let factor = 2; factor <= num; factor++) {
						let count = factors.countFactor(num, factor);
						if (count > 0) {
							num /= Math.pow(factor, count);
							if (!_.has(primeFactors, factor) || count > primeFactors[factor]) {
								primeFactors[factor] = count;
							}
						}
					}
				}
				return _.reduce(primeFactors, function(result, value, key) {
					return result * Math.pow(key, value);
				}, 1);
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
