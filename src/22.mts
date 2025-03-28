#!/usr/bin/env node --no-warnings

console.log(1);

const p = new Promise((resolve) => {
	console.log(2);

	setTimeout(() => {
		console.log(3);
		resolve(undefined);
	}, 3000);

	console.log(4);
});

console.log(5);

p.then(() => {
	console.log(6);
});
