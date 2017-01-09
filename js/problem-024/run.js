/*
  Lexicographic permutations

  A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

  012   021   102   120   201   210

  What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
*/

const utils = require('../lib/utils');
const fs = require('fs');
const _ = require('lodash');

let self = module.exports = {
  problemNumber: 24,
  description: 'The millionth lexicographic permutation of the digits 0 to 9 inclusive',
  answer: '2783915460',
  given: [1000000, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]],
  solutions: {
    'solution': {
      fn: (() => {
        let factorials = [1];
        function factorial(n) {
          if (n < factorials.length) return factorials[n];
          return factorials[n] = n * factorial(n - 1);
        }

        function nthPermutation(n, digits) {
          if (digits.length === 0) return '';

          // the number of permutations for n - 1 digits
          let numP = factorial(digits.length - 1);
          // divide by number of permutations for n - 1
          // to find out what the first digit is
          let digitIdx = Math.floor(n / numP);
          let digit = digits[digitIdx];

          // remove the current digit from the array
          digits.splice(digitIdx, 1);
          return digit + nthPermutation(n % numP, digits);
        }
        return (n, digits) => nthPermutation(n - 1, digits);
      })()
    }
  }
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
