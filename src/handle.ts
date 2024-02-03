import { Fail } from "./Fail"

export function handle(e: any, extra: any = {}) {
  if (e instanceof Fail) {
    return e
  }
  if (e instanceof Error) {
    const fail = new Fail(e.message, extra)
    fail.stack = e.stack
    fail.stack = e.stack?.replace(e.message, fail.message)
    return fail
  }
  return new Fail(e.message ?? e, extra)
}
