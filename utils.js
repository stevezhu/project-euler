var _ = require('lodash');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var self = module.exports = {
	normalizeSolution: function(solution, problem) {
		if (!_.has(solution, 'run') || solution.run !== false) {
			if (_.has(solution, 'fn') && typeof solution.run !== 'function') {
				solution.run = function() {
					return this.fn.apply(this, problem.given);
				};
			} else {
				solution.run = false;
			}
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
		console.log(problemNumber + '.', description, answer, answer === correctAnswer ? '✓' : '✗');
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
				if (solution.run) {
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
