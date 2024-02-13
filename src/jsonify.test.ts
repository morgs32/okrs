import { Equals, assert } from "tsafe"
import { okrs } from "."
import { IFail, Ok } from "./types"

describe("jsonify", () => {
  it("works", async () => {
    const ok = okrs.ok("ok")
    const fail = okrs.fail("fail")
    const fails: IFail[] = []
    fails.push(fail)

    expect(JSON.stringify(fail, null, 2)).toMatchInlineSnapshot(`"{}"`)

    const ok1 = okrs.jsonify(ok)
    if (ok1.success) {
      assert<Equals<typeof ok1, Ok<string>>>()
    }
    if (!ok1.success) {
      assert<Equals<typeof ok1, Ok<string>>>()
    }
    expect(ok1).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": "ok",
      }
    `)
    expect(okrs.jsonify(fail)).toMatchInlineSnapshot(`
      {
        "_kr": "fail",
        "code": "fail",
        "extra": {},
        "feedback": null,
        "message": "fail",
        "stack": "Error: fail
          at Module.fail (/Users/morgs32/GitHub/okrs/src/Fail.ts:62:10)
          at /Users/morgs32/GitHub/okrs/src/jsonify.test.ts:8:23
          at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@1.2.2/node_modules/@vitest/runner/dist/index.js:128:14
          at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@1.2.2/node_modules/@vitest/runner/dist/index.js:59:26
          at runTest (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@1.2.2/node_modules/@vitest/runner/dist/index.js:675:17)
          at runSuite (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@1.2.2/node_modules/@vitest/runner/dist/index.js:793:15)
          at runSuite (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@1.2.2/node_modules/@vitest/runner/dist/index.js:793:15)
          at runFiles (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@1.2.2/node_modules/@vitest/runner/dist/index.js:842:5)
          at startTests (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@1.2.2/node_modules/@vitest/runner/dist/index.js:851:3)
          at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/vitest@1.2.2_@types+node@20.11.16/node_modules/vitest/dist/chunks/runtime-runBaseTests.QReNMrJA.js:114:7",
        "status": 500,
        "success": false,
        "value": null,
      }
    `)
  })
})
