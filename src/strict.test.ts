import { assert } from './assert';
import { strict } from './strict';

describe('strict', () => {
  it('works', async () => {
    const a = strict(() => 1);
    expect(a).toBe(1);
    const b = strict(
      () => {
        if (!process.env.SOME_ENV) throw new Error('foobar');
        return 1;
      },
      () => 2
    );
    assert<number>(b);
    expect(b).toMatchInlineSnapshot('2');

    expect(() => {
      const b = strict(() => {
        if (!process.env.SOME_ENV) throw new Error('foobar');
        return 1;
      });
      assert<number>(b);
    }).toThrowErrorMatchingInlineSnapshot('"foobar"');
  });
});
