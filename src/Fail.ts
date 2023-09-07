export interface IExtra {
  [key: string]: any;
  status?: number;
  feedback?: any;
  issues?: Array<{
    message: string;
    path: Array<string | number>;
  }>;
}

export class Fail<
  L extends string = string,
  R extends any = any,
> extends Error {
  public readonly success = false;
  public readonly value = null;
  public readonly _kr = 'fail';
  public readonly extra: IExtra;
  public readonly status: number;
  public readonly feedback: any;

  constructor(
    public readonly code: L,
    extra?: IExtra | null
  ) {
    super(
      extra && Object.entries(extra).length
        ? `${code} \n${JSON.stringify(extra, null, 2)}`
        : code
    );
    this.feedback = extra?.feedback || null;
    this.status = extra?.status || 500;
    this.extra = extra || {};
    // Known issue: https://github.com/microsoft/TypeScript/issues/13965
    Object.setPrototypeOf(this, Fail.prototype);
  }

  strict(): R {
    // eslint-disable-next-line no-throw-literal
    throw this;
  }
}

export function fail<L extends string | 'fail'>(
  code: L = 'fail' as L,
  extra?: IExtra | null
) {
  return new Fail<typeof code>(
    code,
    extra && (JSON.parse(JSON.stringify(extra)) as IExtra)
  );
}
