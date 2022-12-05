export const TypeSymbol = Symbol();
export const TypeNarrowerSymbol = Symbol();
export const TypeAttributeSymbol = Symbol();

export type PrimaryKey<T> {
  [TypeAttributeSymbol]?: T;
}