import {Observer} from './Observer';
import {Subscription} from './Subscription';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Observable<T, E = any> {
  subscribe: (observer: Partial<Observer<T, E>>) => Subscription;
}
