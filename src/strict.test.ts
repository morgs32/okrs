import { assert, Equals } from "tsafe"
import { strict } from "./strict"

describe("strict", () => {
  it("works", async () => {
    expect(() => {
      const b = strict(() => {
        if (!process.env.SOME_ENV) throw new Error("foobar")
        return 1
      })
      assert<Equals<number, typeof b>>()
    }).toThrowErrorMatchingInlineSnapshot('"foobar"')
  })
})
