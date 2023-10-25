import { Either, Jsonify } from './types';

export function json<T extends Either>(
  kr: T,
  hide: Array<'feedback' | 'status' | 'code' | 'message'> = []
): Jsonify<T> {
  let properties = Object.getOwnPropertyNames(kr);
  return properties.reduce((acc, key) => {
    if (![...hide, 'stack'].includes(key)) {
      acc[key] = kr[key as keyof T];
    }
    return acc;
  }, {} as any);
}
