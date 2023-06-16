import { z } from 'zod'
import { Fail, FailJson } from './Fail'
import { Ok } from './Ok'
import { FailIssue, Either } from './types'
import { isPromiseLike } from './isPromiseLike'

export function isEither(data: unknown): data is Either {
  return data instanceof Fail || data instanceof Ok
}

export type {
  Either,
  FailJson,
}

export {
  Ok,
  Fail,
}

export function ok<R>(value: R, warnings: Array<FailIssue> = []): Ok<R> {
  return new Ok(
    value,
    warnings
  )
}

export function fail<L extends string | 'fail'>(
  code: L = 'fail' as L,
  extra: Record<string, any> | null = null,
  issues: Array<FailIssue> = []
) {
  return new Fail<typeof code>(
    code,
    extra,
    issues,
  )
}

export const right = ok
export const left = fail

type EitherLike<T> = T | Either<T>

export function isEitherLike(v: unknown): v is EitherLike<unknown> {
  return v instanceof Ok || v instanceof Fail
}

export function coerce<T>(asyncBlock: () => PromiseLike<EitherLike<T>>): PromiseLike<Either<T>>
export function coerce<T>(block: () => EitherLike<T>): Either<T>
export function coerce<T>(fn: (() => EitherLike<T> | PromiseLike<EitherLike<T>>)): Either<T> | PromiseLike<Either<T>> {
  function onSuccess(v: EitherLike<T>): Either<T> {
    if (v instanceof Ok || v instanceof Fail) {
      return v
    }
    return ok(v)
  }
  try {
    const v = fn()
    if (isPromiseLike(v)) {
      return v.then(onSuccess, handle)
    }
    return onSuccess(v)
  } catch (e) {
    return handle(e)
  }
}

export function parse<T>(result: Either<T>) {
  // if (!isEither(result)) {
  //   throw new Error('Not a kr.Either')
  // }
  if (!result.success) {
    throw result
  }
  return result.value
}

export function handle(e: any, issues: Array<FailIssue> = []) {
  if (e instanceof Fail) {
    return e
  }
  if (e instanceof z.ZodError) {
    const fail = new Fail(
      e.issues[0].message,
      null,
      issues.concat(
        e.issues.map((issue) => {
          return {
            received: null, // Just setting a default. Hopefully the ZodIssue has a received value.
            ...issue,
          }
        })
      ),
    )
    fail.stack = e.stack
    return fail
  }
  if (e instanceof Error) {
    const fail = new Fail(e.message, null, issues)
    fail.stack = e.stack
    return fail
  }
  return new Fail('fail')
}


export function props<T extends { [k: string]: Either<any> }>(props: T): Either<{
  [K in keyof T]: T[K] extends Either<infer R> ? R : never
}> {
  const results = {} as { [K in keyof T]: T[K] extends Either<infer R> ? R : never }
  let fails: Array<Fail> = []
  for (const key in props) {
    const kr = props[key]
    if (kr instanceof Fail) {
      fails.push(kr.addPath([key]))
    }
    else {
      results[key] = kr.value
    }
  }
  if (fails.length > 0) {
    return fails[0]
  }
  return ok(results)
}

export function all<T extends Either<any>[]>(krs: T): Either<{ [P in keyof T]: T[P] extends Either<infer V> ? V : never }> {
  const results: Array<any> = []
  let fails: Array<Fail> = []
  for (const kr of krs) {
    if (kr instanceof Fail) {
      fails.push(kr)
    }
    else {
      results.push(kr.value)
    }
  }
  if (fails.length > 0) {
    return handle(fails[0], fails.reduce((a, fail) => a.concat(fail.issues), [] as Array<FailIssue>))
  }
  return ok(results as { [P in keyof T]: T[P] extends Either<infer V> ? V : never })
}
