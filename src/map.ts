import { Either, MaybeEither, NotAPromise } from './types';
import { isPromiseLike } from './isPromiseLike';
import { coerce } from './coerce';
import { all } from './all';

export function map<T, I>(
  items: Array<I>,
  fnAsync: (item: I) => PromiseLike<MaybeEither<T>>
): Promise<Either<T[]>>;
export function map<T, I>(
  items: Array<I>,
  fnSync: (item: I) => MaybeEither<NotAPromise<T>>
): Either<T[]>;
export function map<T, I>(
  items: Array<I>,
  fn:
    | ((item: I) => MaybeEither<NotAPromise<T>>)
    | ((item: I) => Promise<MaybeEither<T>>)
): Either<T[]> | Promise<Either<T[]>> {
  const x = items.map((item) => {
    const c = coerce(() => {
      const v = fn(item);
      return v;
    }) as Either<T> | PromiseLike<Either<T>>;
    return c;
  });
  if (isPromiseLike(x[0])) {
    return Promise.all(x).then(all);
  }
  return all(x as Either<T>[]);
}
