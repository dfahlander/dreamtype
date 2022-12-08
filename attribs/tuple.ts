import type { ConstructorToValue } from "../typings/ConstructorToValue.js";
import { TypeOptions } from "../typings/TypeOptions.js";
import { _type } from "../engine/_type";
import { getDefaultValue } from "../engine/getDefaultValue.js";

export function tuple<T extends readonly any[]>(
  types: [...T],
  typeOptions?: TypeOptions<ConstructorToValue<T[number]>>
): { [P in keyof T]: ConstructorToValue<T[P]> } {
  return _type(Array, {
    default: types.map((t) =>
      typeof t === "function" ? getDefaultValue(t) : t
    ),
    ...typeOptions,
    kind: "tuple",
    tupleTypes: types.map((type) => _type(type)),
  });
}
