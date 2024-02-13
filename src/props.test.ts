import { okrs } from "."

describe("props", () => {
  it("works", async () => {
    const props = {
      a: Promise.resolve(1).then((v) => v.toString()),
      b: Promise.resolve(2),
    }

    const result = await okrs.props(props)
    expect(result).toMatchInlineSnapshot(`
      {
        "a": "1",
        "b": 2,
      }
    `)
  })

  it("throws", async () => {
    const props = {
      a: Promise.resolve(1),
      b: Promise.reject(2),
    }

    await expect(() => {
      return okrs.props(props)
    }).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: 2]`)
  })
})
