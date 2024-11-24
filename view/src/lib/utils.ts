import { count } from 'drizzle-orm';
import type { Visit } from '~/db/schema';

export function unwrap<T>(val: T | null | undefined): T {
	if (val == null) panic('Unwrap called on falsy value');
	return val;
}
export function panic(message: string): never {
	throw new Error(message);
}
export function stairs(len: number, top: number): number[] {
	const ret: number[] = [];
	for (let i = 0; i < len; i++) {
		ret.push((top / len) * i);
	}
	return ret;
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

export function groupByTime(current: Date, start: Date, list: Date[], steps: number): number[] {
	const currentTime = current.getTime();
	const totalDuration = currentTime - start.getTime();
	const stepWidth = totalDuration / steps;
	const values = list.map((i) => currentTime - i.getTime()); // all should be pos
	const result: number[] = groupInSteps(values, totalDuration, steps);
	return result.reverse();
}

export function groupInSteps(input: number[], maxVal: number, length: number): number[] {
	const stepWidth = Math.ceil(maxVal / length);
	const arr: number[] = new Array(length).fill(0);
	for (const datapoint of input) {
		const idx = Math.floor(datapoint / stepWidth);
		const val = arr[idx];
		if (val === undefined)
			console.warn('groupInSteps: something is wrong', { idx, len: arr.length });
		else arr[idx]++;
	}
	return arr;
}
