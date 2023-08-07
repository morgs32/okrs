// sleep function returns a promise that resolves after a given time
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
