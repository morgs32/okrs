import { Either, IJsonifyEither } from './types';

export function jsonify<T extends Either>(kr: T): IJsonifyEither<T> {
  let properties = Object.getOwnPropertyNames(kr);
  return properties.reduce((acc, key) => {
    acc[key] = kr[key as keyof T];
    return acc;
  }, {} as any);
}
