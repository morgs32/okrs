import { NotAPromise, NotAnEither } from "./types"
import { isPromise } from "./isPromise"
import { okrs } from "."

export function strict<T>(
  fn: () => Promise<NotAnEither<T>>,
  extra?: Record<string, unknown>,
): Promise<T>
export function strict<T>(
  fn: () => NotAPromise<NotAnEither<T>>,
  extra?: Record<string, unknown>,
): T
export function strict<T>(
  fn: () => NotAPromise<NotAnEither<T>> | Promise<NotAnEither<T>>,
  extra?: Record<string, unknown>,
): T | Promise<T> {
  try {
    const v = fn()
    if (isPromise(v)) {
      return v.then(
        (v) => Promise.resolve(v),
        (e) => {
          throw okrs.handle(e, extra)
        },
      ) as Promise<T>
    }
    return v
  } catch (e) {
    throw okrs.handle(e, extra)
  }
}
