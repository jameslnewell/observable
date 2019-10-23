# @jameslnewell/observable

A super simple and light-weight observable implementation.

## Installation

```bash
yarn add @jameslnewell/observable
```

## Usage

```js
const {create, map, pipe} from '@jameslnewell/observable';

const numbers = (ms: number = 1000) => create(subscriber => {
  let count = 0;
  const handle = setInterval(() => subscriber.next(count++), ms);
  return () => clearInterval(handle);
});

const letters = pipe(map(number => String.fromCharCode(65 + number)))(numbers())

const subscription = letters.subscribe({
  next: data => console.log(data),
  error: error => console.error(error),
  completed: () => console.log('completed')
});

subscription.unsubscribe();

```

## API

### create(factory): Observable

### map(fn)(observable): Observable

### pipe(fn1, fn2, fn3)(Observable): Observable

### isObservable(value): boolean
