import { TypeData } from "../typings/TypeData";

const wm = new WeakMap<Function, { [propName: string]: TypeData }>();
export function getTypeData<T>(type: new (...args: any[]) => T): {
  [P in keyof T]: TypeData;
} {
  let rv = wm.get(type);
  if (rv) return rv as any;
  const previousDecl = typeof dreamTypeDecl === "boolean" && dreamTypeDecl;
  (globalThis as any).dreamTypeDecl = true;
  try {
    rv = { ...(new type() as { [prop: string]: TypeData }) };
    wm.set(type, rv);
    return rv as any;
  } finally {
    (globalThis as any).dreamTypeDecl = previousDecl;
  }
}
