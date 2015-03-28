/*
	Largest palindrome product

	A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

	Find the largest palindrome made from the product of two 3-digit numbers.
 */

var utils = require('./utils.js');

var isPalindrome = function(num) {
	var numString = num.toString();
	var numStringReversed = numString.split('').reverse().join('');
	return numString === numStringReversed;
};

var solution = function(digits) {
	var min = Math.pow(10, digits - 1);
	var max = Math.pow(10, digits);
	var palindrome;
	for (var i = min; i < max; i++) {
		for (var j = i; j < max; j++) {
			var product = i * j;
			if ((!palindrome || product > palindrome) && isPalindrome(product)) {
				palindrome = product;
			}
		}
	}
	return palindrome;
};

utils.logAndCheckAnswer(4, 'Largest palindrome made from the product of two 3-digit numbers:', solution(3), 906609);
