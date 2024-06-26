import { okrs } from "."

export async function batch<T, R>(
  items: Array<T>,
  fn: (item: T, count: number) => Promise<R>,
  size: number = 100,
): Promise<R[]> {
  let count = 0
  const batches: Array<Array<R>> = []
  const remaining = [...items]
  while (remaining.length > 0) {
    let batch: Array<Promise<any>> = []
    while (batch.length < size && remaining.length > 0) {
      const v = remaining.shift()!
      batch.push(fn(v, count))
      count++
    }
    batches.push(await okrs.all(batch))
  }
  return batches.flat()
}
