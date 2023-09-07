import { Fail } from './Fail';
import { handle } from './handle';

// type ExtractValue<T> = T extends Either<infer V> ? V : never;
// type MapExtractValue<T> = ;

export async function handleAll<T extends Array<Promise<any>>>(
  promises: T
): Promise<Awaited<T[number]>[]> {
  return new Promise(async (resolve, reject) => {
    const krs = await Promise.all(
      promises.map((promise) => promise.catch(handle))
    );
    const fail = krs.find((kr) => kr instanceof Fail);
    if (fail) {
      return reject(fail);
    }
    resolve(krs);
  });
}
