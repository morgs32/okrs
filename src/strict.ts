import { MaybeEither, NotAPromise, NotAnEither } from './types';
import { isPromiseLike } from './isPromiseLike';
import { coerce } from './coerce';
import { Fail } from './Fail';

export function strict<T>(
  asyncBlock: () => PromiseLike<MaybeEither<T>>,
  cb?: (fail: Fail) => T | Fail
): Promise<T>;
export function strict<T>(
  block: () => MaybeEither<NotAPromise<T>>,
  cb?: (fail: Fail) => T | Fail
): T;
export function strict<T>(
  block: () => NotAnEither<NotAPromise<T>>,
  cb?: (fail: Fail) => T | Fail
): T;
export function strict<T>(
  fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>,
  cb?: (fail: Fail) => T | Fail
): T | Promise<T>;
export function strict<T>(
  fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>,
  cb?: (fail: Fail) => T | Fail
): T | Promise<T> {
  const r1 = coerce(fn);
  if (isPromiseLike(r1)) {
    return r1.then((kr) => {
      if (kr.success) {
        return kr.value;
      }
      if (cb) {
        const r2 = cb(kr);
        if (r2 instanceof Fail) {
          throw r2;
        }
        return r2;
      }
      return kr.strict();
    });
  }
  const kr = r1;
  if (kr.success) {
    return kr.value;
  }
  if (cb) {
    const r2 = cb(kr);
    if (r2 instanceof Fail) {
      throw r2;
    }
    return r2;
  }
  return kr.strict();
}
