import {create} from './create';
import {Observable} from './Observable';

export const fromArray = <Value = unknown, Error = unknown>(
  array: Value[],
): Observable<Value, Error> =>
  create((observer) => {
    array.forEach((item) => observer.next(item));
    observer.complete();
  });
