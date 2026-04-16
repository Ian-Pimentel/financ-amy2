import { MONTHS } from "./shared/constants";

export type Month = (typeof MONTHS)[number];

export type MonthIndices = ArrayIndices<typeof MONTHS> | (number & {});

export type ArrayIndices<T extends readonly unknown[]> =
    Exclude<keyof T, keyof unknown[]> extends `${infer Digit extends number}`
    ? Digit
    : never;
