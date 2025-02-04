export function assertString(arg: unknown): asserts arg is string {
  if (typeof arg !== 'string') {
    throw new Error(`Value wasn't a string: ${arg}`);
  }
}

// export function assertEvent(arg: Event): asserts arg is Event {
//   if (typeof arg !== Event) {
//     throw new Error(`Value wasn't an Event: ${arg}`);
//   }
// }