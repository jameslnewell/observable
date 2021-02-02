import {Observable} from './Observable';

export async function firstValueFrom<Value = unknown, Error = unknown>(
  observable: Observable<Value, Error>,
): Promise<Value> {
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next: (value) => resolve(value),
      complete: () => reject(new Error('No value was received')),
      error: reject,
    });
  });
}
