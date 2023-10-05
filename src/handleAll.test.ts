import { handleAll } from './handleAll';
import { assert, Equals } from 'tsafe';

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

  it('types a tuple correctly', async () => {
    const result = await handleAll([Promise.resolve(1), Promise.resolve(true)]);
    assert<Equals<typeof result, [number, boolean]>>();
  });
});
