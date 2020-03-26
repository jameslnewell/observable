// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Observer<T, E = any> {
  next: (data: T) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (error: E) => void;
  complete: () => void;
}
