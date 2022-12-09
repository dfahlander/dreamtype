import { TypeData } from "../typings/TypeData";
import { getDeclarationMode, setDeclarationMode } from "./_declaration_.js";

const wm = new WeakMap<Function, { [propName: string]: TypeData }>();
export function getTypeData<T>(type: new (...args: any[]) => T): {
  [P in keyof T]: TypeData;
} {
  let rv = wm.get(type);
  if (rv) return rv as any;
  const previousDecl = getDeclarationMode();
  setDeclarationMode(true);
  try {
    rv = { ...(new type() as { [prop: string]: TypeData }) };
    Object.freeze(rv);
    wm.set(type, rv);
    return rv as any;
  } finally {
    setDeclarationMode(previousDecl);
  }
}
