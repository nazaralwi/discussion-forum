export function assertString(arg: unknown): asserts arg is string {
  if (typeof arg !== 'string') {
    throw new Error(`Value wasn't a string: ${arg}`);
  }
}
