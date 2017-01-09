/*
  Multiples of 3 and 5

  If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

  Find the sum of all the multiples of 3 or 5 below 1000.
 */

const utils = require('../lib/utils');

let self = module.exports = {
  problemNumber: 1,
  description: 'Sum of all multiples of 3 or 5 below 1000',
  given: [1000],
  answer: 233168,
  solutions: {
    'brute force': {
      fn: function(max) {
        let sum = 0;
        for (let i = 1; i < max; i++) {
          if (i % 3 === 0 || i % 5 === 0) {
            sum += i;
          }
        }
        return sum;
      }
    },
    'arithmetic series': {
      fn: (function() {
        function calcArithmeticSeries(max, n) {
          // max - 1 because the question is the sum of all multiples below max
          // eg. if max = 9, n = 3 then the answer should be 3 + 6
          // and not 3 + 6 + 9
          const count = Math.floor((max - 1) / n);
          return count * n * (count + 1) / 2;
        }
        return function(max) {
          const sum3 = calcArithmeticSeries(max, 3);
          const sum5 = calcArithmeticSeries(max, 5);
          const sum15 = calcArithmeticSeries(max, 15);
          return sum3 + sum5 - sum15;
        }
      })()
    }
  }
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
