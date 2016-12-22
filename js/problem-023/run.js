/*
Non-abundant sums

A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.
*/

const utils = require('../lib/utils');
const factors = require('../lib/factors');
const fs = require('fs');
const _ = require('lodash');

let self = module.exports = {
  problemNumber: 23,
  description: 'Sum of all the positive integers which cannot be written as the sum of two abundant numbers',
  answer: 4179871,
  given: [],
  solutions: {
    'brute force': {
      fn: (function() {
        let SMALLEST_ABUNDANT_NUM = 12;
        let UPPER_BOUND = 28123; // all integers greater than 28123 can be written as the sum of two abundant numbers
        return function() {
          let abundantNumbers = [];
          for (let num = SMALLEST_ABUNDANT_NUM; num < UPPER_BOUND; num++) { // 12 is the smallest abundant number
            if (factors.sumOfProperFactors(num) > num) {
              abundantNumbers.push(num);
            }
          }

          let numberSums = []; // positive integers that are the sum of two abundant numbers
          for (let i = 0; i < abundantNumbers.length; i++) {
            for (let j = i; j < abundantNumbers.length; j++) {
              let numberSum = abundantNumbers[i] + abundantNumbers[j];
              if (numberSum <= UPPER_BOUND) {
                numberSums.push(numberSum);
              }
            }
          }
          numberSums = _.uniq(numberSums);

          return UPPER_BOUND * (UPPER_BOUND + 1) * (1/2) - _.sum(numberSums);
        };
      })()
    }
  }
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
