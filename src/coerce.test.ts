import { assert } from './assert';
import { coerce } from './coerce';
import { Either } from './types';

describe('coerce', () => {
  it('works', async () => {
    const a = coerce(() => 1);

    const b = await coerce(() => Promise.resolve(1));

    const c = await coerce(() => {
      if (process.env.NODE_ENV === 'production') {
        return 1;
      }
      return Promise.resolve(1);
    });
    expect(a).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "strict": [Function],
        "success": true,
        "value": 1,
      }
    `);
    expect(b).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "strict": [Function],
        "success": true,
        "value": 1,
      }
    `);
    expect(c).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "strict": [Function],
        "success": true,
        "value": 1,
      }
    `);
  });

  it('with extra', async () => {
    const a = coerce(
      () => {
        if (process.env.NODE_ENV === 'production') {
          return 1;
        }
        throw new Error('fail');
      },
      {
        foo: 'bar',
      }
    );
    assert<Either<number>>(a);

    expect(a).toMatchInlineSnapshot(`
      [Error: fail {
        "foo": "bar"
      }]
    `);
  });
});
