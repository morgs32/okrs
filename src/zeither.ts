import { z } from 'zod';
import { handle } from './handle';

const zfail = z.object({
  code: z.string(),
  success: z.literal(false),
  value: z.null(),
  _kr: z.literal('fail'),
  status: z.number(),
  extra: z.any().nullable(),
})

const zok = z.object({
  code: z.null(),
  success: z.literal(true),
  value: z.any(),
  _kr: z.literal('ok'),
})

export const zeither = z.union([zfail, zok], {
  invalid_type_error: 'Invalid kr',
  description: 'Are you sure this was created with the okrs library?'
})
  .transform((val) => {
    if (!val.success) {
      return handle(val)
    }
    return val
  })