import {Observable} from './Observable';

export async function lastValueFrom<Value = unknown, Error = unknown>(
  observable: Observable<Value, Error>,
): Promise<Value> {
  return new Promise((resolve, reject) => {
    let received = false;
    let receivedValue: Value;
    observable.subscribe({
      next: (value) => {
        received = true;
        receivedValue = value;
      },
      complete: () => {
        if (received) {
          resolve(receivedValue);
        } else {
          reject(new Error('No value was received'));
        }
      },
      error: reject,
    });
  });
}
