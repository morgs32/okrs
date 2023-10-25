import { okrs } from '.';

describe('json', () => {
  it('works', async () => {
    const ok = okrs.ok('ok');
    const fail = okrs.fail('fail');
    expect(okrs.json(ok)).toMatchInlineSnapshot(`
      {
        "_kr": "ok",
        "code": null,
        "success": true,
        "value": "ok",
      }
    `);
    expect(okrs.json(fail)).toMatchInlineSnapshot(`
      {
        "_kr": "fail",
        "code": "fail",
        "extra": {},
        "feedback": null,
        "message": "fail",
        "status": 500,
        "success": false,
        "value": null,
      }
    `);
    expect(okrs.json(fail, ['code', 'message'])).toMatchInlineSnapshot(`
      {
        "_kr": "fail",
        "extra": {},
        "feedback": null,
        "status": 500,
        "success": false,
        "value": null,
      }
    `);
  });
});
