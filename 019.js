/*
	You are given the following information, but you may prefer to do some research for yourself.

		* 1 Jan 1900 was a Monday.
		* Thirty days has September,
		  April, June and November.
		  All the rest have thirty-one,
		  Saving February alone,
		  Which has twenty-eight, rain or shine.
		  And on leap years, twenty-nine.
		* A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.

	How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
 */

var utils = require('lib/utils.js');

var self = module.exports = {
	problemNumber: 19,
	description: 'Number of Sundays that fell on the first of the month during the twentieth century',
	answer: 171,
	given: [20],
	solutions: {
		'check day of week': {
			fn: (function() {
				var startDate = new Date(1900, 1, 1);
				var millisPerDay = 86400000;
				var daysPerWeek = 7;
				var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				return function(nthCentury) {
					var count = 0;
					for (var year = (nthCentury - 1) * 100 + 1; year <= nthCentury * 100; year++) {
						for (var month = 1; month <= 12; month++) {
							var date = new Date(year, month, 1); // first of the month
							if (weekdays[date.getDay()] === 'Sunday') {
								count++;
							}
						}
					}
					return count;
				};
			})()
		}
	}
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
