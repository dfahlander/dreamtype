const failures = {
  1: `Cannot pass null or undefined to type()`,
  2: `Only constructor function are valid arguments to type()`,
};

export function fail(num: number) {
  const error = failures[num];
  if (Array.isArray(error)) {
    throw error[0](error[1]);
  }
  throw TypeError(error);
}
