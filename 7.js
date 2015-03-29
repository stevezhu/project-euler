/*
	10001st prime

	By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

	What is the 10,001st prime number?
 */

var utils = require('./utils.js');
var _ = require('lodash');

var isPrime = function(num) {
	for (var i = 2; i < num; i++) {
		if (num % i === 0) {
			return false;
		}
	}
	return true;
};

var givenN = 10001;

module.exports = {
	problemNumber: 7,
	description: '10,001st prime number',
	answer: 104743,
	solutions: {
		// give number as a string
		// numDigits = number of adjacent digits
		'brute force': {
			fn: function(nth) {
				var prime;
				for (var num = 2, count = 1; count <= nth; num++) {
					if (isPrime(num)) {
						prime = num;
						count++;
					}
				}
				return prime;
			}/*,
			run: function() {
				return this.fn(givenN);
			}*/
		},
		/***************** FASTER METHODS *****************/
		'Sieve of Eratosthenes': {
			fn: function(nth) {
				var list = this.list || []; // j for prime, false for composite
				var primes = this.primes || [undefined]; // there is no 0th prime;

				var start = this.start || 2;
				var limit = this.limit || Math.ceil(nth * Math.log(nth) + nth * Math.log(Math.log(nth)));

				for (var i = start; i < limit; i++) {
					if (_.isUndefined(list[i])) {
						list[i] = i * i;
						primes.push(i);
						if (i <= Math.sqrt(limit)) {
							// mark all multiples of i as composite
							for (var j = list[i]; j < limit; list[i] = (j += i)) {
								list[j] = false;
							}
						}
					}
				}
				return primes[nth || 0]; // return undefined if nth is undefined
			},
			run: function() {
				return this.fn(givenN);
			}
		},
		'incremental Sieve of Eratosthenes': {
			limitInterval: 100,
			list: [],
			primes: [undefined],
			sieve: function() {
				return module.exports.solutions['Sieve of Eratosthenes'].fn.apply(this, arguments);
			},
			fn: function(nth) {
				var list = this.list;
				var primes = this.primes;

				var start = 2;
				var limit = this.limitInterval;

				while (primes.length - 1 < nth) { // while the nth prime hasn't been reached yet
					// mark all multiples of found primes as composite starting from where it left off
					for (var p = 1; p < primes.length; p++) {
						var i = primes[p];
						for (var j = list[i]; j < limit; list[i] = (j += i)) {
							list[j] = false;
						}
					}
					this.sieve.call({
						start: start,
						limit: limit,
						list: list,
						primes: primes
					});
					// increase limit
					start = limit;
					limit += this.limitInterval;
				}
				return primes[nth];
			},
			run: function() {
				return this.fn(givenN);
			}
		},
		'incremental Sieve without cache': {
			run: function() {
				var incrementalSieve = module.exports.solutions['incremental Sieve of Eratosthenes'];
				var context = {
					limitInterval: incrementalSieve.limitInterval,
					list: [],
					primes: [undefined],
					sieve: incrementalSieve.sieve
				};
				return incrementalSieve.fn.call(context, givenN);
			}
		}
	}
};

utils.logAndCheckSolutions(module.exports);
utils.benchmarkSolutions(module.exports.solutions);
