export type ConstructorToValue<T> = T extends StringConstructor
  ? string // primitive string type
  : T extends NumberConstructor
  ? number // primitive number type
  : T extends BooleanConstructor
  ? boolean // primitive boolean type
  : T extends BigIntConstructor
  ? bigint // primitive bigint type
  : T extends { new (): infer R }
  ? R // Class instance
  : T extends () => infer R
  ? R // Function return value
  : T; // Chaining support type(type(String)), array(index(String)), index(array(String)), etc
