import {Observable} from './Observable';

export const isObservable = <Value = unknown, Error = unknown>(
  possiblyAnObservable: unknown,
): possiblyAnObservable is Observable<Value, Error> => {
  return Boolean(
    possiblyAnObservable &&
      typeof (possiblyAnObservable as Observable<Value, Error>).subscribe ===
        'function',
  );
};
