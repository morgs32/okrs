import { Either, NotAPromise, NotAnEither } from './types';
import { isPromiseLike } from './isPromiseLike';
import { handle } from './handle';
import { okrs } from '.';

export function coerce<T>(
  fn: () => PromiseLike<NotAnEither<T>>,
  extra?: any
): Promise<Either<T>>;
export function coerce<T>(
  fn: () => NotAPromise<NotAnEither<T>>,
  extra?: any
): Either<T>;
export function coerce<T>(
  fn: () => NotAPromise<NotAnEither<T>> | PromiseLike<NotAnEither<T>>,
  extra?: any
): Either<T> | Promise<Either<T>> {
  try {
    const v = fn();
    if (isPromiseLike(v)) {
      return v.then(
        (v) => Promise.resolve(okrs.ok(v)),
        (e) => handle(e, extra)
      ) as Promise<Either<T>>;
    }
    return okrs.ok(v);
  } catch (e) {
    return handle(e, extra);
  }
}
