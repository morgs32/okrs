import { okrs } from "."

describe("okrs", () => {
  it("switch on kr.code", () => {
    const value = (() => {
      const kr = okrs.fail("1") as okrs.Either<1>
      if (!kr.success) {
        switch (kr.code) {
          case "error":
            return "error"
          default:
            return "default"
        }
      }
    })()
    expect(value).toEqual("default")
  })
})
