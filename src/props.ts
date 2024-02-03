import { okrs } from "."
import { isPromiseLike } from "./isPromiseLike"

export async function props<T>(props: T) {
  const results = {} as {
    [K in keyof T]: T[K] extends Promise<infer R> ? R : never
  }
  const promises: PromiseLike<any>[] = []
  for (const key in props) {
    let value: any = props[key]
    if (!isPromiseLike(value)) {
      continue
    }
    const promise = value.then((v: any) => {
      results[key] = v
    })
    promises.push(promise)
  }
  return okrs.all(promises).then(() => {
    return results
  })
}
