import { Either } from "./types"

export function parse<R>(kr: Either<R, string>): R {
  if (!kr.success) {
    throw kr
  }
  return kr.value
}
