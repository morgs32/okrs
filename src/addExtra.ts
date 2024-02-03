import { Fail } from "./Fail"
import { Either } from "./types"

export function addExtra<R, L extends string>(
  kr: Either<R, L>,
  extra: Record<string, any>,
): Either<R, L> {
  if (kr.success) {
    return kr
  }
  const newFail = new Fail(kr.code, {
    ...kr.extra,
    ...extra,
  })
  newFail.stack = kr.stack?.replace(kr.message, newFail.message)
  return newFail
}
