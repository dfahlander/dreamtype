import { TypeNarrowerSymbol } from "../symbols.js";

export type Int = number & { [TypeNarrowerSymbol]: "Int" };

export function Int(i: number): Int {
  if (i >= 0x8000_0000 || i < -0x8000_0000)
    throw new TypeError("Int must fit in 32 bits");
  return Math.round(i) as Int;
}
