import { z } from 'zod';
import { Fail, FailIssue } from './Fail';

export function handle(e: any, extra: any = {}, issues: Array<FailIssue> = []) {
  if (e instanceof Fail) {
    return e;
  }
  if (e instanceof z.ZodError) {
    const fail = new Fail(
      e.issues[0].message,
      extra,
      issues.concat(
        e.issues.map((issue) => {
          return {
            received: null,
            ...issue,
          };
        })
      )
    );
    fail.stack = e.stack;
    return fail;
  }
  if (e instanceof Error) {
    const fail = new Fail(e.message, extra, issues);
    fail.stack = e.stack;
    return fail;
  }
  return new Fail('fail');
}
