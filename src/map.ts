import {Observable} from './Observable';
import {create} from './create';

export const map = <T1, T2, E = any>(fn: (value: T1) => T2) => (
  observable: Observable<T1, E>,
): Observable<T2, E> => {
  return create(observer => {
    const subscription = observable.subscribe({
      next: value => observer.next(fn(value)),
      error: observer.error,
      complete: observer.complete,
    });
    return () => subscription.unsubscribe();
  });
};
