import { Fail } from './Fail';

export interface Ok<R = any> {
  success: true;
  code: null;
  value: R;
  _kr: 'ok';
}

export type MaybeEither<T> = Either<T> | T;
export type NotAPromise<R> = R extends PromiseLike<any> ? never : R;
export type NotAnEither<R> = R extends Either<any> ? never : R;

export type Resolveable<R> = R | Promise<R>;

export type Either<R = any, L extends string = string> = Fail<L> | Ok<R>;

export type Jsonify<T extends Either> = T extends Either<infer R, infer L>
  ? Omit<Fail<L>, 'stack'> | Ok<R>
  : never;

export type EitherValue<T> = T extends Ok<infer R> ? R : never;
