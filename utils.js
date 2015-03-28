module.exports = {
	logAndCheckAnswer: function(problemNumber, description, answer, correctAnswer) {
		console.log(problemNumber + '.', description, answer, answer === correctAnswer ? '✓' : '✗');
	}
};
