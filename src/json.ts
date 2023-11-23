import { Either, JsonEither } from './types';

export function json<T extends Either>(kr: T): JsonEither<T> {
  let properties = Object.getOwnPropertyNames(kr);
  return properties.reduce((acc, key) => {
    acc[key] = kr[key as keyof T];
    return acc;
  }, {} as any);
}
