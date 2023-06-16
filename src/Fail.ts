import {
  FailIssue, 
  Result 
} from './types';
import { Either, coerce } from './kr';

export interface FailJson {
  success: false
  code: string
  extra: Record<string, any> | null
  issues: Array<FailIssue>
}

export class Fail<L extends string = string> extends Error implements Result {

  public readonly success = false
  public readonly value = null

  constructor(
    public errorCode: L,
    public extra: Record<string, any> | null = null,
    public issues: Array<FailIssue> = [],
  ) {
    super(extra ? `${errorCode} ${JSON.stringify(extra, null, 2)}` : errorCode)
    // Known issue: https://github.com/microsoft/TypeScript/issues/13965
    Object.setPrototypeOf(this, Fail.prototype);
  }

  addExtra(extra: Record<string, any>): Fail<L> {
    const newFail = new Fail(
      this.errorCode,
      {
        ...this.extra,
        ...extra,
      },
      this.issues,
    )
    newFail.stack = this.stack?.replace(this.message, newFail.message)
    return newFail
  };

  addPath(path: Array<string | number>): Fail<L> {
    const newFail = new Fail(
      this.errorCode,
      this.extra,
      this.issues.map((issue) => {
        return {
          ...issue,
          path: [...path, ...issue.path],
        }
      })
    )
    newFail.stack = this.stack?.replace(this.message, newFail.message)
    return newFail
  };

  addIssues(issues: Array<FailIssue> = []): Fail<L> {
    const newFail = new Fail(
      this.errorCode,
      this.extra,
      [...this.issues, ...issues]
    )
    newFail.stack = this.stack?.replace(this.message, newFail.message)
    return newFail
  };

  strict(): never {
    // eslint-disable-next-line no-throw-literal
    throw this
  }

  makeJson(): FailJson {
    return {
      success: false,
      code: this.errorCode,
      extra: this.extra,
      issues: this.issues,
    }
  }

  catch<R2>(onFail: (kr: Fail) => R2): Either<R2> {
    return coerce(() => onFail(this))
  }

  useFail<R2>(onFail: (kr: Fail) => R2): Fail<L> {
    onFail(this)
    return this
  }

}
