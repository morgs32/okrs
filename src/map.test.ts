import { map } from './map';



describe('map', () => {
  
  it('sync', async () => {
    const kr = map([1, 2], (a) => a)
    expect(kr).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": [
          1,
          2,
        ],
      }
    `)

  });

  it('async', async () => {
    const kr = await map([1, 2], async (a) => a)
    expect(kr).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": [
          1,
          2,
        ],
      }
    `)

  });
});


