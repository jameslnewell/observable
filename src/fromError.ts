import {create} from './create';
import {Observable} from './Observable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromError = <T, E = any>(error: E): Observable<T, E> =>
  create(observer => observer.error(error));
