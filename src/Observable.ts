import {Observer} from './Observer';
import {Subscription} from './Subscription';

export interface Observable<T, E = any> {
  subscribe: (observer: Partial<Observer<T, E>>) => Subscription;
}
