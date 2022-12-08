import type { TypeData } from "../typings/TypeData.js";

const objMap = new WeakMap<object, WeakMap<TypeData, string>>();
export function getPropPath(
  typeData: TypeData,
  root: { [prop: string]: TypeData }
) {
  let propMap = objMap.get(root) || generatePropMap(root);
  return propMap.get(typeData);
}

function generatePropMap(
  obj: { [prop: string]: TypeData },
  propMap = new WeakMap<TypeData, string>(),
  prefix = ""
) {
  for (const [key, typeData] of Object.entries(obj)) {
    propMap.set(typeData, prefix + key);
    if (typeData.kind === "array") {
      generatePropMapArray(typeData.itemType!, propMap, prefix + key + "[]");
    } else if (typeData.kind === "object") {
      generatePropMap(typeData.childProps!, propMap, prefix + key + ".");
    }
  }
  return propMap;
}

function generatePropMapArray(
  itemType: TypeData,
  propMap: WeakMap<TypeData, string>,
  prefix: string
) {
  propMap.set(itemType, prefix);
  if (itemType.kind === "array") {
    generatePropMapArray(itemType.itemType!, propMap, prefix + "[]");
  } else if (itemType.kind === "object") {
    generatePropMap(itemType.childProps!, propMap, prefix + ".");
  }
}
