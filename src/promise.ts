import { handle } from './handle';
import { ok } from './ok';
import { Either } from './types';

export async function promise<R>(promise: Promise<R>): Promise<Either<R>> {
  return promise.then((v) => ok(v)).catch(handle);
}
