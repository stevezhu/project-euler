var self = module.exports = {
	/**
	 * @param  {Number} n
	 * @param  {Number} n
	 * @return {Number} The number of times `n` is divisible by `factor`
	 */
	countFactor: function(n, factor) {
		var count = 0;
		while (factor <= n && n % factor === 0) {
			n /= factor;
			count++;
		}
		return count;
	},
	/**
	 * Loops through each prime factor and runs `fn`
	 * @param {Number} n
	 * @param {Function} fn function(factor, count)
	 */
	eachPrimeFactor: function(n, fn) {
		for (var factor = 2; factor <= n; factor++) {
			var count = countFactor(n, factor);
			if (count > 0) {
				fn(factor, count);
				n /= Math.pow(factor, count);
			}
		}
	},
	countFactors: function(num) {
		var factors = 1;
		self.eachPrimeFactor(num, function(factor, count) {
			factors *= count + 1;
		});
		return factors;
	}
};
