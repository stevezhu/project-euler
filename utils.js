var _ = require('lodash');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

module.exports = {
	logAndCheckAnswer: function(problemNumber, description, answer, correctAnswer) {
		console.log(problemNumber + '.', description, answer, answer === correctAnswer ? '✓' : '✗');
	},
	// solutions = object in the form {name: solution}
	benchmarkSolutions: function(solutions) {
		_.reduce(solutions, function(result, solution, name) {
			return result.add(name, solution);
		}, suite).on('cycle', function(event) {
			console.log(String(event.target));
		}).on('complete', function() {
			console.log('Fastest is ' + this.filter('fastest').pluck('name'));
		}).run();
	}
};
