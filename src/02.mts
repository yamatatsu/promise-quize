import { setTimeout } from "node:timers/promises";

console.log(1);
fn();
console.log(3);

async function fn() {
	await setTimeout(3000);
	console.log(2);
}
