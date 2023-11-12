import { okrs } from '.';

describe('batch', () => {
  it('works', async () => {
    const results = await okrs.batch([1, 2, 3], async (i) => i * 2, 2);
    console.log('results', results);
    expect(results).toEqual([2, 4, 6]);
  });
});
