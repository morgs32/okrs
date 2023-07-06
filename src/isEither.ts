import { Either } from './types';


export function isEither(kr: unknown): kr is Either<unknown> {
  return typeof kr === 'object' && kr !== null && kr.hasOwnProperty('success') && kr.hasOwnProperty('value');
}
