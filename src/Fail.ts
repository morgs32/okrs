
export type FailIssue = {
  message: string;
  path: Array<string | number>;
}

export class Fail<L extends string = string> extends Error {

  public readonly success = false
  public readonly value = null

  constructor(
    public code: L,
    public extra: Record<string, any> | null = null,
    public issues: Array<FailIssue> = [],
  ) {
    super(extra ? `${code} \n${JSON.stringify(extra, null, 2)}` : code)
    // Known issue: https://github.com/microsoft/TypeScript/issues/13965
    Object.setPrototypeOf(this, Fail.prototype);
  }

}


export function fail<L extends string | 'fail'>(
  code: L = 'fail' as L,
  extra: Record<string, any> | null = null,
  issues: Array<FailIssue> = []
) {
  return new Fail<typeof code>(
    code,
    extra,
    issues
  );
}
