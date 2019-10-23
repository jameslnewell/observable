import {fromError} from '.';

const subscriber = {
  next: jest.fn(),
  error: jest.fn(),
  complete: jest.fn(),
};

describe('fromError()', () => {
  beforeEach(() => {
    subscriber.next.mockReset();
    subscriber.error.mockReset();
    subscriber.complete.mockReset();
  });

  test('called error with the error', () => {
    const error = new SyntaxError('Invalid syntax!');
    fromError(error).subscribe(subscriber);
    expect(subscriber.error).toBeCalledWith(error);
  });
});
