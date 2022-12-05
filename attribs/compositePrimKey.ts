import { Constructor2Type } from "../engine/declaration2Type.js";
import { PrimaryKey } from "../engine/symbols.js";
import { Arrayify } from "../helpers/type-helpers.js";

export function compositePrimKey<T, Comps extends (() => unknown)[]>(
  typeOrValue: T,
  ...compositeProps: Comps
): Constructor2Type<T> &
  PrimaryKey<
    [
      Constructor2Type<T>,
      ...Arrayify<
        {
          [P in keyof Comps]: ReturnType<Comps[P]>;
        }
      >
    ]
  > {
  throw "";
}
