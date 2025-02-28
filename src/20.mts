console.log(1);

const p = new Promise((resolve) => {
	setTimeout(() => {
		console.log(2);
		resolve(undefined);
	}, 3000);
});

p.then(() => {
	console.log(3);
});
