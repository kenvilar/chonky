import { RootState } from '../types/redux.types';
import { ThunkExtraArgument } from './middleware';
export declare const useChonkyStore: (chonkyInstanceId: string) => import("@reduxjs/toolkit").EnhancedStore<RootState, import("redux").AnyAction, import("@reduxjs/toolkit").MiddlewareArray<import("redux").Middleware<{}, RootState, import("redux").Dispatch<import("redux").AnyAction>> | import("redux-thunk").ThunkMiddleware<RootState, import("redux").AnyAction, ThunkExtraArgument>>>;
/**
 * Hook that can be used with parametrized selectors.
 */
export declare const useParamSelector: <Args extends any[], Value>(parametrizedSelector: (...args: Args) => (state: RootState) => Value, ...selectorParams: Args) => Value;
/**
 * DTE - DispatchThunkEffect. This method is used to decrease code duplication in
 * main Chonky method.
 */
export declare const useDTE: <Args extends any[], Value>(actionCreator: (...args: Args) => any, ...selectorParams: Args) => void;
