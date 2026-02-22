import { Bench } from '@riim/bench';
import { delve } from '../src/delve';
import { delve as delve0 } from '../src/delve0';

const obj: Record<string, any> = {
	a: {
		b: {
			c: 5,
			d: 'string',
			e: [1, 2, 3]
		},
		f: null,
		g: undefined
	},
	h: 1,
	i: 2,
	j: 3,
	k: 4
};
const softKeypathes = ['a', 'h', 'i', 'j', 'k', 'notExist'];
const hardKeypathes = [
	'a.b.c',
	'a.b.d',
	'a.b.e.0',
	'a.b.e.1',
	'a.b.e.2',
	'a.b.e',
	'a.b',
	'a.f',
	'a.g',
	'notExist'
];

let value: any;

const bench1 = new Bench({
	name: 'Soft keypathes',
	warmupTime: 100
});

bench1.add('native', ({ iteration, timeStart }) => {
	let keypath = softKeypathes[iteration % 6];

	timeStart();

	value = obj[keypath];
});
bench1.add('delve0', ({ iteration, timeStart }) => {
	let keypath = softKeypathes[iteration % 6];

	timeStart();

	value = delve0(obj, keypath);
});
bench1.add('delve', ({ iteration, timeStart }) => {
	let keypath = softKeypathes[iteration % 6];

	timeStart();

	value = delve(obj, keypath);
});

const bench2 = new Bench({
	name: 'Hard keypathes',
	warmupTime: 100
});

bench2.add('delve0', ({ iteration, timeStart }) => {
	let keypath = hardKeypathes[iteration % 10];

	timeStart();

	value = delve0(obj, keypath);
});
bench2.add('delve', ({ iteration, timeStart }) => {
	let keypath = hardKeypathes[iteration % 10];

	timeStart();

	value = delve(obj, keypath);
});

(async () => {
	for (let bench of [bench1, bench2]) {
		await bench.run({ time: 1000 });

		console.log(bench.name, '(time=1000)');
		console.table(bench.table());

		await bench.run({ time: 5000 });

		console.log(bench.name, '(time=5000)');
		console.table(bench.table());

		await bench.run({
			time: 5000,
			memoryUsage: true
		});

		console.log(bench.name, '(memoryUsage)');
		console.table(bench.memoryUsageTable());
	}
})();
