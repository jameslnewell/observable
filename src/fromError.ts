import {create} from './create';

export const fromError = <T>(error: any) =>
  create<T>(observer => {
    observer.error(error);
  });
