import { map } from './map';



describe('props', () => {
  it('works', async () => {
    
    const kr = map([1, 2], (a) => a)
    
    expect(kr).toMatchInlineSnapshot(`
      {
        "code": null,
        "success": true,
        "value": [
          1,
          2,
        ],
        "warnings": [],
      }
    `)

  });
});


