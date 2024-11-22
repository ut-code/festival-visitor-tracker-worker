import { count } from 'drizzle-orm';
import type { Visit } from '~/db/schema';

export function unwrap<T>(val: T | null | undefined): T {
	if (val == null) panic('Unwrap called on falsy value');
	return val;
}
export function panic(message: string): never {
	throw new Error(message);
}

export function groupBy<T, U>(list: T[], groupFn: (t: T) => U): { key: U; val: T[] }[] {
	const map = new Map<U, T[]>();
	for (const item of list) {
		const key = groupFn(item);
		const entry = map.get(key);
		if (entry) entry.push(item);
		else map.set(key, [item]);
	}
	const ret: { key: U; val: T[] }[] = [];
	map.forEach((val, key) => {
		ret.push({ key, val });
	});

	return ret;
}

export function groupSteps(
	current: Date,
	list: Visit[],
	start: Date,
	steps: number
): [number, Date][] {
	const currentTime = current.getTime();
	const totalDuration = currentTime - start.getTime();
	const stepWidth = totalDuration / steps;
	const values = list.map((i) => currentTime - i.at.getTime()); // all should be pos
	const result: [number, Date][] = groupInSteps(values, stepWidth).map(
		(count, index) => [count, new Date(currentTime - index * stepWidth)] as const
	);
	return result;
}

export function stairs(len: number, top: number): number[] {
	const ret: number[] = [];
	for (let i = 0; i < len; i++) {
		ret.push((top / len) * i);
	}
	return ret;
}
function groupInSteps(list: number[], stepWidth: number): number[] {
	const maxVal = list.reduce((a, b) => Math.max(a, b));
	const steps = Math.ceil(maxVal / stepWidth);
	const arr: number[] = new Array(steps + 1).fill(0);
	for (const datapoint of list) {
		const idx = Math.floor(datapoint / stepWidth);
		const val = arr[idx];
		if (val === undefined)
			console.warn('groupByHour: something is wrong', { idx, len: arr.length });
		else arr[idx]++;
	}
	return arr;
}
