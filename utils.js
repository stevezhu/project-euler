var _ = require('lodash');
var chalk = require('chalk');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var CORRECT = chalk.green('✓');
var INCORRECT = chalk.red('✗');

/**
 * runs if solution.run is true
 * only benchmarks if solution.run and solution.benchmark are both true
 */
var self = module.exports = {
	normalizeSolution: function(solution, problem) {
		// BENCHMARK
		if (!_.has(solution, 'benchmark')) {
			solution.benchmark = true;
		}

		// RUN
		if (solution.run === false) {
			return solution;
		}
		if (_.has(solution, 'fn')) {
			// if you don't have run or you have run and it isn't a function
			if (!_.has(solution, 'run') || typeof solution.run !== 'function') {
				solution.run = function() {
					return this.fn.apply(this, problem.given);
				};
			}
		} else {
			solution.run = false;
		}
		return solution;
	},
	logAndCheckSolution: function(name, problem) {
		var problemNumber = problem.problemNumber;
		var description = problem.description;
		var answer = problem.solutions[name].run();
		var correctAnswer = problem.answer;
		if (_.size(problem.solutions) > 1) {
			description += ' : ' + name;
		}
		description += ' :';
		console.log(answer === correctAnswer ? CORRECT : INCORRECT, problemNumber + '.', description, answer);
	},
	logAndCheckSolutions: function(problem) {
		_.each(problem.solutions, function(solution, name) {
			self.normalizeSolution(solution, problem);
			if (solution.run) {
				self.logAndCheckSolution(name, problem);
			}
		});
	},
	benchmarkSolutions: function(problem) {
		if (process.env.BENCHMARK) {
			_.reduce(problem.solutions, function(result, solution, name) {
				self.normalizeSolution(solution, problem);
				if (solution.run && solution.benchmark) {
					if (_.has(solution, 'benchmarkReset')) {
						solution.benchmarkReset();
					}
					return result.add(name, function() {
						return solution.run();
					});
				} else {
					return result;
				}
			}, suite).on('cycle', function(event) {
				console.log(String(event.target), 'average', event.target.stats.mean * 1000 + 'ms');
			}).on('complete', function() {
				console.log('Fastest is ' + this.filter('fastest').pluck('name'));
			}).run();
		}
	}
};
