import {Observer} from './Observer';
import {Observable} from './Observable';

type FactoryFunction<T, E> = (
  subscriber: Observer<T, E>,
) => void | (() => void);

export const create = <T, E = any>(
  factory: FactoryFunction<T, E>,
): Observable<T, E> => {
  return {
    subscribe: subscriber => {
      let cancel: ReturnType<FactoryFunction<T, E>> = undefined;
      let finished = false;
      let cancelled = false;
      cancel = factory({
        next: data => {
          if (finished) {
            return;
          }
          if (subscriber.next) {
            subscriber.next(data);
          }
        },
        error: error => {
          if (finished) {
            return;
          }
          finished = true;
          if (!cancelled && cancel) {
            cancelled = true;
            cancel();
          }
          if (subscriber.error) {
            subscriber.error(error);
          }
        },
        complete: () => {
          if (finished) {
            return;
          }
          finished = true;
          if (!cancelled && cancel) {
            cancelled = true;
            cancel();
          }
          if (subscriber.complete) {
            subscriber.complete();
          }
        },
      });

      // handle the case where the factory is synchronous and it completes/errors before a cancel function is returned
      if (finished && !cancelled && cancel) {
        cancelled = true;
        cancel();
      }

      return {
        unsubscribe: () => {
          finished = true;
          if (!cancelled && cancel) {
            cancelled = true;
            cancel();
          }
        },
      };
    },
  };
};
