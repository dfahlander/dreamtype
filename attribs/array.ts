import type { ConstructorToValue } from "../typings/ConstructorToValue.js";
import { TypeOptions } from "../typings/TypeOptions.js";
import { _type } from "../engine/_type";

export function array<T>(
  type: T,
  typeOptions?: TypeOptions<ConstructorToValue<T>[]>
): ConstructorToValue<T>[] {
  return _type(Array, {
    ...typeOptions,
    kind: "array",
    itemType: _type(type),
  });
}
