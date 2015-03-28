/*
	Largest prime factor

	The prime factors of 13195 are 5, 7, 13 and 29.

	What is the largest prime factor of the number 600851475143 ?
 */

var utils = require('./utils.js');

var solution(num) {
	for (var i = 2; i < num;) {
		if (num % i === 0) {
			num /= i;
		} else {
			i++;
		}
	}
	return num;
};

utils.logAndCheckAnswer(3, 'Largest prime factor of 600851475143:', solution(600851475143), 6857);
