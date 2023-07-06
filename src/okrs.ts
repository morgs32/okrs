import { ok } from './ok'
import { Either } from './types'
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
  _catch as catch,
}

export type { 
  Either,
}