import { MaybeEither, NotAPromise, NotAnEither } from './types';
import { isPromiseLike } from './isPromiseLike';
import { parse } from './parse';
import { coerce } from './coerce';

export function strict<T>(
  asyncBlock: () => PromiseLike<MaybeEither<T>>,
  extra?: any
): PromiseLike<T>;
export function strict<T>(
  block: () => MaybeEither<NotAPromise<T>>,
  extra?: any
): T;
export function strict<T>(
  block: () => NotAnEither<NotAPromise<T>>,
  extra?: any
): T;
export function strict<T>(
  fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>,
  extra?: any
): T | PromiseLike<T>;
export function strict<T>(
  fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>,
  extra?: any
): T | PromiseLike<T> {
  const kr = coerce(fn, extra);
  if (isPromiseLike(kr)) {
    return kr.then(parse);
  }
  return parse(kr);
}
