import { Observable } from "./Observable"

type Function<T1, T2> = (observable: Observable<T1>) => Observable<T2>;

export function pipe<T, A>(fn1: Function<T, A>): Function<T, A>;
export function pipe<T, A, B>(fn1: Function<T, A>, fn2: Function<A, B>): Function<T, B>;
export function pipe<T, A, B, C>(fn1: Function<T, A>, fn2: Function<A, B>, fn3: Function<B, C>): Function<T, C>;
export function pipe<T, A, B, C, D>(fn1: Function<T, A>, fn2: Function<A, B>, fn3: Function<B, C>, fn4: Function<C, D>): Function<T, D>;
export function pipe<T, A, B, C, D, E>(fn1: Function<T, A>, fn2: Function<A, B>, fn3: Function<B, C>, fn4: Function<C, D>, fn5: Function<D, E>): Function<T, E>;
export function pipe<T>(...fns: Function<any, any>[]) {
  return (observable: Observable<T>) => {
    if (fns.length === 0) {
      return observable;
    } else if (fns.length === 1) {
      return fns[0](observable);
    } else {
      return fns.reduce<Observable<any>>((prev, fn) => fn(prev), observable);
    }
  };
}
