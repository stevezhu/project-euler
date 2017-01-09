/*
  Number letter counts

  If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

  If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?


  NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
 */

const utils = require('../lib/utils');

let self = module.exports = {
  problemNumber: 17,
  description: 'Number of letters that would be used if all the numbers from 1 to 1000 inclusive were written out in words',
  answer: 21124,
  given: [1000],
  solutions: {
    // limit, max 1000
    'brute force': (function() {
      let a = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
      let b = [undefined, 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
      let numToWord = function(n) { // doesn't add any spaces between words because of question specifications
        if (0 <= n && n < 20) {
          return a[n];
        } else if (20 <= n && n < 100) {
          let remaining = n % 10;
          let tens = (n - remaining) / 10;
          return b[tens] + (remaining === 0 ? '' : numToWord(remaining));
        } else if (100 <= n && n < 1000) {
          let remaining = n % 100;
          let hundreds = (n - remaining) / 100;
          return a[hundreds] + 'hundred' + (remaining === 0 ? '' : 'and' + numToWord(remaining));
        } else if (n === 1000) {
          return 'onethousand';
        }
      };

      return {
        fn: function(limit) {
          let count = 0;
          for (let i = 1; i <= limit; i++) {
            count += numToWord(i).length;
          }
          return count;
        }
      };
    })(),
    'brute force with letter counts': (function() {
      let a = [4, 3, 3, 5, 4, 4, 3, 5, 5, 4, 3, 6, 6, 8, 8, 7, 7, 9, 8, 8];
      let b = [undefined, 3, 6, 6, 5, 5, 5, 7, 6, 6];
      let numToWordLetterCount = function(n) {
        if (0 <= n && n < 20) {
          return a[n];
        } else if (20 <= n && n < 100) {
          let remaining = n % 10;
          let tens = (n - remaining) / 10;
          return b[tens] + (remaining === 0 ? 0 : numToWordLetterCount(remaining));
        } else if (100 <= n && n < 1000) {
          let remaining = n % 100;
          let hundreds = (n - remaining) / 100;
          return a[hundreds] + 7 + (remaining === 0 ? 0 : 3 + numToWordLetterCount(remaining));
        } else if (n === 1000) {
          return 11;
        }
      };

      return {
        fn: function(limit) {
          let count = 0;
          for (let i = 1; i <= limit; i++) {
            count += numToWordLetterCount(i);
          }
          return count;
        }
      };
    })()
  }
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
