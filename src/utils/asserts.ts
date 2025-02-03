export function assertString(s: unknown): asserts s is string {
  if (typeof s !== 'string') {
    throw new Error(`Value wasn't a string: ${s}`);
  }
}