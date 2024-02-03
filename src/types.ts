import { Fail, IFail } from "./Fail"

export * from "./Fail"

export interface Ok<R = any> {
  success: true
  code: null
  value: R
  _kr: "ok"
}

export type MaybeEither<T> = Either<T> | T
export type NotAPromise<R> = R extends PromiseLike<any> ? never : R
export type NotAnEither<R> = R extends Either<any> ? never : R

export type Resolveable<R> = R | Promise<R>

export type Either<R = any, L extends string = string> = Fail<L> | Ok<R>
export type IJsonifyEither<T extends Either> =
  T extends Fail<infer L> ? IFail<L> : Ok<T["value"]>

export type EitherValue<T> = T extends Ok<infer R> ? R : never
