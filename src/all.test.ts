import { all } from './all';
import { assert, Equals } from 'tsafe';

describe('all', () => {
  it('works', async () => {
    await expect(() => {
      return all([Promise.resolve(1), Promise.reject(2)]);
    }).rejects.toThrowErrorMatchingInlineSnapshot('"2"');

    const result = await all([Promise.resolve(1), Promise.resolve(2)]);
    expect(result).toMatchInlineSnapshot(`
      [
        1,
        2,
      ]
    `);
  });

  it('types a tuple correctly', async () => {
    const result = await all([
      Promise.resolve(1),
      Promise.resolve('string'),
      Promise.resolve(1),
      Promise.resolve(true),
    ]);
    assert<Equals<typeof result, [number, string, number, boolean]>>();
  });

  it('types an array correctly', async () => {
    const promises = [1, 2].map((n) => Promise.resolve(n));
    const result = await all(promises);
    assert<Equals<typeof result, number[]>>();
  });
});
