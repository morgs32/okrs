import { handle } from './handle';


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
});