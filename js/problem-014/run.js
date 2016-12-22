/*
	Longest Collatz sequence

	The following iterative sequence is defined for the set of positive integers:

		n → n/2 (n is even)
		n → 3n + 1 (n is odd)

	Using the rule above and starting with 13, we generate the following sequence:

		13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1

	It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.

	Which starting number, under one million, produces the longest chain?

	NOTE: Once the chain starts the terms are allowed to go above one million.
 */

const utils = require('../lib/utils');

let self = module.exports = {
	problemNumber: 14,
	description: 'The starting number, under one million, that produces the longest Collatz sequence',
	answer: 837799,
	given: [1000000],
	solutions: {
		'brute force': {
			fn: function(limit) {
				let greatestCount = 0;
				let greatestStartingNumber = 1;
				for (let n = 1; n < limit; n++) {
					let curr = n;
					let count = 1; // count starts at 1 because it already includes the starting number, `n`
					while (curr != 1) {
						if (curr % 2 === 0) { // even
							curr = curr / 2;
						} else { // odd
							curr = 3 * curr + 1;
						}
						if (curr === Infinity) {
							return;
						}
						count++;
					}
					if (count > greatestCount) {
						greatestCount = count;
						greatestStartingNumber = n;
					}
				}
				return greatestStartingNumber;
			}
		},
		'brute force cached': {
			fn: function(limit) {
				let cache = [];
				let greatestCount = 0;
				let greatestStartingNumber = 1;
				for (let n = 1; n < limit; n++) {
					let curr = n;
					let count = 1; // count starts at 1 because it already includes the starting number, `n`
					while (curr != 1) {
						if (cache[curr]) {
							count += cache[curr];
							break;
						} else {
							if (curr % 2 === 0) { // even
								curr = curr / 2;
							} else { // odd
								curr = 3 * curr + 1;
							}
							count++;
						}
					}
					cache[n] = count; // TODO maybe add maximum index for cache

					if (count > greatestCount) {
						greatestCount = count;
						greatestStartingNumber = n;
					}
				}
				return greatestStartingNumber;
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
