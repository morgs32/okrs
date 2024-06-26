import { assert, Equals } from "tsafe"
import { okrs } from "."
import { Either, Fail } from "./types"

describe("wrap", () => {
  it("works", async () => {
    const wrapped = okrs.wrap((a: number, b: number) => {
      if (a + b === 3) {
        return a + b
      }
      throw new Error("foobar")
    })
    const kr = wrapped(1, 2)
    assert<Equals<Either<number>, typeof kr>>()
    expect(kr.value).toBe(3)

    expect(wrapped(1, 1)).toMatchInlineSnapshot(`[Error: foobar]`)
  })

  it("works with Eithers", async () => {
    const wrapped = okrs.wrap((a: number, b: number) => {
      if (a + b === 3) {
        return okrs.ok(a + b)
      }
      return okrs.fail("foobar")
    })
    const kr = wrapped(1, 2)
    assert<Equals<Either<number, "foobar"> | Fail, typeof kr>>()
    expect(kr.value).toBe(3)

    expect(wrapped(1, 1)).toMatchInlineSnapshot(`[Error: foobar]`)
  })

  it("works async", async () => {
    const wrapped = okrs.wrap(async (a: number, b: number) => {
      if (a + b === 3) {
        return a + b
      }
      throw new Error("foobar")
    })
    const kr = await wrapped(1, 2)
    assert<Equals<Either<number>, typeof kr>>()
    expect(kr.value).toBe(3)

    expect(await wrapped(1, 1)).toMatchInlineSnapshot(`[Error: foobar]`)
  })
})
