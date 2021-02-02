import {Observer} from './Observer';
import {Observable} from './Observable';

type FactoryFunction<Value = unknown, Error = unknown> = (
  observer: Observer<Value, Error>,
) => void | (() => void);

export const create = <Value = unknown, Error = unknown>(
  factory: FactoryFunction<Value, Error>,
): Observable<Value, Error> => {
  return {
    subscribe: (subscriber) => {
      let cancel: ReturnType<FactoryFunction<Value, Error>> = undefined;
      let finished = false;
      let cancelled = false;
      cancel = factory({
        next: (data) => {
          if (finished) {
            return;
          }
          if (subscriber && subscriber.next) {
            subscriber.next(data);
          }
        },
        error: (error) => {
          if (finished) {
            return;
          }
          finished = true;
          if (!cancelled && cancel) {
            cancelled = true;
            cancel();
          }
          if (subscriber && subscriber.error) {
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
          if (subscriber && subscriber.complete) {
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
