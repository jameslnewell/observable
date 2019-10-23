
export interface Observer<T> {
  next: (data: T) => void; 
  error: (error: any) => void;
  complete: () => void;
}
