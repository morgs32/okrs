import { Ok } from "./types"

export function ok<R>(value: R): Ok<R> {
  return {
    success: true,
    code: null,
    value,
    _kr: "ok",
  }
}
