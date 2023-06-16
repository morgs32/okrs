import { Fail } from './kr';
import { Ok } from './Ok';

export type NotAPromise<R> = R extends Promise<any> ? never : R

export type Resolveable<R> = R | Promise<R>

export type Either<R = any, L extends string = string> = Fail<L> | Ok<R>

export type FailIssue = {
  message: string;
  path: Array<string | number>;
  received: any;
}

export interface Result<R = any> {
  strict(): R
  addPath(path: Array<string | number>): Either
  addIssues(issues: Array<FailIssue>): Either
  addExtra(extra: Record<string, any>): Either
}