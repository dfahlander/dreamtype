// Internal representation of a property's type
export interface TypeData {
  type: Function;
  typeName: string;
  kind: "scalar" | "array" | "union" | "object" | "tuple";
  default: any;
  getPropPath: (root: { [prop: string]: TypeData }) => string; // "name", "age", "address.city", "tags"

  primitive?: boolean; // True for primitive types: string, number, boolean, bigint - non-objects that equal by value.
  optional?: boolean; // Can be undefined
  nullable?: boolean; // Can be null

  _compositeGetters?: Array<() => TypeData>;

  // Index
  index?: boolean;
  unique?: boolean;
  primKey?: boolean;
  autoGen?: boolean;
  composite?: boolean;
  getKeyPaths?: (root: { [prop: string]: TypeData }) => string[];

  // string
  min?: number;
  max?: number;
  sensitivity?: "base" | "accent" | "case" | "variant";
  pattern?: RegExp;

  // array
  itemType?: TypeData;

  // union
  unionTypes?: TypeData[];

  // tuple
  tupleTypes?: TypeData[];

  // object
  childProps?: { [propName: string]: TypeData };
}
