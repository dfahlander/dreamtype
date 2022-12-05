import { TypeNarrowerSymbol } from "../engine/symbols.js";

export type Long = bigint & { [TypeNarrowerSymbol]: "Long" };

export function Long(i: bigint | number): Long {
  let bi = typeof i === "bigint" ? i : BigInt(Math.round(i));
  if (
    bi < BigInt("-0x8000_0000_0000_0000n") ||
    bi >= BigInt("0x8000_0000_0000_0000n")
  ) {
    throw new TypeError("Long must fit in 64 bits");
  }
  return bi as Long;
}
