import {lastValueFrom} from './lastValueFrom';
import {
  createCompletedSynchronousObservableWithoutValues,
  createCompletedSynchronousObservableWithValues,
  createErroredSynchronousObservableWithError,
  error,
  values,
} from './__fixtures__';

describe('lastValueFrom()', () => {
  test('throws when no value is received', async () => {
    const actualValue = lastValueFrom(
      createCompletedSynchronousObservableWithoutValues,
    );
    const expectedValue = 'No value was received';
    await expect(actualValue).rejects.toThrow(expectedValue);
  });

  test('resolves to the last value when completed', async () => {
    const actualValue = lastValueFrom(
      createCompletedSynchronousObservableWithValues,
    );
    const expectedValue = values[values.length - 1];
    await expect(actualValue).resolves.toEqual(expectedValue);
  });

  test('resolves to the error when errored', async () => {
    const actualValue = lastValueFrom(
      createErroredSynchronousObservableWithError,
    );
    const expectedValue = error;
    await expect(actualValue).rejects.toEqual(expectedValue);
  });
});
