import {firstValueFrom} from './firstValueFrom';
import {
  createCompletedSynchronousObservableWithoutValues,
  createCompletedSynchronousObservableWithValues,
  createErroredSynchronousObservableWithError,
  error,
  values,
} from './__fixtures__';

describe('firstValueFrom()', () => {
  test('throws when no value is received', async () => {
    const actualValue = firstValueFrom(
      createCompletedSynchronousObservableWithoutValues,
    );
    const expectedValue = 'No value was received';
    await expect(actualValue).rejects.toThrow(expectedValue);
  });

  test('resolves to the first value when completed', async () => {
    const actualValue = firstValueFrom(
      createCompletedSynchronousObservableWithValues,
    );
    const expectedValue = values[0];
    await expect(actualValue).resolves.toEqual(expectedValue);
  });

  test('resolves to the error when errored', async () => {
    const actualValue = firstValueFrom(
      createErroredSynchronousObservableWithError,
    );
    const expectedValue = error;
    await expect(actualValue).rejects.toEqual(expectedValue);
  });
});
