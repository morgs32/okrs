import { fail } from './Fail';


describe('Fail', () => {
  it('works', async () => {
    
    const kr = fail('foobar', {
      date: new Date('2020-01-01'),
    })

    expect(kr).toMatchInlineSnapshot(`
      [Error: foobar 
      {
        "date": "2020-01-01T00:00:00.000Z"
      }]
    `)

    expect(kr.extra).toEqual({
      date: new Date('2020-01-01').toISOString(),
    })

  });

});