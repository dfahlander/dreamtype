import { ConstructorToValue } from "../typings/ConstructorToValue.js";
import { PrimaryKey } from "../typings/PrimaryKey";
import { Arrayify } from "../helpers/type-helpers.js";
import { _type } from "../engine/_type.js";

export function compositePrimKey<T, Comp1 extends () => any>(
  type: T,
  compositePropGetter1: Comp1
): ConstructorToValue<T> &
  PrimaryKey<[ConstructorToValue<T>, ReturnType<Comp1>]>;
export function compositePrimKey<T, Comps extends (() => any)[]>(
  type: T,
  ...compositePropGetters: Comps
): ConstructorToValue<T> &
  PrimaryKey<
    [
      ConstructorToValue<T>,
      ...Arrayify<{
        [P in keyof Comps]: ReturnType<Comps[P]>;
      }>
    ]
  > {
  return _type(type, {
    primKey: true,
    _compositeGetters: compositePropGetters,
  });
}
