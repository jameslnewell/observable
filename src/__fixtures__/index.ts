import {fromArray} from '../fromArray';
import {fromError} from '../fromError';

export const values = ['A', 'B', 'C'];

export const error = 'Uh oh!';

export const createCompletedSynchronousObservableWithValues = fromArray(values);
export const createCompletedSynchronousObservableWithoutValues = fromArray([]);
export const createErroredSynchronousObservableWithError = fromError(error);
