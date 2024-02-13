import { z } from "zod"
import { handle } from "./handle"
import { strict } from "./strict"
import { fail } from "./Fail"

describe("handle", () => {
  it("works", async () => {
    const a = handle(new Error("foobar"), {
      foo: "bar",
    })
    expect(a).toMatchInlineSnapshot(`
      [Error: foobar {
        "foo": "bar"
      }]
    `)
  })

  it("with extra", async () => {
    const f1 = fail("foobar", {
      a: "a",
    })
    const f2 = handle(f1, {
      b: "b",
    })

    expect(f2).toMatchInlineSnapshot(`
      [Error: foobar {
        "a": "a"
      }]
    `)
  })

  it("looking at logs", async () => {
    let err
    try {
      strict(() =>
        z
          .string({
            invalid_type_error: "x-lhc-workspace-key header is required",
          })
          .parse(null),
      )
    } catch (e) {
      // console.error(e)
      err = e
    }
    expect(err).toMatchInlineSnapshot(
      `
      [Error: [
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "null",
          "path": [],
          "message": "x-lhc-workspace-key header is required"
        }
      ]]
    `,
    )
  })
})
