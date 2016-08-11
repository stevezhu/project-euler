/*
	Lattice paths

	Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

	How many such routes are there through a 20×20 grid?
 */

var utils = require('lib/utils.js');
var math = require('mathjs');

var self = module.exports = {
	problemNumber: 15,
	description: 'The number of routes through a 20x20 grid',
	answer: 137846528820,
	given: [20],
	solutions: {
		'count with cache': (function() {
			var cache = {};
			// the number of routes through a certain grid while only being able to move to the right or down
			var numRoutes = function(width, height) {
				var coord = width + ',' + height; // coordinates
				var routes;
				if (cache[coord]) {
					return cache[coord];
				} else {
					if (width === 1 || height === 1) { // base case
						routes = width + height;
					} else {
						// the number of routes for a certain grid
						// is the number of routes from the point to the right of the starting point
						// plus the number of routes from the point to the bottom of the starting point
						routes = numRoutes(width - 1, height) + numRoutes(width, height - 1);
					}
					cache[coord] = routes;
				}
				return routes;
			};

			return {
				// size = the side length of the grid
				fn: function(size) {
					return numRoutes(size, size);
				}
			};
		})(),
		'combinations': {
			fn: function(size) {
				return math.combinations(2 * size, size);
			}
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
