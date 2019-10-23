/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {create, map} from '.';

const delay = async (ms = 60) => new Promise(resolve => setTimeout(resolve, ms));

const fn = (value: string) => value.charCodeAt(0);

const subscriber = {
  next: jest.fn(),
  error: jest.fn(),
  complete: jest.fn(),
};

const synchronous = create<string>(subscriber => {
  subscriber.next('A');
  subscriber.next('B');
  subscriber.next('C');
  subscriber.complete();
});

const synchronousError = create<string>(subscriber => {
  subscriber.error(undefined);
});

const asynchronous = create<string>(subscriber => {
  let i = 0;
  const interval = setInterval(() => {
    if (i === 3) {
      subscriber.complete();
    } else {
      subscriber.next(String.fromCharCode(65 + i++))
    }
  }, 10);
  return () => clearInterval(interval);
});

const asynchronousError = create<string>(subscriber => {
  const timeout = setTimeout(() => subscriber.error(undefined), 10);
  return () => clearTimeout(timeout);
});

describe('map()', () => {
  
  beforeEach(() => {
    subscriber.next.mockReset();
    subscriber.error.mockReset();
    subscriber.complete.mockReset();
  });

  describe('synchronous', () => {

    test('called next function with a mapped value when subscribed', () => {
      map(fn)(synchronous).subscribe(subscriber);
      expect(subscriber.next).toBeCalledWith(65);
      expect(subscriber.next).toBeCalledWith(66);
      expect(subscriber.next).toBeCalledWith(67);
    });
  
    test.skip('did not call the next function when unsubscribed', () => {
      // a synchronous factory will execute before unsubscribe is ever called
    });
  
    test('called complete function when complete', () => {
      map(fn)(synchronous).subscribe(subscriber);
      expect(subscriber.complete).toBeCalled();
    });
  
    test.skip('did not call the complete function when unsubscribed', () => {
      // a synchronous factory will execute before unsubscribe is ever called
    });
  
    test('called error function when errored', () => {
      map(fn)(synchronousError).subscribe(subscriber);
      expect(subscriber.error).toBeCalled();
    });
  
    test.skip('did not call the next function when unsubscribed', () => {
      // a synchronous factory will execute before unsubscribe is ever called
    });
  
  });

  describe('asynchronous', () => {

    test('called next function with a mapped value when subscribed', async () => {
      map(fn)(asynchronous).subscribe(subscriber);
      await delay();
      expect(subscriber.next).toBeCalledWith(65);
      expect(subscriber.next).toBeCalledWith(66);
      expect(subscriber.next).toBeCalledWith(67);
    });
  
    test('did not call the next function when unsubscribed', async () => {
      map(fn)(asynchronous).subscribe(subscriber).unsubscribe();
      await delay();
      expect(subscriber.next).not.toBeCalled();
    });
  
    test('called complete function when complete', async () => {
      map(fn)(asynchronous).subscribe(subscriber);
      await delay();
      expect(subscriber.complete).toBeCalled();
    });
  
    test('did not call the complete function when unsubscribed', async () => {
      map(fn)(asynchronous).subscribe(subscriber).unsubscribe();
      await delay();
      expect(subscriber.complete).not.toBeCalled();
    });
  
    test('called error function when errored', async () => {
      map(fn)(asynchronousError).subscribe(subscriber);
      await delay();
      expect(subscriber.error).toBeCalled();
    });
  
    test('did not call the next function when unsubscribed', async() => {
      map(fn)(asynchronousError).subscribe(subscriber).unsubscribe();
      await delay();
      expect(subscriber.error).not.toBeCalled();
    });
  
  });

});
