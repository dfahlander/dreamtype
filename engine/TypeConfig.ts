/** Options arg to type() */
export interface TypeOptions {
  default?: any;
  //with?: <R extends any[]>() => R | any;
  //typeName: string;
  index?: boolean;
  //primKey?: boolean;
  //array?: boolean;
  //itemType?: TypeConfig;
  //autoGen?: boolean;
  //additionalCompositeKeys?: Array<{ keyPath: string; type: TypeConfig }>;
  //indexCriteria?: Expression<T>;
  //min?: number;
  //max?: number;
  //ignore?: "case" | "accent";
}

export interface PrimKeyOptions {
  autoGen?: boolean;
}

// Internal representation of a property's type
export interface TypeData {
  default: any;
  typeName: string;
  index?: boolean;
  primKey?: boolean;
  array?: boolean;
  itemType?: TypeData;
  autoGen?: boolean;
  additionalCompositeKeys?: Array<{ keyPath: string; type: TypeData }>;
  //indexCriteria?: Expression<T>;
  //min?: number;
  //max?: number;
  //ignore?: "case" | "accent";
}
