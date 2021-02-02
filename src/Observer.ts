export interface Observer<Value = unknown, Error = unknown> {
  next: (data: Value) => void;
  complete: () => void;
  error: (error: Error) => void;
}

export interface NextObserver<Value = unknown, Error = unknown> {
  next: (data: Value) => void;
  complete?: () => void;
  error?: (error: Error) => void;
}

export interface CompleteObserver<Value = unknown, Error = unknown> {
  next?: (data: Value) => void;
  complete: () => void;
  error?: (error: Error) => void;
}

export interface ErrorObserver<Value = unknown, Error = unknown> {
  next?: (data: Value) => void;
  complete?: () => void;
  error: (error: Error) => void;
}

export type PartialObserver<Value = unknown, Error = unknown> =
  | NextObserver<Value, Error>
  | CompleteObserver<Value, Error>
  | ErrorObserver<Value, Error>;
