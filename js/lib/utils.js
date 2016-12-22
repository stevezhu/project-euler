const _ = require('lodash');
const chalk = require('chalk');
const Benchmark = require('benchmark');

let CORRECT = chalk.green('✓');
let INCORRECT = chalk.red('✗');

if (_.isUndefined(process.env.BENCHMARK)) {
  process.env.BENCHMARK = false;
} else {
  process.env.BENCHMARK = JSON.parse(process.env.BENCHMARK);
}

/**
 * runs if solution.run is true
 * only benchmarks if solution.run and solution.benchmark are both true
 */
let self = module.exports = {
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
		let problemNumber = problem.problemNumber;
		let description = problem.description;
		let answer = problem.solutions[name].run();
		let correctAnswer = problem.answer;
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
		if (JSON.parse(process.env.BENCHMARK)) {
			let suite = new Benchmark.Suite;
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
