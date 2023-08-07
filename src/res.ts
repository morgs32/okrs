import { Either } from './types';

export function res(kr: Either): Response {
  if (kr.success) {
    return new Response(kr.value, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(
    process.env.NODE_ENV === 'production' ? kr.code : kr.stack,
    {
      status: kr.status || 500,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
