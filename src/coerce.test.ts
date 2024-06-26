import { assert, Equals } from "tsafe"
import { coerce } from "./coerce"
import { Either, Fail } from "./types"
import { okrs } from "."

describe("coerce", () => {
  it("works", async () => {
    const a = coerce(() => 1)

    const b = await coerce(() => Promise.resolve(1))

    const c = await coerce(async () => {
      if (process.env.NODE_ENV === "production") {
        return 1
      }
      return 1
    })
    expect(a).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": 1,
      }
    `)
    expect(b).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": 1,
      }
    `)
    expect(c).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": 1,
      }
    `)
  })

  it("with extra", async () => {
    const a = coerce(
      () => {
        if (process.env.NODE_ENV === "production") {
          return 1
        }
        throw new Error("fail")
      },
      {
        foo: "bar",
      },
    )
    assert<Equals<Either<number>, typeof a>>()

    expect(a).toMatchInlineSnapshot(`
      [Error: fail {
        "foo": "bar"
      }]
    `)
  })

  it("with Eithers", async () => {
    const a = coerce(() => {
      if (process.env.NODE_ENV === "production") {
        return okrs.ok(1)
      }
      return new Fail("fail")
    })
    assert<Equals<Either<number, "fail"> | Fail, typeof a>>()

    expect(a).toMatchInlineSnapshot(`[Error: fail]`)
  })
})
