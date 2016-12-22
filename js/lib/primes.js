const _ = require('lodash');

let cache = {
	/**
	 * The value of the integer the sieve has searched and cached up to
	 * (not including this number)
	 * @type {Number}
	 */
	currentNumber: 2,
	/**
	 * Cache of the primes found so far
	 * @type {Array}
	 */
	primes: [undefined]
};

let self = module.exports = {
	options: {
		cache: true,
		/**
		 * Whether to clone the result of sieve so that the list of primes isn't accidentally modified
		 * @type {Boolean}
		 */
		clone: false
	},
	resetCache: function() {
		cache.currentNumber = 2;
		cache.primes = [undefined];
	},
	/**
	 * Sieve of Eratosthenes
	 * @param {Number} limit	the integer to sieve up to and not including
	 * @param {Object} options	optional parameter to override module options
	 * @return {[Number]} array of primes
	 */
	sieve: function(limit, options) {
		options = _.extend({}, self.options, options);
		let primes = options.cache ? cache.primes : [undefined];
		let currentNumber = options.cache ? cache.currentNumber : 2;
		if (limit > currentNumber) {
			let list = []; // list of numbers; false is composite and true is prime

			// mark all multiples of found primes as composite starting from `currentNumber`
			for (let i = 1; i < primes.length; i++) {
				let prime = primes[i];
				let nextMultiple = Math.ceil(currentNumber / prime) * prime; // the next multiple of the prime starting from `currentNumber`
				nextMultiple = Math.max(nextMultiple, prime * prime); // when marking composites you only have to start checking starting from the square of the prime
				for (let p = nextMultiple; p < limit; p += prime) { // each multiple of the prime
					list[p] = false; // arrays in javascript are sparsely populated so it's fine if you start at a large number
				}
			}

			for (let p = currentNumber; p < limit; p++) {
				if (_.isUndefined(list[p])) {
					list[p] = true;
					primes.push(p);
					// mark all multiples of i as composite
					for (let j = p * p; j < limit; j += p) {
						list[j] = false;
					}
				}
			}

			if (options.cache) {
				cache.currentNumber = limit;
			}
		}
		return options.clone ? primes.slice() : primes;
	},
	nthPrime: function(n, options) {
		// http://en.wikipedia.org/wiki/Prime_number_theorem#Approximations_for_the_nth_prime_number
		let limit = n < 6 ? 13 : Math.ceil(n * Math.log(n) + n * Math.log(Math.log(n)));
		let primes = self.sieve(limit, options);
		return primes[n];
	}
};
