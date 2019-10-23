import { Observer } from "./Observer";
import { Subscription } from "./Subscription";

export interface Observable<T> {
  subscribe: (subscriber: Partial<Observer<T>>) => Subscription;
}
