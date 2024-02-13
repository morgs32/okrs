import { Either, Fail, NotAPromise } from "./types"
import { handle } from "./handle"
import { okrs } from "."
import { isPromise } from "util/types"
import { isEither } from "./isEither"

export function coerce<T, R extends T extends Either ? T | Fail : Either<T>>(
  fn: () => Promise<T>,
  extra?: any,
): Promise<R>
export function coerce<T, R extends T extends Either ? T | Fail : Either<T>>(
  fn: () => NotAPromise<T>,
  extra?: any,
): R
export function coerce<T, R extends T extends Either ? T | Fail : Either<T>>(
  fn: () => NotAPromise<T> | Promise<T>,
  extra?: any,
): R | Promise<R> {
  try {
    const v = fn()
    if (isPromise(v)) {
      return v
        .then((v) => {
          if (isEither(v)) {
            return v
          }
          return okrs.ok(v)
        })
        .catch((e) => handle(e, extra)) as Promise<R>
    }
    if (isEither(v)) {
      return v as R
    }
    return okrs.ok(v) as R
  } catch (e) {
    return handle(e, extra) as R
  }
}

// export function coerce<R, L extends string>(
//   fn: () => NotAPromise<R | Fail<L>>,
//   extra?: any,
// ): Either<R, L | string> {
//   try {
//     const v = fn()
//     if (v instanceof Fail) {
//       return v
//     }
//     return okrs.ok(v)
//   } catch (e) {
//     return handle(e, extra)
//   }
// }

export function coerceAsync<R, L extends string>(
  fn: () => Promise<R | Fail<L>>,
  extra?: any,
): Promise<Either<R, L | string>> {
  return fn().then(
    (v) => {
      if (v instanceof Fail) {
        return v
      }
      return okrs.ok(v)
    },
    (e) => handle(e, extra),
  )
}
