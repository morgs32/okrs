import { handle } from './handle';
import { Fail } from './Fail';

export async function handleProps<T extends { [k: string]: Promise<any> }>(
  props: T
) {
  const results = {} as {
    [K in keyof T]: T[K] extends Promise<infer R> ? R : never;
  };
  const promises: Promise<any>[] = [];
  let fail: Fail | undefined;
  for (const key in props) {
    promises.push(
      // eslint-disable-next-line no-loop-func
      props[key as keyof T].catch(handle).then((v) => {
        if (v instanceof Fail && !fail) {
          fail = v;
        }
        results[key] = v;
      })
    );
  }
  if (promises.length) {
    await Promise.all(promises);
  }
  if (fail) {
    throw fail;
  }
  return results;
}
