import type { ConstructorToValue } from "../typings/ConstructorToValue.js";
import { TypeOptions } from "../typings/TypeOptions.js";
import { _type } from "../engine/_type";

export function union<T>(
  types: T[],
  typeOptions?: TypeOptions<ConstructorToValue<T>>
): ConstructorToValue<T>[] {
  return _type(types[0], {
    ...typeOptions,
    kind: "union",
    unionTypes: types.map((type) => _type(type)),
  });
}
