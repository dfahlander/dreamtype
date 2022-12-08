/** Options arg to type() */
export type TypeOptions<T> = {
  default?: T;
} & (T extends string
  ? {
      min?: number;
      max?: number;
      pattern?: RegExp;
      sensitivity?: "base" | "accent" | "case" | "variant";
    }
  : {});

export interface PrimKeyOptions<T> {
  autoGen?: boolean;
}
