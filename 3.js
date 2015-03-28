/*
	Largest prime factor

	The prime factors of 13195 are 5, 7, 13 and 29.

	What is the largest prime factor of the number 600851475143 ?
 */

var num = 600851475143;

for (var i = 2; i < num; i++) {
	if (num % i === 0) {
		num /= i;
	}
}

console.log('Problem 3. Largest prime factor of 600851475143:', num);
