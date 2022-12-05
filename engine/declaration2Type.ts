// Copied from DeclarationToType.ts
// but changed from using a symbol, to using _type property
// but removed the recursive object declaration for now...

import { PrimaryKey, TypeAttributeSymbol, TypeSymbol } from "./symbols.js";
import { TypeOptions } from "./TypeConfig.js";

export type Declaration2Type<T, Config> = Config extends { primKey: true }
  ? Config extends { primKey: true; with: () => [infer C1] }
    ? Declaration2TypeCheckArray<T, Config> &
        PrimaryKey<[Declaration2TypeCheckArray<T, Config>, C1]>
    : Config extends { with: () => [infer C1, infer C2] }
    ? Declaration2TypeCheckArray<T, Config> &
        PrimaryKey<[Declaration2TypeCheckArray<T, Config>, C1, C2]>
    : Config extends { with: () => [infer C1, infer C2, infer C3] }
    ? Declaration2TypeCheckArray<T, Config> &
        PrimaryKey<[Declaration2TypeCheckArray<T, Config>, C1, C2, C3]>
    : Declaration2TypeCheckArray<T, Config> &
        PrimaryKey<Declaration2TypeCheckArray<T, Config>>
  : Declaration2TypeCheckArray<T, Config>;

export type Declaration2TypeCheckArray<T, Config> = Config extends {
  array: true;
}
  ? Constructor2Type<T>[]
  : Constructor2Type<T>;

export type Constructor2Type<T> = T extends {
  [TypeSymbol]?: { default: infer R };
}
  ? R
  : T extends StringConstructor
  ? string
  : T extends NumberConstructor
  ? number
  : T extends BooleanConstructor
  ? boolean
  : T extends BigIntConstructor
  ? bigint
  : T extends { new (...args: any[]): infer R }
  ? R
  : T;

type TEST = Constructor2Type<Uint8ArrayConstructor>;
