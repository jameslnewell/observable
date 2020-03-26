import {Observable} from './Observable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObservable = <T, E = any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
): value is Observable<T, E> => {
  return Boolean(
    value && typeof (value as Observable<T, E>).subscribe === 'function',
  );
};
