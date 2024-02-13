import { Equals, assert } from "tsafe"
import { okrs } from "."

describe("okrs", () => {
  it("can discriminator fails", async () => {
    const kr = okrs.ok("foo") as okrs.Either<string, "foo" | "bar">

    if (kr.success) {
      assert<Equals<okrs.Ok<string>, typeof kr>>()
    } else {
      assert<Equals<okrs.Fail<"foo"> | okrs.Fail<"bar">, typeof kr>>()
      if (kr.code === "foo") {
        assert<Equals<okrs.Fail<"foo">, typeof kr>>()
      } else {
        assert<Equals<okrs.Fail<"bar">, typeof kr>>()
      }
    }
  })
})
