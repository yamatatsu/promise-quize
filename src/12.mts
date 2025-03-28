#!/usr/bin/env node --no-warnings

import { setTimeout } from "node:timers/promises";

console.log(1);
const p = fn();
console.log(5);
await p;
console.log(6);

async function fn() {
	console.log(2);
	await console.log(3);
	console.log(4);
}
