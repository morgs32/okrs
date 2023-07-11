import { z } from 'zod';
import { handle } from './handle';

const zissues = z.array(z.object({
  message: z.string(),
  path: z.array(
    z.union([z.string(), z.number()])
  )
}))

const zfail = z.object({
  code: z.string(),
  success: z.literal(false),
  value: z.null(),
  _kr: z.literal('fail'),
  status: z.number(),
  extra: z.any().nullable(),
  issues: zissues
})

const zok = z.object({
  code: z.null(),
  success: z.literal(true),
  value: z.any(),
  _kr: z.literal('ok'),
  warnings: zissues
})

export const zod = z.union([zfail, zok], {
  invalid_type_error: 'Invalid kr',
  description: 'Are you sure this was created with the okrs library?'
})
  .transform((val) => {
    if (!val.success) {
      return handle(val)
    }
    return val
  })