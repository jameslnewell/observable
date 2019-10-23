import {create} from './create';
import {Observable} from './Observable';

export const fromArray = <T>(array: T[]): Observable<T> =>
  create(observer => {
    array.forEach(item => observer.next(item));
    observer.complete();
  });
