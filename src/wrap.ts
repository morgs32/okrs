import { okrs } from '.';

export function wrap<F extends (...args: any[]) => any>(fn: F) {
  return function wrapped(...args: Parameters<F>): ReturnType<F> {
    return okrs.strict(() => fn(...args), ...args) as ReturnType<F>;
  };
}
