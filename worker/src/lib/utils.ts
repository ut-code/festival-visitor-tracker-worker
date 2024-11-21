export function unwrap<T>(val: T | null | undefined): T {
  if (val == null) panic("Unwrap called on falsy value");
  return val;
}
export function panic(message: string): never {
  throw new Error(message);
}
