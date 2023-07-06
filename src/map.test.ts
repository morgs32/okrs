import { map } from './map';



describe('map', () => {
  
  it('sync', async () => {
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

  it('async', async () => {
    const kr = await map([1, 2], async (a) => a)
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


