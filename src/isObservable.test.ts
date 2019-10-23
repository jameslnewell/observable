import {isObservable} from '.';

describe('isObservable()', () => {

  test('returns true', () => {
    expect(isObservable({subscribe: () => {}})).toBe(true);
  });

  test('returns false', () => {
    expect(isObservable(undefined)).toBe(false);
    expect(isObservable(null)).toBe(false);
    expect(isObservable(0)).toBe(false);
    expect(isObservable(1)).toBe(false);
    expect(isObservable(false)).toBe(false);
    expect(isObservable(true)).toBe(false);
    expect(isObservable('foobar')).toBe(false);
    expect(isObservable({})).toBe(false);
    expect(isObservable(() => {})).toBe(false);
  });

});
