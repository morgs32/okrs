import { Fail, FailIssue } from './Fail'

export interface Ok<R = any> {
  success: true
  code: null
  value: R
  warnings: Array<FailIssue>
  _kr: 'ok'
}

export type MaybeEither<T> = Either<T> | T;
export type NotAPromise<R> = R extends PromiseLike<any> ? never : R

export type Resolveable<R> = R | Promise<R>

export type Either<R = any, L extends string = string> = Fail<L> | Ok<R>