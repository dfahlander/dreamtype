import type { TypeData } from "../typings/TypeData";
import { fail } from "./failures.js";
import { getPropPath } from "./getPropPath.js";
import { getKeyPaths } from "./getKeyPaths";
import { primitives } from "./primitives.js";
import { getDefaultValue } from "./getDefaultValue.js";
import { getTypeData } from "./getTypeData.js";

export function _type(type: any, typeOptions?: Partial<TypeData>) {
  // Are we in declaration mode?
  if (typeof _declaration_ === "boolean" && _declaration_)
    return createTypeData(type, typeOptions);
  // Runtime mode: type is a function unless chained, then it's a value.
  if (typeof type === "function") {
    return typeOptions && "default" in typeOptions
      ? typeOptions.default
      : getDefaultValue(type);
  }
  return type as any;
}

function createTypeData<T>(
  type: Function | TypeData,
  typeOptions?: Partial<TypeData>
): TypeData {
  if (type == null) fail(1);
  if (typeof type === "function") {
    // type is a constructor function
    const isScalar = globalThis[type.name] === type;
    const _default =
      "default" in (typeOptions ?? {})
        ? typeOptions.default
        : getDefaultValue(type);
    const typeData: TypeData = {
      typeName: type.name,
      type,
      kind: isScalar ? "scalar" : "object",
      default: _default,
      primitive: primitives.has(typeof _default),
      getPropPath: (root) =>
        getPropPath(typeData, root as { [propName: string]: any }),
      getKeyPaths: (root) =>
        getKeyPaths(typeData, root as { [propName: string]: any }),
      ...(typeOptions || {}),
    };
    if (typeData.kind === "object") {
      typeData.childProps = getTypeData(type as any);
    }
    return typeData;
  } else if (type.type && type.kind && type.getPropPath) {
    // type is a TypeData (chaining support such as index(union(String)))
    return { ...type, ...typeOptions } as TypeData;
  } else {
    fail(2);
  }
}
