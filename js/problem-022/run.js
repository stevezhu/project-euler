/*
  Names scores

  Using names.txt (right click and 'Save Link/Target As...'), a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.

  For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714.

  What is the total of all the name scores in the file?
 */

const utils = require('../lib/utils');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

let self = module.exports = {
  problemNumber: 22,
  description: 'Total of all name scores in the file',
  answer: 871198282,
  given: [path.resolve(__dirname, 'names.txt')],
  solutions: {
    'brute force': {
      fn: (function() {
        // the index of the name in the array
        function calculateNameScore(name, index) {
          return _.reduce(name, function(total, letter) {
            return total + (letter.charCodeAt(0) - 'A'.charCodeAt(0)) + 1;
          }, 0) * (index + 1);
        };
        return function(filename) {
          var names = fs.readFileSync(path.resolve(__dirname, filename), 'utf8').split(',');
          // remove quotation marks from names
          names = _.map(names, function(name) {
            return name.substring(1, name.length - 1);
          });
          names = names.sort();
          return _.reduce(names, function(total, name, n) {
            return total + calculateNameScore(name, n);
          }, 0);
        };
      })()
    }
  }
};

utils.logAndCheckSolutions(self);
utils.benchmarkSolutions(self);
