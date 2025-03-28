#!/usr/bin/env node --no-warnings

import { setTimeout } from "node:timers/promises";

console.log(1);
const p = fn();
console.log(4);
await p;
console.log(5);

async function fn() {
	console.log(2);
	await setTimeout(0);
	console.log(3);
}
