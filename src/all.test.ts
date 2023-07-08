import { all } from './all';
import { ok } from './ok';
import { Either } from './types';



describe('all', () => {
  it('async', async () => {
    
    const kr = await all([
      ok(1),
      ok(false),
      Promise.resolve(ok(1)),
      Promise.resolve(ok(false)),
    ])
    
    expect(kr).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": [
          1,
          false,
          1,
          false,
        ],
        "warnings": [],
      }
    `)

  });

  it('sync', async () => {
    
    function foobar<T>(v: T): Either<T> {
      if (process.env.FOOBAR) {
        return ok(v)
      }
      return ok(v)
    }

    const kr = all([
      foobar(1),
      foobar(false),
    ])
    
    expect(kr).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": [
          1,
          false,
        ],
        "warnings": [],
      }
    `)

  });
});


