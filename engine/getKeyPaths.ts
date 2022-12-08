import { TypeData } from "../typings/TypeData.js";
import { getPropPath } from "./getPropPath";

export function getKeyPaths(
  typeData: TypeData,
  root: { [prop: string]: TypeData }
): string[] {
  return [
    getPropPath(typeData, root),
    ...typeData._compositeGetters?.map((compositePropGetter) =>
      getPropPath(compositePropGetter(), root)
    ),
  ];
}
