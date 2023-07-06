import { Fail, FailIssue } from './Fail';
import { Either } from './types';
import { ok } from './ok';
import { addPath } from './addPath';
import { isPromiseLike } from './isPromiseLike';
import { handle } from './handle';

type ExtractValue<T> = T extends Either<infer V> ? V : T extends PromiseLike<Either<infer V>> ? V : never;
type MapExtractValue<T> = { [K in keyof T]: ExtractValue<T[K]> };

export function props<T extends { [k: string]: Either | PromiseLike<Either> }>(props: T): PromiseLike<Either<MapExtractValue<T>>>
export function props<T extends { [k: string]: Either }>(props: T): Either<MapExtractValue<T>>
export function props<T extends { [k: string]: Either } | { [k: string]: Either | PromiseLike<Either> }>(props: T): Either<MapExtractValue<T>> | PromiseLike<Either<MapExtractValue<T>>> {
  const results = {} as {
    [K in keyof T]: T[K] extends Either<infer R> ? R : never;
  };
  let fails: Array<Fail> = [];
  const onSuccess = (kr: Either, key: keyof T) => {
    if (!kr.success) {
      fails.push(addPath(kr, [key as string]));
    }
    else {
      results[key] = kr.value;
    }
  }
  let isAsync = false
  for (const key in props) {
    const kr = props[key];
    if (isPromiseLike(kr)) {
      isAsync = true
      kr.then((v) => onSuccess(v, key))
    }
    else {
      onSuccess(kr, key)
    }
  }
  const onDone = () => {
    if (fails.length > 0) {
      return handle(fails[0], fails.reduce((a, fail) => a.concat(fail.issues), [] as Array<FailIssue>));
    }
    return ok(results);
  }
  if (isAsync) {
    return Promise.all(Object.values(props)).then(onDone)
  }
  return onDone()
}
