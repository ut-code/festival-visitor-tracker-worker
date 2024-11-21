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

const MILLIS_IN_HOUR = 60 * 60 * 1000;
export function groupByHour(start: Date, list: Visit[]): number[] {
	const startTime = start.getTime();
	const values = list.map((i) => i.at.getTime() - startTime).toSorted((a, b) => a - b);
	const length = Math.ceil((start.getTime() - (values.at(-1) ?? start.getTime())) / MILLIS_IN_HOUR);
	const ret: number[] = new Array(length).fill(0);
	for (const datapoint of values) {
		const idx = Math.floor(datapoint / MILLIS_IN_HOUR);
		const arr = ret[idx];
		if (!arr) console.warn('groupByHour: something is wrong');
		else ret[idx]++;
	}
	return ret;
}
