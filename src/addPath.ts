import { Fail } from "./Fail"
import { Either } from "./types"

export function addPath<R, L extends string, E extends Either<R, L>>(
  kr: E,
  path: Array<string | number>,
): E {
  if (kr.success) {
    return kr
  }
  const newFail = new Fail<L>(kr.code, kr.extra)
  newFail.stack = kr.stack?.replace(kr.message, newFail.message)
  return newFail as E
}
