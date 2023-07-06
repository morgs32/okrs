import {
  Either,
  MaybeEither,
  NotAPromise 
} from './types';
import { coerce } from './coerce';
import { Fail } from './Fail';

export function _catch<T, T2>(kr: Either<T>, asyncBlock: (fail: Fail) => PromiseLike<MaybeEither<T2>>): PromiseLike<Either<T | T2>>;
export function _catch<T, T2>(kr: Either<T>, block: (fail: Fail) => MaybeEither<NotAPromise<T2>>): Either<T | T2>;
export function _catch<T, T2>(kr: Either<T>, fn: (fail: Fail) => MaybeEither<NotAPromise<T2>> | PromiseLike<MaybeEither<T2>>): Either<T | T2> | PromiseLike<Either<T | T2>>
export function _catch<T, T2>(kr: Either<T>, fn: (fail: Fail) => MaybeEither<NotAPromise<T2>> | PromiseLike<MaybeEither<T2>>): Either<T | T2> | PromiseLike<Either<T | T2>> {
  if (kr.success) {
    return kr;
  }
  return coerce(() => fn(kr));
}

