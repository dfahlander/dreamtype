import { ConstructorToValue } from "../typings/ConstructorToValue.js";
import { TypeOptions } from "../typings/TypeOptions.js";
import { _type } from "../engine/_type";

export function type<T extends Function>(
  type: T,
  typeOptions?: TypeOptions<ConstructorToValue<T>>
): ConstructorToValue<T> {
  return _type(type, typeOptions);
}
