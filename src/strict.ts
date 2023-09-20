import { MaybeEither, NotAPromise, NotAnEither } from './types';
import { isPromiseLike } from './isPromiseLike';
import { coerce } from './coerce';
import { Fail } from './Fail';

export function strict<T>(
  asyncBlock: () => PromiseLike<MaybeEither<T>>,
  cb?: (fail: Fail) => T
): Promise<T>;
export function strict<T>(
  block: () => MaybeEither<NotAPromise<T>>,
  cb?: (fail: Fail) => T
): T;
export function strict<T>(
  block: () => NotAnEither<NotAPromise<T>>,
  cb?: (fail: Fail) => T
): T;
export function strict<T>(
  fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>,
  cb?: (fail: Fail) => T
): T | Promise<T>;
export function strict<T>(
  fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>,
  cb?: (fail: Fail) => T
): T | Promise<T> {
  const kr = coerce(fn);
  if (isPromiseLike(kr)) {
    return kr.then((awaitedKr) => {
      if (awaitedKr.success) {
        return awaitedKr.value;
      }
      if (cb) {
        return cb(awaitedKr);
      }
      return awaitedKr.strict();
    });
  }
  if (kr.success) {
    return kr.value;
  }
  if (cb) {
    return cb(kr);
  }
  return kr.strict();
}
