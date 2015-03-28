/*
	Even Fibonacci numbers

	Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:

		1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

	By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.
 */

var utils = require('./utils.js');

var sum = 0;

var prevFibNum = 1;
var currentFibNum = 1;
while (currentFibNum < 4000000) {
	var tempSum = currentFibNum + prevFibNum;
	prevFibNum = currentFibNum;
	currentFibNum = tempSum;
	if (currentFibNum % 2 === 0) {
		sum += currentFibNum;
	}
}

utils.logAndCheckAnswer(2, 'Sum of even terms in the Fibonacci sequence whose values do not exceed four million:', sum, 4613732);
