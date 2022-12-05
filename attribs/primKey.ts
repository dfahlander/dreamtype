import { Constructor2Type } from "../declaration2Type.js";
import { PrimaryKey } from "../symbols.js";

export function primKey<T>(
  typeOrValue: T
): Constructor2Type<T> & PrimaryKey<Constructor2Type<T>> {
  throw "";
}
