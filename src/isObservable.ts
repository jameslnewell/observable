import {Observable} from './Observable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObservable = <T>(value: any): value is Observable<T> => {
  return Boolean(value && typeof (value as Observable<T>).subscribe === 'function');
};
