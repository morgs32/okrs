import { Fail, FailIssue } from './Fail';
import { Either } from './types';


export function addIssues<R, L extends string>(kr: Either<R, L>, issues: Array<FailIssue> = []): Either<R, L> {
  if (kr.success) {
    return kr;
  }
  const newFail = new Fail(
    kr.code,
    kr.extra,
    [...kr.issues, ...issues]
  );
  newFail.stack = kr.stack?.replace(kr.message, newFail.message);
  return newFail;
}
;
