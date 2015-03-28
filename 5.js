/*
	Smallest multiple

	2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

	What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
 */

var utils = require('./utils.js');

var isDivisibleByRange = function(num, start, end) {
	for (var i = end; i >= start; i--) {
		if (num % i !== 0) {
			return false;
		}
	}
	return true;
};

var solution1 = function() {
	for (var num = 20; !isDivisibleByRange(num, 1, 20); num += 20) {} // add 20 each time because otherwise the number isn't divisible by 20
	return num;
};

utils.logAndCheckAnswer(5, 'Smallest positive number that is evenly divisible by all of the numbers from 1 to 20:', solution1(), 232792560);

/***************** ALTERNATE SOLUTION *****************/

var _ = require('lodash');

// count the number of times a number is divisible by a given factor
var countFactor = function(num, factor) {
	var count = 0;
	while (factor <= num) {
		if (num % factor === 0) {
			num /= factor;
			count++;
		} else {
			break;
		}
	}
	return count;
};

var solution2 = function() {
	// gets the greatest power of each prime factor for each number from 1 to 20
	var primeFactors = {};
	for (var i = 1; i <= 20; i++) {
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
};

utils.logAndCheckAnswer(5, 'Smallest positive number that is evenly divisible by all of the numbers from 1 to 20, alternate solution:', solution2(), 232792560);

var benchmarkSolutions = function() {
	var Benchmark = require('benchmark');
	var suite = new Benchmark.Suite;
	suite.add('brute force', function() {
		solution1();
	}).add('prime factorization', function() {
		var primeFactors = {};
		for (var i = 1; i <= 20; i++) {
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

		var num = _.reduce(primeFactors, function(result, value, key) {
			return result * Math.pow(key, value);
		}, 1);
	}).on('cycle', function(event) {
		console.log(String(event.target));
	}).on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	}).run();
};
