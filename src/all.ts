import { Fail, FailIssue } from './Fail';
import { Either } from './types';
import { handle } from './handle';
import { ok } from './ok';
import { isPromiseLike } from './isPromiseLike';

// type ExtractValue<T> = T extends Either<infer V> ? V : never;
// type MapExtractValue<T> = ;

export function all<T extends Array<Either>>(list: T): Either<Array<T[number] extends Either<infer V> ? V : never>>
export function all<T extends Array<PromiseLike<Either> | Either>> (list: T): PromiseLike<Either<Array<Awaited<T[number]> extends Either<infer V> ? V : never>>>
export function all<T extends Array<Either> | Array<PromiseLike<Either> | Either>>(list: T): Either<Array<T[number] extends Either<infer V> ? V : never>> | PromiseLike<Either<Array<Awaited<T[number]> extends Either<infer V> ? V : never>>> {
  const results: Array<any> = [];
  let fails: Array<Fail> = [];
  const onSuccess = (kr: Either) => {
    if (kr instanceof Fail) {
      fails.push(kr);
    }
    else {
      results.push(kr.value);
    }
  }
  const promises: PromiseLike<any>[] = []
  for (const v of list) {
    if (isPromiseLike(v)) {
      promises.push(v.then(onSuccess, handle))
    }
    else {
      onSuccess(v)
    }
  }
  const onDone = () => {
    if (fails.length > 0) {
      return handle(fails[0], fails.reduce((a, fail) => a.concat(fail.issues), [] as Array<FailIssue>));
    }
    return ok(results);
  }
  if (promises.length) {
    return Promise.all(promises).then(onDone)
  }
  return onDone()
  
}
