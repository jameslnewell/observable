import {create} from '.';

const delay = async (ms: number = 60) => new Promise(resolve => setTimeout(resolve, ms));

const cancelled = jest.fn();

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
  return cancelled;
});

const synchronousError = create<string>(subscriber => {
  subscriber.error(undefined);
  return cancelled;
});

const synchronousNextAfterComplete = create<string>(subscriber => {
  subscriber.complete();
  subscriber.next('A');
  return cancelled;
});

const synchronousNextAfterError = create<string>(subscriber => {
  subscriber.error(undefined);
  subscriber.next('A');
  return cancelled;
});

const synchronousCompleteAfterComplete = create<string>(subscriber => {
  subscriber.complete();
  subscriber.complete();
  return cancelled;
});

const synchronousCompleteAfterError = create<string>(subscriber => {
  subscriber.error(undefined);
  subscriber.complete();
  return cancelled;
});

const synchronousErrorAfterComplete = create<string>(subscriber => {
  subscriber.complete();
  subscriber.error(undefined);
  return cancelled;
});

const synchronousErrorAfterError = create<string>(subscriber => {
  subscriber.error(undefined);
  subscriber.error(undefined);
  return cancelled;
});

const synchronousNeverComplete = create<string>(() => {
  return cancelled;
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
  return cancelled.mockImplementation(() => clearInterval(interval));
});

const asynchronousError = create<string>(subscriber => {
  const timeout = setTimeout(() => subscriber.error(undefined), 10);
  return cancelled.mockImplementation(() => clearTimeout(timeout));
});

const asynchronousNextAfterComplete = create<string>(subscriber => {
  let timeout = setTimeout(() => {
    subscriber.complete();
    timeout = setTimeout(() => subscriber.next('A'), 10);
  }, 10);

  return cancelled.mockImplementation(() => clearTimeout(timeout));
});

const asynchronousNextAfterError = create<string>(subscriber => {
  let timeout = setTimeout(() => {
    subscriber.error(undefined);
    timeout = setTimeout(() => subscriber.next('A'), 10);
  }, 10);
  return cancelled.mockImplementation(() => clearTimeout(timeout));
});

const asynchronousCompleteAfterComplete = create<string>(subscriber => {
  let timeout = setTimeout(() => {
    subscriber.complete();
    timeout = setTimeout(() => subscriber.complete(), 10);
  }, 10);
  return cancelled.mockImplementation(() => clearTimeout(timeout));
});

const asynchronousCompleteAfterError = create<string>(subscriber => {
  let timeout = setTimeout(() => {
    subscriber.error(undefined);
    timeout = setTimeout(() => subscriber.complete(), 10);
  }, 10);
  return cancelled.mockImplementation(() => clearTimeout(timeout));
});

const asynchronousErrorAfterComplete = create<string>(subscriber => {
  let timeout = setTimeout(() => {
    subscriber.complete();
    timeout = setTimeout(() => subscriber.error(undefined), 10);
  }, 10);
  return cancelled.mockImplementation(() => clearTimeout(timeout));
});

const asynchronousErrorAfterError = create<string>(subscriber => {
  let timeout = setTimeout(() => {
    subscriber.error(undefined);
    timeout = setTimeout(() => subscriber.error(undefined), 10);
  }, 10);
  return cancelled.mockImplementation(() => clearTimeout(timeout));
});

const asynchronousNeverComplete = create<string>(() => {
  return cancelled;
});

describe('create()', () => {

  beforeEach(() => {
    cancelled.mockReset();
    subscriber.next.mockReset();
    subscriber.error.mockReset();
    subscriber.complete.mockReset();
  });

  describe('synchronous', () => {

    test('called the next function when subscribed', () => {
      synchronous.subscribe(subscriber);
      expect(subscriber.next).toBeCalledWith('A');
      expect(subscriber.next).toBeCalledWith('B');
      expect(subscriber.next).toBeCalledWith('C');
    });

    test('did not call the next function when never subscribed', () => {
      expect(subscriber.next).not.toBeCalled();
    });

    test('called the complete function when subscribed', () => {
      synchronous.subscribe(subscriber);
      expect(subscriber.complete).toBeCalled();
    });

    test('did not call the complete function when never subscribed', () => {
      expect(subscriber.complete).not.toBeCalled();
    });

    test('called the error function when subscribed', () => {
      synchronousError.subscribe(subscriber);
      expect(subscriber.error).toBeCalled();
    });

    test('did not call the error function when never subscribed', () => {
      expect(subscriber.error).not.toBeCalled();
    });
  
    test.skip('did not call next function when unsubscribed', () => {
      // a synchronous factory will execute before unsubscribe is ever called
    });
    
    test('did not call next function when completed', () => {
      synchronousNextAfterComplete.subscribe(subscriber);
      expect(subscriber.next).not.toBeCalled();
    });

    test('did not call next function when errored', () => {
      synchronousNextAfterError.subscribe(subscriber);
      expect(subscriber.next).not.toBeCalled();
    });

    test.skip('did not call complete function when unsubscribed', () => {
      // a synchronous factory will execute before unsubscribe is ever called
    });

    test('did not call complete function when completed', () => {
      synchronousCompleteAfterComplete.subscribe(subscriber);
      expect(subscriber.complete).toBeCalledTimes(1);
    });

    test('did not call complete function when errored', () => {
      synchronousCompleteAfterError.subscribe(subscriber);
      expect(subscriber.complete).not.toBeCalled();
    });

    test.skip('did not call error function when unsubscribed', () => {
      // a synchronous factory will execute before unsubscribe is ever called
    });

    test('did not call error function when completed', () => {
      synchronousErrorAfterComplete.subscribe(subscriber);
      expect(subscriber.error).not.toBeCalled();
    });

    test('did not call error function when errored', () => {
      synchronousErrorAfterError.subscribe(subscriber);
      expect(subscriber.error).toBeCalledTimes(1);
    });

    test('called the cancel function when unsubscribed', () => {
      synchronousNeverComplete.subscribe(subscriber).unsubscribe();
      expect(cancelled).toBeCalled();
    });

    test('called the cancel function when completed', () => {
      synchronous.subscribe(subscriber);
      expect(cancelled).toBeCalled();
    });

    test('called the cancel function when errored', () => {
      synchronousError.subscribe(subscriber);
      expect(cancelled).toBeCalled();
    });
  
  });

  describe('asynchronous', () => {

    test('called the next function when subscribed', async () => {
      asynchronous.subscribe(subscriber);
      await delay();
      expect(subscriber.next).toBeCalledWith('A');
      expect(subscriber.next).toBeCalledWith('B');
      expect(subscriber.next).toBeCalledWith('C');
    });

    test('did not call the next function when never subscribed', () => {
      expect(subscriber.next).not.toBeCalled();
    });

    test('called the complete function when subscribed', async () => {
      asynchronous.subscribe(subscriber);
      await delay();
      expect(subscriber.complete).toBeCalled();
    });

    test('did not call the complete function when never subscribed', () => {
      expect(subscriber.complete).not.toBeCalled();
    });

    test('called the error function when subscribed', async () => {
      asynchronousError.subscribe(subscriber);
      await delay();
      expect(subscriber.error).toBeCalled();
    });

    test('did not call the error function when never subscribed', () => {
      expect(subscriber.error).not.toBeCalled();
    });
  
    test('did not call next function when unsubscribed', async () => {
      asynchronousNextAfterComplete.subscribe(subscriber).unsubscribe();
      await delay();
      expect(subscriber.next).not.toBeCalled();
    });
    
    test('did not call next function when completed', async () => {
      asynchronousNextAfterComplete.subscribe(subscriber);
      await delay();
      expect(subscriber.next).not.toBeCalled();
    });

    test('did not call next function when errored', async () => {
      asynchronousNextAfterError.subscribe(subscriber);
      await delay();
      expect(subscriber.next).not.toBeCalled();
    });

    test('did not call complete function when unsubscribed', async () => {
      asynchronousCompleteAfterComplete.subscribe(subscriber).unsubscribe();
      await delay();
      expect(subscriber.complete).not.toBeCalled();
    });

    test('did not call complete function when completed', async () => {
      asynchronousCompleteAfterComplete.subscribe(subscriber);
      await delay();
      expect(subscriber.complete).toBeCalledTimes(1);
    });

    test('did not call complete function when errored', async () => {
      asynchronousCompleteAfterError.subscribe(subscriber);
      await delay();
      expect(subscriber.complete).not.toBeCalled();
    });

    test('did not call error function when unsubscribed', async () => {
      asynchronousErrorAfterComplete.subscribe(subscriber).unsubscribe();
      await delay();
      expect(subscriber.error).not.toBeCalled();
    });

    test('did not call error function when completed', async () => {
      asynchronousErrorAfterComplete.subscribe(subscriber);
      await delay();
      expect(subscriber.error).not.toBeCalled();
    });

    test('did not call error function when errored', async () => {
      asynchronousErrorAfterError.subscribe(subscriber);
      await delay();
      expect(subscriber.error).toBeCalledTimes(1);
    });

    test('called the cancel function when unsubscribed', async () => {
      asynchronousNeverComplete.subscribe(subscriber).unsubscribe();
      await delay();
      expect(cancelled).toBeCalled();
    });

    test('called the cancel function when completed', async () => {
      asynchronous.subscribe(subscriber);
      await delay();
      expect(cancelled).toBeCalled();
    });

    test('called the cancel function when errored', async () => {
      asynchronousError.subscribe(subscriber);
      await delay();
      expect(cancelled).toBeCalled();
    });
  
  });

});
