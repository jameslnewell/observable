import {create} from './create';
import {Observable} from './Observable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fromError = <T>(error: any): Observable<T> =>
  create(observer => observer.error(error));
