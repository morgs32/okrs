import { Fail, FailIssue } from './Fail';
import { Either } from './types';
import { handle } from './handle';
import { ok } from './ok';
import { isPromiseLike } from './isPromiseLike';

// type ExtractValue<T> = T extends Either<infer V> ? V : never;
// type MapExtractValue<T> = ;

export function all<Tuple extends Array<Either>>(krs: Tuple): Either<Array<Tuple[number] extends Either<infer V> ? V : never>>
export function all<Tuple extends Array<PromiseLike<Either> | Either>> (krs: Tuple): PromiseLike<Either<Array<Awaited<Tuple[number]> extends Either<infer V> ? V : never>>>
export function all<Tuple extends Array<Either> | Array<PromiseLike<Either> | Either>>(krs: Tuple): Either<Array<Tuple[number] extends Either<infer V> ? V : never>> | PromiseLike<Either<Array<Awaited<Tuple[number]> extends Either<infer V> ? V : never>>> {
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
  let isAsync = false
  for (const kr of krs) {
    if (isPromiseLike(kr)) {
      isAsync = true
      kr.then(onSuccess)
    }
    else {
      onSuccess(kr)
    }
  }
  const onDone = () => {
    if (fails.length > 0) {
      return handle(fails[0], fails.reduce((a, fail) => a.concat(fail.issues), [] as Array<FailIssue>));
    }
    return ok(results);
  }
  if (isAsync) {
    Promise.all(krs).then(onDone)
  }
  return onDone()
  
}
