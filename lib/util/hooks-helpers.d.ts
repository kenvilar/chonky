import React from 'react';
export declare const useDebounce: <T>(value: T, delay: number) => [T, React.Dispatch<React.SetStateAction<T>>];
export declare const useStaticValue: <T>(factory: () => T) => T;
export declare const useInstanceVariable: <T>(value: T) => React.MutableRefObject<T>;
