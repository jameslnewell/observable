import {Observer} from './Observer';
import {Subscription} from './Subscription';

export interface Observable<T, E = any> {
  subscribe: (subscriber: Partial<Observer<T, E>>) => Subscription;
}
