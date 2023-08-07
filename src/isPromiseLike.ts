/**
 * Helper to test if an object is a Promise.
 *
 * Taken from https://github.com/ssnau/xkit/blob/master/util/is-promise.js,
 * as suggested by https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise
 * as is plausible considering https://promisesaplus.com/#point-53
 */
export function isPromiseLike(v: unknown): v is PromiseLike<unknown> {
  return (
    !!v &&
    (typeof v === 'object' || typeof v === 'function') &&
    typeof (v as any).then === 'function'
  );
}
