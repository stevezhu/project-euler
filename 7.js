/*
	10001st prime

	By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

	What is the 10,001st prime number?
 */

var utils = require('./utils.js');

var givenN = 10001;
var answer = 104743;

/***** BRUTE FORCE *****/

var isPrime = function(num) {
	for (var i = 2; i < num; i++) {
		if (num % i === 0) {
			return false;
		}
	}
	return true;
};

var solution1 = function(nth) {
	var prime;
	for (var num = 2, count = 1; count <= nth; num++) {
		if (isPrime(num)) {
			prime = num;
			count++;
		}
	}
	return prime;
};

//utils.logAndCheckAnswer(7, '10,001st prime number:', solution1(givenN), answer);


/***************** FASTER METHODS *****************/

var _ = require('lodash');

/***** Sieve of Eratosthenes *****/

var solution2 = (function() {
	return function(nth) {
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
	};
})();

utils.logAndCheckAnswer(7, '10,001st prime number, sieve:', solution2(givenN), answer);

/***** Incremental Sieve of Eratosthenes *****/

var solution3 = (function() {
	var limitInterval = 100; // finds primes in intervals of 100

	var context = {
		list: [], // j for prime, false for composite
		primes: [undefined] // there is no 0th prime;
	};
	return function(nth) {
		var list = this.list || context.list;
		var primes = this.primes || context.primes;

		var start = 2;
		var limit = limitInterval;

		while (primes.length - 1 < nth) { // while the nth prime hasn't been reached yet
			// mark all multiples of found primes as composite starting from where it left off
			for (var p = 1; p < primes.length; p++) {
				var i = primes[p];
				for (var j = list[i]; j < limit; list[i] = (j += i)) {
					list[j] = false;
				}
			}
			solution2.call({
				start: start,
				limit: limit,
				list: list,
				primes: primes
			});
			// increase limit
			start = limit;
			limit += limitInterval;
		}
		return primes[nth];
	};
})();

utils.logAndCheckAnswer(7, '10,001st prime number, incremental sieve:', solution3(givenN), answer);

if (process.env.BENCHMARK) {
	utils.benchmarkSolutions({
		'Sieve of Eratosthenes': function() {
			solution2(givenN);
		},
		'incremental Sieve of Eratosthenes': function() {
			solution3.call({
				list: [],
				primes: [undefined]
			}, givenN);
		},
		'incremental Sieve with cache': function() {
			solution3(givenN);
		}
	});
}
