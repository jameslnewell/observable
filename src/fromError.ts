import {create} from './create';
import {Observable} from './Observable';

export const fromError = <Value = unknown, Error = unknown>(
  error: Error,
): Observable<Value, Error> => create((observer) => observer.error(error));
