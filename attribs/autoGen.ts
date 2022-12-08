import { primKey } from "./primKey.js";

export function autoGen<T>(type: T) {
  return primKey(type, { autoGen: true });
}
