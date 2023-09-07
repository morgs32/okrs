import { handleAll } from './handleAll';

describe('handleAll', () => {
  it('works', async () => {
    await expect(() => {
      return handleAll([Promise.resolve(1), Promise.reject(2)]);
    }).rejects.toThrowErrorMatchingInlineSnapshot('"2"');

    const result = await handleAll([Promise.resolve(1), Promise.resolve(2)]);
    expect(result).toMatchInlineSnapshot(`
      [
        1,
        2,
      ]
    `);
  });
});
