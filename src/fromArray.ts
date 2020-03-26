import {create} from './create';
import {Observable} from './Observable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromArray = <T, E = any>(array: T[]): Observable<T, E> =>
  create(observer => {
    array.forEach(item => observer.next(item));
    observer.complete();
  });
