import { okrs } from '.';
import { Either } from './types';

export function wrap<F extends (...args: any[]) => any>(fn: F) {
  return function wrapped(...args: Parameters<F>): Either<ReturnType<F>> {
    return okrs.coerce(() => fn(...args), ...args) as Either<ReturnType<F>>;
  };
}
