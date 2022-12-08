import { TypeAttributeSymbol } from "../engine/symbols";

export type PrimaryKey<T> = {
  [TypeAttributeSymbol]?: T;
};
