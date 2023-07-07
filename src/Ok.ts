import { FailIssue } from './Fail';
import { Ok } from './types';

export function ok<R>(value: R, warnings: Array<FailIssue> = []): Ok<R> {
  return {
    success: true,
    code: null,
    value,
    warnings,
    _kr: 'ok',
  }
}
