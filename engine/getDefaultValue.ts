const wm = new WeakMap<Function, any>();
export function getDefaultValue(type: Function) {
  if (wm.has(type)) return wm.get(type);
  const def = generateDefaultValue(type as any);
  if (def && typeof def === "object") {
    Object.freeze(def);
  }
  wm.set(type, def);
  return def;
}

function generateDefaultValue(type: new (...args: any[]) => any) {
  switch (type as Function) {
    case String:
      return "";
    case Number:
      return 0 as any;
    case Boolean:
      return false as any;
    case BigInt:
      return BigInt(0) as any;
    default: {
      const previousDecl = typeof dreamTypeDecl === "boolean" && dreamTypeDecl;
      (globalThis as any).dreamTypeDecl = false;
      try {
        return new type();
      } finally {
        (globalThis as any).dreamTypeDecl = previousDecl;
      }
    }
  }
}
