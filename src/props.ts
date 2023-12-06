import { isPromise } from 'util/types';
import { okrs } from '.';

export async function props<T>(props: T) {
  const results = {} as {
    [K in keyof T]: T[K] extends Promise<infer R> ? R : never;
  };
  const promises: Promise<any>[] = [];
  for (const key in props) {
    let value: any = props[key];
    if (!isPromise(value)) {
      continue;
    }
    const promise = value.then((v: any) => {
      results[key] = v;
    });
    promises.push(promise);
  }
  return okrs.all(promises).then(() => {
    return results;
  });
}
