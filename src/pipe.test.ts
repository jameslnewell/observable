/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {create, pipe, map} from '.';

const delay = async (ms = 60) => new Promise(resolve => setTimeout(resolve, ms));

const fn1 = (value: string) => value.charCodeAt(0);
const fn2 = (value: number) => String.fromCharCode(value + 32);

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

const transform1 = pipe(map(fn1));
const transform2 = pipe(map(fn1), map(fn2));

describe('pipe()', () => {

  beforeEach(() => {
    subscriber.next.mockReset();
    subscriber.error.mockReset();
    subscriber.complete.mockReset();
  });

  describe('synchronous', () => {
    
    test('piped through a single function', () => {
      transform1(synchronous).subscribe(subscriber);
      expect(subscriber.next).toBeCalledWith(65);
      expect(subscriber.next).toBeCalledWith(66);
      expect(subscriber.next).toBeCalledWith(67);
      expect(subscriber.complete).toBeCalled();
    });

    test('piped through two functions', () => {
      transform2(synchronous).subscribe(subscriber);
      expect(subscriber.next).toBeCalledWith('a');
      expect(subscriber.next).toBeCalledWith('b');
      expect(subscriber.next).toBeCalledWith('c');
      expect(subscriber.complete).toBeCalled();
    });

  });

  describe('asynchronous', () => {

    test('piped through a single function', async () => {
      transform1(asynchronous).subscribe(subscriber);
      await delay();
      expect(subscriber.next).toBeCalledWith(65);
      expect(subscriber.next).toBeCalledWith(66);
      expect(subscriber.next).toBeCalledWith(67);
      expect(subscriber.complete).toBeCalled();
    });

    test('piped through two functions', async () => {
      transform2(asynchronous).subscribe(subscriber);
      await delay();
      expect(subscriber.next).toBeCalledWith('a');
      expect(subscriber.next).toBeCalledWith('b');
      expect(subscriber.next).toBeCalledWith('c');
      expect(subscriber.complete).toBeCalled();
    });

  });

});
