
export interface Observer<T> {
  next: (data: T) => void; 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (error: any) => void;
  complete: () => void;
}
