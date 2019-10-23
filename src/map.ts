import {Observable} from './Observable';
import { create } from './create';

export const map = <T1, T2>(fn: (value: T1) => T2) => (observable: Observable<T1>): Observable<T2> => {
  return create(observer => {
    const subscription = observable.subscribe({
      next: value => observer.next(fn(value)),
      error: observer.error,
      complete: observer.complete
    });
    return () => subscription.unsubscribe();
  });
}
