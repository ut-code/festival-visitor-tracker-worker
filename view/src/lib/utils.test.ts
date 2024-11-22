import { test, expect } from 'bun:test';
import { groupByTime } from './utils';

const now = new Date();
const then = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

test('group by time: 1', () => {
	const got = groupByTime(now, then, [new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 50)], 3);
	expect(got).toEqual([0, 0, 1]);
});
test('group by time: 2', () => {
	const got = groupByTime(now, then, [new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 - 50)], 3);
	expect(got).toEqual([0, 1, 0]);
});
test('group by time: 3', () => {
	const got = groupByTime(now, then, [new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 50)], 3);
	expect(got).toEqual([1, 0, 0]);
});
test('group by time: 4', () => {
	const got = groupByTime(
		now,
		then,
		[
			new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 50),
			new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 50),
			new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 50),
			new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 50),
			new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 - 50)
		],
		3
	);
	expect(got).toEqual([0, 1, 4]);
});
test('group by time: 5', () => {
	const got = groupByTime(
		now,
		then,
		[
			new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 50),
			new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 50),
			new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 50),
			new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 50)
		],
		3
	);
	expect(got).toEqual([4, 0, 0]);
});
