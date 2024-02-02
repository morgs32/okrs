import { okrs } from '.';

describe('wrap', () => {
  it('works', async () => {
    const wrapped = okrs.wrap((a: number, b: number) => {
      if (a + b === 3) {
        return a + b;
      }
      throw new Error('fail');
    });
    const kr = wrapped(1, 2);
    expect(kr.value).toBe(3);

    expect(wrapped(1, 1)).toMatchInlineSnapshot('[Error: fail]');
  });
});
