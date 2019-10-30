import {create} from './create';
import {Observable} from './Observable';

export const fromArray = <T, E = any>(array: T[]): Observable<T, E> =>
  create(observer => {
    array.forEach(item => observer.next(item));
    observer.complete();
  });
