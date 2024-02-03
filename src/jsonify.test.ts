import { Equals, assert } from 'tsafe';
import { okrs } from '.';
import { IFail, Ok } from './types';

describe('jsonify', () => {
  it('works', async () => {
    const ok = okrs.ok('ok');
    const fail = okrs.fail('fail');
    const fails: IFail[] = [];
    fails.push(fail);

    expect(JSON.stringify(fail, null, 2)).toMatchInlineSnapshot(`
      "{
        \\"_kr\\": \\"fail\\",
        \\"name\\": \\"Error\\",
        \\"code\\": \\"fail\\",
        \\"extra\\": {},
        \\"feedback\\": null,
        \\"message\\": \\"fail\\",
        \\"stack\\": \\"Error: fail\\\\n    at Module.fail (/Users/morgs32/GitHub/okrs/src/Fail.ts:67:10)\\\\n    at /Users/morgs32/GitHub/okrs/src/jsonify.test.ts:8:23\\\\n    at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:138:13\\\\n    at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:41:26\\\\n    at runTest (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:486:17)\\\\n    at runSuite (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:594:15)\\\\n    at runSuite (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:594:15)\\\\n    at runFiles (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:645:5)\\\\n    at startTests (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:654:3)\\\\n    at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/vitest@0.32.2/node_modules/vitest/dist/entry.js:278:7\\",
        \\"status\\": 500,
        \\"success\\": false,
        \\"value\\": null
      }"
    `);

    const ok1 = okrs.jsonify(ok);
    if (ok1.success) {
      assert<Equals<typeof ok1, Ok<string>>>();
    }
    if (!ok1.success) {
      assert<Equals<typeof ok1, Ok<string>>>();
    }
    expect(ok1).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": "ok",
      }
    `);
    expect(okrs.jsonify(fail)).toMatchInlineSnapshot(`
      {
        "_kr": "fail",
        "code": "fail",
        "extra": {},
        "feedback": null,
        "message": "fail",
        "stack": "Error: fail
          at Module.fail (/Users/morgs32/GitHub/okrs/src/Fail.ts:67:10)
          at /Users/morgs32/GitHub/okrs/src/jsonify.test.ts:8:23
          at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:138:13
          at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:41:26
          at runTest (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:486:17)
          at runSuite (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:594:15)
          at runSuite (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:594:15)
          at runFiles (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:645:5)
          at startTests (file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/@vitest+runner@0.32.2/node_modules/@vitest/runner/dist/index.js:654:3)
          at file:///Users/morgs32/GitHub/okrs/node_modules/.pnpm/vitest@0.32.2/node_modules/vitest/dist/entry.js:278:7",
        "status": 500,
        "success": false,
        "value": null,
      }
    `);
  });
});
