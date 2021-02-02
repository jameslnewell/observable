import {Observable} from './Observable';
import {create} from './create';

export const map = <
  InputValue = unknown,
  OutputValue = unknown,
  Error = unknown
>(
  fn: (value: InputValue) => OutputValue,
) => (
  observable: Observable<InputValue, Error>,
): Observable<OutputValue, Error> => {
  return create((observer) => {
    const subscription = observable.subscribe({
      next: (value) => observer.next(fn(value)),
      error: observer.error,
      complete: observer.complete,
    });
    return () => subscription.unsubscribe();
  });
};
