import { fail } from './Fail';


describe('Fail', () => {
  it('works', async () => {
    
    const kr = fail('foobar', {
      date: new Date('2020-01-01'),
    })

    expect(kr.extra).toEqual({
      date: new Date('2020-01-01').toISOString(),
    })

  });
});