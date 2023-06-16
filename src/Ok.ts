import { Fail } from './kr';
import {
  FailIssue,
  NotAPromise,
  Result 
} from './types';

export class Ok<R = any> implements Result {
  
  readonly success = true;
  readonly errorCode = null;
  
  constructor(
    public value: R,
    public warnings: Array<FailIssue> = [],
  ) {}

  addExtra(): Ok<R> {
    return this
  }  

  addPath(): Ok<R> {
    return this
  }

  addIssues(): Ok<R> {
    return this
  }

  strict() {
    return this.value
  }

  catch(_: (kr: Fail) => NotAPromise<R>): Ok<R> {
    return this
  }

  useFail(_: (kr: Fail) => any): Ok<R> {
    return this
  }
}
