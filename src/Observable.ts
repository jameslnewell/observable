import {PartialObserver} from './Observer';
import {Subscription} from './Subscription';

export interface Observable<Value = unknown, Error = unknown> {
  subscribe: (observer?: PartialObserver<Value, Error>) => Subscription;
}
