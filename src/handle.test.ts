import { z } from 'zod';
import { handle } from './handle';
import { strict } from './strict';


describe('handle', () => {
  it('works', async () => {
    
    const a = handle(new Error('fail'), {
      foo: 'bar'
    })
    
    expect(a).toMatchInlineSnapshot(`
      [Error: fail 
      {
        "foo": "bar"
      }]
    `)

  });

  it('looking at logs', async () => {
    let err
    try {
      strict(() => z.string({
        invalid_type_error: 'x-lhc-workspace-key header is required',
      }).parse(null))
    }
    catch (e) {
      console.error(e)
      err = e
    }
    expect(err).toMatchInlineSnapshot(`
      [Error: x-lhc-workspace-key header is required 
      {}]
    `)
  });
});