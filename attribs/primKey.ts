import { ConstructorToValue } from "../typings/ConstructorToValue.js";
import { PrimaryKey } from "../typings/PrimaryKey";
import { PrimKeyOptions } from "../typings/TypeOptions.js";
import { _type } from "../engine/_type";

export function primKey<T>(
  type: T,
  options?: PrimKeyOptions<T>
): ConstructorToValue<T> & PrimaryKey<ConstructorToValue<T>> {
  return _type(type, { ...options, primKey: true });
}
