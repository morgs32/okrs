import { Either } from './types';


export function makeJson(kr: Either) {
  if (kr.success) {
    return kr;
  }
  return {
    success: false,
    code: kr.code,
    extra: kr.extra,
    issues: kr.issues,
  };
}
