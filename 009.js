/*
	Special Pythagorean triplet

	A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

		a^2 + b^2 = c^2

	For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

	There exists exactly one Pythagorean triplet for which a + b + c = 1000.
	Find the product abc.
 */

var utils = require('./utils.js');
var math = require('mathjs');
var PriorityQueue = require('priorityqueuejs');

var matrixA = [
	[1, -2, 2],
	[2, -1, 2],
	[2, -2, 3]
];
var matrixB = [
	[1, 2, 2],
	[2, 1, 2],
	[2, 2, 3]
];
var matrixC = [
	[-1, 2, 2],
	[-2, 1, 2],
	[-2, 2, 3]
];
var matrices = [matrixA, matrixB, matrixC];

var given = [1000];
module.exports = {
	problemNumber: 9,
	description: 'Product abc of Pythagorean triplet for which a + b + c = 1000',
	answer: 31875000,
	solutions: {
		// tree of primitive Pythagorean triples
		'matrix multiplication': {
			fn: function(sum) {
				var triples = new PriorityQueue(function(a, b) {
					return b.sum - a.sum;
				});
				triples.enq({values: [3, 4, 5], sum: 12}); // start with smallest triple
				for (var triple = triples.deq(), s = triple.sum; sum > s && sum % s !== 0; triple = triples.deq(), s = triple.sum) {
					// generate triples
					for (var i = 0; i < matrices.length; i++) {
						var values = math.multiply(matrices[i], triple.values);
						triples.enq({
							values: values,
							sum: math.sum.apply(null, values)
						});
					}
				}
				return sum % s === 0 ? math.prod.apply(null, triple.values) * math.pow(sum / s, 3) : undefined;
			},
			run: function() {
				return this.fn.apply(this, given);
			}
		}
	}
};

utils.logAndCheckSolutions(module.exports);
utils.benchmarkSolutions(module.exports.solutions);
