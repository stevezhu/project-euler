/*
  Largest palindrome product

  A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

  Find the largest palindrome made from the product of two 3-digit numbers.
 */

const utils = require('../lib/utils');

let self = module.exports = {
  problemNumber: 4,
  description: 'Largest palindrome made from the product of two 3-digit numbers',
  given: [3],
  answer: 906609,
  solutions: {
    'solution': (function() {
      let isPalindrome = function(num) {
        let numString = num.toString();
        let numStringReversed = numString.split('').reverse().join('');
        return numString === numStringReversed;
      };

      return {
        fn: function(digits) {
          let min = Math.pow(10, digits - 1);
          let max = Math.pow(10, digits);
          let palindrome;
          for (let i = min; i < max; i++) {
            for (let j = i; j < max; j++) {
              let product = i * j;
              if ((!palindrome || product > palindrome) && isPalindrome(product)) {
                palindrome = product;
              }
            }
          }
          return palindrome;
        }
      };
    })()
  }
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
