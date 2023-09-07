import { handleProps } from './handleProps';

describe('handleProps', () => {
  it('works', async () => {
    const props = {
      a: Promise.resolve(1),
      b: Promise.resolve(2),
    };

    const result = await handleProps(props);
    expect(result).toMatchInlineSnapshot(`
      {
        "a": 1,
        "b": 2,
      }
    `);
  });

  it('throws', async () => {
    const props = {
      a: Promise.resolve(1),
      b: Promise.reject(2),
    };

    await expect(() => {
      return handleProps(props);
    }).rejects.toThrowErrorMatchingInlineSnapshot('"2"');
  });
});
