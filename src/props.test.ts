import { ok } from './ok';
import { props } from './props';
import { sleep } from './utils/sleep';



describe('props', () => {
  it('works', async () => {
    
    const kr = await props({
      a: ok(1),
      b: ok(false),
      c: sleep(1).then(() => ok(1)),
      d: sleep(2).then(() => ok(false)),
    })
    
    expect(kr).toMatchInlineSnapshot(`
      {
        "code": null,
        "success": true,
        "value": {
          "a": 1,
          "b": false,
          "c": 1,
          "d": false,
        },
        "warnings": [],
      }
    `)

  });
});


