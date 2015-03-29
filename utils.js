var _ = require('lodash');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

module.exports = {
	// problem == module.exports
	logAndCheckSolutions: function(problem) {
		var self = this;
		_.each(problem.solutions, function(solution, name) {
			if (_.has(solution, 'fn') && _.has(solution, 'run')) {
				self.logAndCheckSolution(name, problem);
			}
		});
	},
	logAndCheckSolution: function(problemNumber, description, answer, correctAnswer) {
		if (arguments.length === 2) { // if arguments are (solutionName, problem)
			var solutionName = arguments[0];
			var problem = arguments[1];
			problemNumber = problem.problemNumber;
			description = problem.description;
			answer = problem.solutions[solutionName].run();
			correctAnswer = problem.answer;
			if (_.size(problem.solutions) > 1) {
				description += ', ' + solutionName;
			}
			this.logAndCheckSolution(problemNumber, description + ':', answer, correctAnswer);
		} else {
			console.log(problemNumber + '.', description, answer, answer === correctAnswer ? '✓' : '✗');
		}
	},
	// solutions = object in the form {name: solution}
	benchmarkSolutions: function(solutions) {
		if (process.env.BENCHMARK) {
			_.reduce(solutions, function(result, solution, name) {
				if (_.has(solution, 'run')) {
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
