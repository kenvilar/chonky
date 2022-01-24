import { MaybePromise, Nullable, WritableProps } from 'tsdef';
import { FileAction, FileActionEffect } from '../types/action.types';
export declare const NOOP_FUNCTION: (...args: any[]) => void;
export declare const isPromise: <T>(value: any) => value is Promise<T>;
export declare const defineFileAction: <Action extends FileAction>(action: Action, effect?: FileActionEffect<FileAction> | undefined) => WritableProps<Action>;
/**
 * Recursively check the current element and the parent elements, going bottom-up.
 * Returns the first element to match the predicate, otherwise returns null if such
 * element is not found.
 */
export declare const findElementAmongAncestors: (maybeElement: HTMLElement | any, predicate: (maybeElement: HTMLElement | any) => boolean) => Nullable<HTMLElement>;
export declare const elementIsInsideButton: (buttonCandidate: HTMLElement | any) => boolean;
export declare const getValueOrFallback: <T extends unknown>(value: T, fallback: T, desiredType?: "string" | "number" | "boolean" | undefined) => T;
