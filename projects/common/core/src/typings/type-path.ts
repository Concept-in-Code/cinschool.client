export type TypePath<T> = T extends object
  ? {
      [K in keyof T & (string | number)]:
        T[K] extends Array<any>
          ? `${K}`
          : T[K] extends object
            ? `${K}` | `${K}.${TypePath<T[K]>}`
            : `${K}`
    }[keyof T & (string | number)]
  : '';
