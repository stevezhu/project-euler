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

var palindrome;
for (var i = 100; i < 1000; i++) {
	for (var j = i; j < 1000; j++) {
		var product = i * j;
		if ((!palindrome || product > palindrome) && isPalindrome(product)) {
			palindrome = product;
		}
	}
}

utils.logAndCheckAnswer(4, 'Largest palindrome made from the product of two 3-digit numbers:', palindrome, 906609);
