import { z } from 'zod';
import { Fail } from './Fail';

export function handle(e: any, extra: any = {}) {
  if (e instanceof Fail) {
    return e;
  }
  if (e instanceof z.ZodError) {
    const fail = new Fail(e.issues[0].message, {
      ...extra,
      issues: [...e.issues, ...(extra.issues ?? [])],
    });
    fail.stack = e.stack;
    return fail;
  }
  if (e instanceof Error) {
    const fail = new Fail(e.message, extra);
    fail.stack = e.stack;
    return fail;
  }
  return new Fail(e.message ?? e, extra);
}
