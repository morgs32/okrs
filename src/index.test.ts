import { okrs } from '.';


describe('okrs', () => {


  it('mapAsync', async () => {
    const items = [1, 2, 3]
    const kr = await okrs.map(items, async (item) => okrs.ok(item + 1))
    expect(kr).toEqual(okrs.ok([2, 3, 4]))
  });

  it('switch on kr.code', () => {
    const value = (() => {
      const kr = okrs.fail('1') as okrs.Either<1>
      if (!kr.success) {
        switch (kr.code) {
          case 'error':
            return 'error'
          default:
            return 'default'
        }
      }
    })()
    expect(value).toEqual('default')
  })

});

