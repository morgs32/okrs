import { Fail, IFail } from "./Fail"

export * from "./Fail"

export interface Ok<R = any> {
  success: true
  code: null
  value: R
  _kr: "ok"
}

export type MaybeEither<T> = Either<T> | T
export type NotAPromise<R> = R extends Promise<any> ? never : R
export type NotAnEither<R> = R extends Either<any> ? never : R

export type Resolveable<R> = R | Promise<R>

type DistributeFail<T extends string> = T extends string ? Fail<T> : never

export type Either<R = any, L extends string = string> =
  | Ok<R>
  | DistributeFail<L>

export type IFailJson<L extends string = string> = IFail<L> & {
  stack: never
}

export type IJsonifyEither<T extends Either> =
  T extends Fail<infer L> ? IFailJson<L> : Ok<T["value"]>

export type EitherValue<T> = T extends Ok<infer R> ? R : never
