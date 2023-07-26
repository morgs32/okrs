import { ok } from 'assert';
import { fail } from './Fail';
import { Either } from './types';


export function fromJson(x: Either) {
  switch (x._kr) {
    case 'fail':
      return fail(x.code, x.extra);
    case 'ok':
      return ok(x.value);
  }
}
