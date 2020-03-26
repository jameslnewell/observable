// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Observer<T, E = any> {
  next: (data: T) => void;
  complete: () => void;
  error: (error: E) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface NextObserver<T, E = any> {
  next: (data: T) => void;
  complete?: () => void;
  error?: (error: E) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CompleteObserver<T, E = any> {
  next?: (data: T) => void;
  complete: () => void;
  error?: (error: E) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ErrorObserver<T, E = any> {
  next?: (data: T) => void;
  complete?: () => void;
  error: (error: E) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PartialObserver<T, E = any> =
  | NextObserver<T, E>
  | CompleteObserver<T, E>
  | ErrorObserver<T, E>;
