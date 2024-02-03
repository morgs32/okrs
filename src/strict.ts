import { NotAPromise, NotAnEither } from "./types"
import { isPromiseLike } from "./isPromiseLike"
import { okrs } from "."

export function strict<T>(
  fn: () => PromiseLike<NotAnEither<T>>,
  extra?: Record<string, unknown>,
): Promise<T>
export function strict<T>(
  fn: () => NotAPromise<NotAnEither<T>>,
  extra?: Record<string, unknown>,
): T
export function strict<T>(
  fn: () => NotAPromise<NotAnEither<T>> | PromiseLike<NotAnEither<T>>,
  extra?: Record<string, unknown>,
): T | Promise<T> {
  try {
    const v = fn()
    if (isPromiseLike(v)) {
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
