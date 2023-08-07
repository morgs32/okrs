import { assert } from './assert';
import { strict } from './strict';

describe('strict', () => {
  it('works', async () => {
    const a = strict(() => 1);
    expect(a).toBe(1);
    expect(() => {
      const b = strict(
        () => {
          if (!process.env.SOME_ENV) throw new Error('foobar');
          return 1;
        },
        {
          foo: 'bar',
        }
      );
      assert<number>(b);
    }).toThrowError('foobar');

    expect(() => {
      const b = strict(
        () => {
          if (!process.env.SOME_ENV) throw new Error('foobar');
          return 1;
        },
        {
          foo: 'bar',
        }
      );
      assert<number>(b);
    }).toThrowErrorMatchingInlineSnapshot(`
      "foobar 
      {
        \\"foo\\": \\"bar\\"
      }"
    `);
  });
});
