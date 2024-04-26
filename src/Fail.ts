export interface IExtra {
  [key: string]: any
  status?: number
  feedback?: string
  issues?: Array<{
    message: string
    path: Array<string | number>
  }>
}

export interface IFail<L extends string = string> {
  code: L
  success: false
  value: null
  _kr: "fail"
  extra: IExtra
  status: number
  feedback: string | null
}

export class Fail<L extends string = string>
  extends Error
  implements Readonly<IFail<L>>
{
  public readonly success = false
  public readonly value = null
  public readonly _kr = "fail"
  public readonly extra: IExtra
  public readonly status: number
  public readonly feedback: string | null

  constructor(
    public readonly code: L,
    extra?: IExtra | null,
  ) {
    super(
      extra && Object.entries(extra).length
        ? `${code} ${JSON.stringify(extra, null, 2)}`
        : code,
    )
    this.feedback = extra?.feedback || null
    this.status = extra?.status || 500
    this.extra = extra || {}
    // Known issue: https://github.com/microsoft/TypeScript/issues/13965
    Object.setPrototypeOf(this, Fail.prototype)
    Object.defineProperties(this, {
      success: { enumerable: false },
      value: { enumerable: false },
      _kr: { enumerable: false },
      extra: { enumerable: false },
      status: { enumerable: false },
      feedback: { enumerable: false },
      code: { enumerable: false },
    })
  }
}

export function fail<L extends string | "fail">(
  code: L = "fail" as L,
  extra?: IExtra | null,
) {
  return new Fail<typeof code>(
    code,
    extra && (JSON.parse(JSON.stringify(extra)) as IExtra),
  )
}
