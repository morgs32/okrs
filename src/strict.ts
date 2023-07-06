import {
  MaybeEither,
  NotAPromise 
} from './types';
import { isPromiseLike } from './isPromiseLike';
import { parse } from './parse';
import { coerce } from './coerce';

export function strict<T>(asyncBlock: () => PromiseLike<MaybeEither<T>>): PromiseLike<T>;
export function strict<T>(block: () => MaybeEither<NotAPromise<T>>): T;
export function strict<T>(fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>): T | PromiseLike<T>
export function strict<T>(fn: () => MaybeEither<NotAPromise<T>> | PromiseLike<MaybeEither<T>>): T | PromiseLike<T> {
  const kr = coerce(fn);
  if (isPromiseLike(kr)) {
    return kr.then(parse)
  }
  return parse(kr);
}
