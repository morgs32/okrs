import { okrs } from '.';
import { Either } from './types';

export function wrap<F extends (...args: any[]) => any>(fn: F) {
  return function wrapped(
    ...args: Parameters<F>
  ): ReturnType<F> extends Promise<infer A>
    ? Promise<Either<A>>
    : Either<ReturnType<F>> {
    return okrs.coerce(() => fn(...args), ...args) as any;
  };
}
