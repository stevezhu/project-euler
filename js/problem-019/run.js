/*
	Counting Sundays

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

const utils = require('../lib/utils');

let self = module.exports = {
	problemNumber: 19,
	description: 'Number of Sundays that fell on the first of the month during the twentieth century',
	answer: 171,
	given: [20],
	solutions: {
		'check day of week': {
			fn: (function() {
				let startDate = new Date(1900, 1, 1);
				let millisPerDay = 86400000;
				let daysPerWeek = 7;
				let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				return function(nthCentury) {
					let count = 0;
					for (let year = (nthCentury - 1) * 100 + 1; year <= nthCentury * 100; year++) {
						for (let month = 1; month <= 12; month++) {
							let date = new Date(year, month, 1); // first of the month
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
