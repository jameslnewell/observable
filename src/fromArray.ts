import {create} from './create';

export const fromArray = <T>(array: T[]) =>
  create<T>(observer => {
    array.forEach(item => observer.next(item));
    observer.complete();
  });
