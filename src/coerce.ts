import { Either, MaybeEither, NotAPromise, NotAnEither } from './types';
import { isPromiseLike } from './isPromiseLike';
import { handle } from './handle';
import { isEither } from './isEither';
import { ok } from './ok';

export function coerce<T>(
  asyncBlock: () => PromiseLike<MaybeEither<T>>,
  extra?: any
): Promise<Either<T>>;
export function coerce<T>(
  block: () => MaybeEither<NotAPromise<T>>,
  extra?: any
): Either<T>;
export function coerce<T>(
  block: () => NotAnEither<NotAPromise<T>>,
  extra?: any
): Either<T>;
export function coerce<T>(
  fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>,
  extra?: any
): Either<T> | Promise<Either<T>>;
export function coerce<T>(
  fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>,
  extra?: any
): Either<T> | Promise<Either<T>> {
  function onSuccess(v: MaybeEither<T>): Either<T> {
    if (isEither(v)) {
      return v;
    }
    return ok(v);
  }
  try {
    const v = fn();
    if (isPromiseLike(v)) {
      return v.then(
        (v) => Promise.resolve(onSuccess(v)),
        (e) => handle(e, extra)
      ) as Promise<Either<T>>;
    }
    return onSuccess(v);
  } catch (e) {
    return handle(e, extra);
  }
}
