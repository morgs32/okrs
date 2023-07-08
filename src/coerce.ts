import {
  Either,
  MaybeEither,
  NotAPromise 
} from './types';
import { isPromiseLike } from './isPromiseLike';
import { handle } from './handle';
import { isEither } from './isEither';
import { ok } from './ok';

export function coerce<T>(asyncBlock: () => PromiseLike<MaybeEither<T>>): Promise<Either<T>>;
export function coerce<T>(block: () => MaybeEither<NotAPromise<T>>): Either<T>;
export function coerce<T>(fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>): Either<T> | Promise<Either<T>>
export function coerce<T>(fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>): Either<T> | Promise<Either<T>> {
  function onSuccess(v: MaybeEither<T>): Either<T> {
    if (isEither(v)) {
      return v;
    }
    return ok(v);
  }
  try {
    const v = fn();
    if (isPromiseLike(v)) {
      return v.then(v => Promise.resolve(onSuccess(v)), handle) as Promise<Either<T>>;
    }
    return onSuccess(v);
  } catch (e) {
    return handle(e);
  }
}
