import { ok } from './ok'
import {
  Either,
  EitherValue,
  Ok 
} from './types'
import { Fail, fail } from './Fail'
import { _catch } from './catch'
import { map } from './map'
import { parse } from './parse'
import { all } from './all'
import { props } from './props'
import { handle } from './handle'
import { coerce } from './coerce'
import { strict } from './strict'
import { addExtra } from './addExtra'
import { res } from './res'
import { zod } from './zod'
import { fromJson } from './fromJson'

export {
  ok,
  fail,
  map,
  parse,
  strict,
  addExtra,
  handle,
  all,
  props,
  coerce,
  Fail,
  res,
  zod,
  fromJson,
  _catch as catch,
}

export type { 
  Either,
  EitherValue,
  Ok,
}