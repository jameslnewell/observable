import {Observable} from './Observable';

export const isObservable = <T>(value: any): value is Observable<T> => {
  return Boolean(value && typeof (value as Observable<T>).subscribe === 'function');
};
