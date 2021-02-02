import {Observable} from './Observable';

type Function<InputValue, OutputValue, Error = unknown> = (
  observable: Observable<InputValue, Error>,
) => Observable<OutputValue, Error>;

export function pipe<V, A>(fn1: Function<V, A>): Function<V, A>;
export function pipe<V, A, B>(
  fn1: Function<V, A>,
  fn2: Function<A, B>,
): Function<V, B>;
export function pipe<V, A, B, C>(
  fn1: Function<V, A>,
  fn2: Function<A, B>,
  fn3: Function<B, C>,
): Function<V, C>;
export function pipe<V, A, B, C, D>(
  fn1: Function<V, A>,
  fn2: Function<A, B>,
  fn3: Function<B, C>,
  fn4: Function<C, D>,
): Function<V, D>;
export function pipe<V, A, B, C, D, E>(
  fn1: Function<V, A>,
  fn2: Function<A, B>,
  fn3: Function<B, C>,
  fn4: Function<C, D>,
  fn5: Function<D, E>,
): Function<V, E>;
export function pipe<V>(...fns: Function<unknown, unknown>[]) {
  return (observable: Observable<V>) => {
    if (fns.length === 0) {
      return observable;
    } else if (fns.length === 1) {
      return fns[0](observable);
    } else {
      return fns.reduce<Observable<unknown>>(
        (prev, fn) => fn(prev),
        observable,
      );
    }
  };
}
