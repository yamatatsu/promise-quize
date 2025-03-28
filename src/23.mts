#!/usr/bin/env node --no-warnings

console.log(1);

let resolve = (val: unknown) => {};
new Promise((res) => {
	console.log(2);
	resolve = res;
}).then(() => {
	console.log(3);
});

console.log(4);

resolve(undefined);

console.log(5);
