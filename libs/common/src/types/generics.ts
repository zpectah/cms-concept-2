/* Creates type from values of enum object */
export type EnumKeyValues<T extends Record<string, unknown>> = T[keyof T];

/* Creates union intersection from item props */
export type UnionToIntersection<U> = (
  U extends any ? (x: U) => any : never
) extends (x: infer I) => any
  ? I
  : never;

/* Creates props types from item props */
export type PropsFromItem<T> = {
  [K in keyof T]?: T[K];
};
