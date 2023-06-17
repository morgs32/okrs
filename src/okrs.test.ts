import { mapAsync, ok } from './okrs';


describe('okrs', () => {
  it('mapAsync', async () => {
    
    const items = [1, 2, 3]
    const kr = await mapAsync(items, async (item) => ok(item + 1))
    expect(kr).toEqual(ok([2, 3, 4]))

  });
});