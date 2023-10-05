import { Fail } from './Fail';
import { handle } from './handle';

export async function handleAll<T extends [...any[]]>(
  promises: [...T]
): Promise<UnwrapPromises<T>> {
  return new Promise(async (resolve, reject) => {
    const krs = await Promise.all(
      promises.map((promise) => promise.catch(handle))
    );
    const fail = krs.find((kr) => kr instanceof Fail);
    if (fail) {
      return reject(fail);
    }
    resolve(krs as any);
  });
}

type UnwrapPromises<T extends [...any[]]> = T extends [
  infer Head,
  ...infer Tail,
]
  ? [UnwrapPromise<Head>, ...UnwrapPromises<Tail>]
  : [];
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
