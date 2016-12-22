const _ = require('lodash');
const math = require('mathjs');
const primes = require('./primes.js');

let self = module.exports = {};

/**
 * @param  {Number} n
 * @param  {Number} n
 * @return {Number} The number of times `n` is divisible by `factor`
 */
self.countFactor = function(n, factor) {
	let count = 0;
	while (factor <= n && n % factor === 0) {
		n /= factor;
		count++;
	}
	return count;
};

/**
 * Loops through each prime factor and runs `fn`
 * @param {Number} n
 * @param {Function} fn function(factor, count)
 */
self.eachPrimeFactor = function(n, fn) {
	for (let factor = 2; factor <= n; factor++) {
		let count = self.countFactor(n, factor);
		if (count > 0) {
			fn(factor, count);
			n /= Math.pow(factor, count);
		}
	}
};

/**
 * Finds the number of factors by getting the product of the exponents of the prime factorization + 1
 * eg. 144 = 2^4 * 3^2
 * number of factors = (4 + 1) * (2 + 1) = 5 * 3 = 15
 *
 * @param {Number} num
 * @return {Number} number of factors
 */
self.countFactors = function(n) {
	let factors = 1;
	self.eachPrimeFactor(n, function(factor, count) {
		factors *= count + 1;
	});
	return factors;
};

self.primeFactorization = function(n) {
	let factors = [];
	self.eachPrimeFactor(n, function(factor, count) {
		for (let i = 0; i < count; i++) {
			factors.push(factor);
		}
	});
	return factors;
};

// http://mathforum.org/library/drmath/view/71550.html
self.sumOfFactors = function(n) {
	let prod = 1;
	self.eachPrimeFactor(n, function(factor, count) {
		let sum = 0;
		for (let i = 1, c = 0; c <= count; i *= factor, c++) {
			sum += i;
		}
		prod *= sum;
	});
	return prod;
};

self.sumOfProperFactors = function(n) {
	return self.sumOfFactors(n) - n;
};

// http://en.wikipedia.org/wiki/Partition_%28number_theory%29
// http://www.geeksforgeeks.org/generate-unique-partitions-of-an-integer/
// http://ideone.com/SGyL2h
let partitionR = function(arr, n, max, index, fn) {
	if (n === 0) {
		fn(arr);
	}
	for (let i = max; i > 0; i--) {
		if (i <= n) {
			arr[index] = i;
			partitionR(arr, n - i, i, index + 1, fn);
		}
	}
};
let eachPartition = function(n, fn) {
	partitionR([], n, n, 0, fn);
};

/**
 * Calculated using http://primepuzzles.net/problems/prob_019.htm
 * @param {Number} n	number of factors
 * @return {Number}		the smallest number with `n` factors
 */
self.smallestNumberWithNFactors = function(n) {
	let primeFactorization = [];
	let numTwos = 0; // the number of factors that are equal to 2
	self.eachPrimeFactor(n, function(factor, count) {
		for (let i = 0; i < count; i++) {
			if (factor === 2) {
				numTwos++;
			} else {
				primeFactorization.push(factor);
			}
		}
	});

	let primesList = primes.sieve(primes.nthPrime(primeFactorization.length + numTwos));

	if (n % 2 !== 0) { // if odd
		// eg. n = 15
		// 15 = 3 * 5 = 5 * 3
		// return 2^(5-1) * 3^(3-1) = 2^4 * 3^2
		return _.reduce(primeFactorization, function(result, primeFactor, i) {
			// length - i because we need the prime factorization in decreasing order
			let prime = primesList[primeFactorization.length - i];
			return result * Math.pow(prime, primeFactor - 1);
		}, 1);
	} else { // if even
		let values = []; // product of primes with the factors - 1 as exponents
		eachPartition(numTwos, function(p) {
			let arr = primeFactorization.slice();
			for (let i = 0; i < p.length; i++) {
				arr.push(Math.pow(2, p[i]));
			}
			arr = _.sortBy(arr, function(n) {
				return -n;
			});
			let val = 1;
			for (let i = 0; i < arr.length; i++) {
				// i + 1 for primesList because the 0th item is not the first prime
				val *= Math.pow(primesList[i + 1], arr[i] - 1);
			}
			values.push(val);
		});
		return Math.min.apply(null, values);
	}
};
