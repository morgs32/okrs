![okrs](okrs.png)


- [Background](#background)
- [Quickstart](#quickstart)
  - [Instead of try/catch](#instead-of-trycatch)
  - [Handle specific failures](#handle-specific-failures)
  - [Handle rejection(s) in list of promises](#handle-rejections-in-list-of-promises)
- [Types](#types)
  - [`type Either<R, C> = Ok<R> | <Fail<C>`](#type-eitherr-c--okr--failc)
  - [`type Ok<T>`](#type-okt)
  - [`type Fail<C>`](#type-failc)
- [Methods](#methods)
  - [`okrs.ok(R): Ok<R>`](#okrsokr-okr)
  - [`okrs.fail(C, Extra): Fail<C>`](#okrsfailc-extra-failc)
  - [`okrs.map()`](#okrsmap)
  - [`okrs.all()`](#okrsall)
  - [`okrs.props()`](#okrsprops)
  - [`okrs.strict()`](#okrsstrict)


## Background

This is a "result class" library. It's for handling runtime errors gracefully without try-catch statementscommunicating .

Here's the pain:

> **Do you ever find yourself wondering where exactly you should throw an error to be consumed by a try-catch? Do you sometimes end up having multiple layers of try-catch blocks? Should you just return null instead?**
> — Khalil Stemmler (https://khalilstemmler.com/articles/enterprise-typescript-nodejs/handling-errors-result-class/)

See the whole article from Khalil for his version of a result class that can address the problem.

Also notice that programming languages like Elm guarantee no runtime exceptions with a similar pattern (https://guide.elm-lang.org/error_handling/).

## Quickstart

One of these:

```
pnpm add okrs // yarn add okrs // npm install okrs
```

Then 
```
import { okrs } from 'okrs'
```

### Instead of try/catch

```
const $kr = okrs.coerce(() => {
  return mightFailFn() as string
})

if (!$kr.success) {
  // Then handle error
  return
}
const value = $kr.value  // This will be type "string" if we return in the if block
```

### Handle specific failures

```
function fragileFn(): okrs.Either<string, 'error-code-1' | 'error-code-2'> {
  if (process.env.FOO === 1) {
    return okrs.fail('error-code-1')
  }
  if (process.env.FOO === 2) {
    return okrs.fail('error-code-2')
  }
  return okrs.ok('success')
}

function main() {
  const $kr = fragileFn()
  if (!$kr.success) {
    switch ($kr.code) {
      case 'error-code-1':
        return 'fallback-1';
      case 'error-code-2':
        return 'fallback-2';
      default:
        throw $kr
    }
  }
  return $kr.value
}

```

### Handle rejection(s) in list of promises
How do you handle errors in `Promise.all`? You can't really. Read about the headache here:
https://stackoverflow.com/questions/30362733/handling-errors-in-promise-all

But with this utility it's easy:
```
const $kr = okrs.map([1, 2], async (num) => {
  await sleep(num)
  if (num % 2 === 1) {
    throw new Error('1 is no good')
  }
  return num
}) : Either<number[]>
```
It knows to wait until all the promises are resolved AND handles multiple failures.

## Types

### `type Either<R, C> = Ok<R> | <Fail<C>`

Your functions should return this type or `Promise<Either<T, C>>`. Then the implementation logic can discriminate 
using `.success`:
- If `.success` is false, then you have a `Fail<C>` object
- If `.success` is true, then you have an `Ok<T>` object

### `type Ok<T>`
```
type Ok<R> {
  success: true;
  code: null;
  value: R;
}
```
### `type Fail<C>`
```
type Fail<C> {
  success: false;
  code: C;
  value: null;
  status: number
  extra: any // See [extra](#extra)
}
```

## Methods

### `okrs.ok(R): Ok<R>`
This is how you return an `Ok` object.

### `okrs.fail(C, Extra): Fail<C>`
Call this to return a `Fail` object.

### `okrs.map()`
This is the recommended way to map through a list and create a series of promises to run in parallel. This returns 
a single `Either` or `Promise<Either>`. The `Ok` value will be the list of results if all promises resolve. If any 
promise rejects than you'll get back a `Fail` with the first error code/message from the series.
```
const $kr = okrs.map([1, 2], async (num) => {
  await sleep(num)
  if (num % 2 === 1) {
    throw new Error('1 is no good')
  }
  return num
}) : Either<number[]>
```

### `okrs.all()`
This 

```
const kr = await okrs.all([
  ok(1),
  ok(false),
  Promise.resolve(ok(1)),
  Promise.resolve(ok(false)),
]): Promise<{
  "success": true,
  "value": [
    1,
    false,
    1,
    false,
  ],
}>
```

### `okrs.props()`
- Like [`.all`](#okrsall) but for object properties instead of iterated values.
- It can take async or syncrounous functions and return a Promise appropriately
```
const kr = await okrs.props({
  a: ok(1),
  b: ok(false),
  c: sleep(1).then(() => ok(1)),
  d: sleep(2).then(() => ok(false)),
}): Promise<{
  "success": true,
  "value": {
    "a": 1,
    "b": false,
    "c": 1,
    "d": false,
  }
}>
```

### `okrs.strict()`

This will immediately invoke the function argument and throw if a `Fail` object is returned. It will also turn any 
uncaught errors into `Fail` objects, before throwing those.

```
const b = strict(
  () => {
    if (!process.env.SOME_ENV) throw new Error('foobar');
    return 1;
  },
  {
    foo: 'bar',
  }
)
```

This will throw the following error:
```
Fail {
  success: false
  code: 'foobar',
  extra; {
    foo: 'bar'
  }
}
```