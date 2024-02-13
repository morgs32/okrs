import { okrs } from "."
import { Either, Fail } from "./types"

export function wrap<
  F extends (...args: any[]) => any,
  R extends ReturnType<F>,
>(fn: F) {
  return function wrapped(
    ...args: Parameters<F>
  ): R extends Promise<infer A>
    ? Promise<A extends Either ? A | Fail : Either<A>>
    : R extends Either
      ? R | Fail
      : Either<R> {
    return okrs.coerce(() => fn(...args), ...args) as any
  }
}
