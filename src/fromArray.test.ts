import {fromArray} from '.';

const subscriber = {
  next: jest.fn(),
  error: jest.fn(),
  complete: jest.fn(),
};

describe('fromArray()', () => {
  beforeEach(() => {
    subscriber.next.mockReset();
    subscriber.error.mockReset();
    subscriber.complete.mockReset();
  });

  test('called next for each item in the array', () => {
    fromArray(['A', 'B', 'C']).subscribe(subscriber);
    expect(subscriber.next).toBeCalledWith('A');
    expect(subscriber.next).toBeCalledWith('B');
    expect(subscriber.next).toBeCalledWith('C');
    expect(subscriber.complete).toBeCalled();
  });
});
