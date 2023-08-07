import { fail } from './Fail';
import { _catch } from './catch';
import { coerce } from './coerce';

describe('catch', () => {
  it('works', async () => {
    const a = coerce(() => {
      if (process.env.NODE_ENV === 'production') {
        return 1;
      }
      throw fail('foobar');
    });
    const b = _catch(a, () => {
      return 'foobar';
    });
    expect(b).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": "foobar",
      }
    `);
  });
});
