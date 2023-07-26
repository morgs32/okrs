export class Fail<L extends string = string> extends Error {

  public readonly success = false
  public readonly value = null
  public readonly _kr = 'fail'
  public readonly status: number

  constructor(
    public readonly code: L,
    public readonly extra: {
      [key: string]: any
      status?: number
    } = {},
  ) {
    super(isEmpty(extra) ? `${code} \n${JSON.stringify(extra, null, 2)}` : code)
    this.status = extra?.status || 500
    // Known issue: https://github.com/microsoft/TypeScript/issues/13965
    Object.setPrototypeOf(this, Fail.prototype);
  }

}

function isEmpty(obj: any) {
  return [Object, Array].includes((obj || {}).constructor) && !Object.entries((obj || {})).length
}

export function fail<L extends string | 'fail'>(
  code: L = 'fail' as L,
  extra: Record<string, any> | null = null,
) {
  return new Fail<typeof code>(
    code,
    extra && JSON.parse(JSON.stringify(extra)),
  );
}
