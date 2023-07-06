import { coerce } from './coerce';



describe('coerce', () => {
  it('works', async () => {
    
    const a = coerce(() => 1)

    const b = coerce(() => Promise.resolve(1))

    const c = await coerce(() => {
      if (process.env.NODE_ENV === 'production') {
        return 1
      }
      return Promise.resolve(1)
    })

  });
});