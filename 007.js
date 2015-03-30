/*
	10001st prime

	By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

	What is the 10,001st prime number?
 */

var utils = require('./utils.js');
var primes = require('./primes.js');
var _ = require('lodash');

var isPrime = function(num) {
	for (var i = 2; i < num; i++) {
		if (num % i === 0) {
			return false;
		}
	}
	return true;
};

var self = module.exports = {
	problemNumber: 7,
	description: '10,001st prime number',
	given: [10001],
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
			},
			run: false
		},
		/***************** FASTER METHODS *****************/
		'Sieve of Eratosthenes uncached': {
			fn: function(n) {
				return primes.nthPrime(n, {cache: false});
			}
		},
		'Sieve of Eratosthenes cached': {
			fn: function(n) {
				return primes.nthPrime(n);
			},
			benchmarkReset: function() {
				primes.resetCache();
			}
		},
		'incremental sieve cached': {
			fn: function(n) {
				var limitInterval = 100;
				var primesList = [];
				for (var limit = limitInterval; primesList.length < n + 1; limit += limitInterval) {
					primesList = primes.sieve(limit);
				}
				return primesList[n];
			},
			benchmarkReset: function() {
				primes.resetCache();
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
