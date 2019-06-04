const { Observable, from } = require('rxjs')
const { filter, map } = require('rxjs/operators')

const numbers = [1, 2, 3]
let observable$ = from(numbers)

// must `pipe` emitted values into a series of operators. The operators are
// just functions, and will be executed in the order they are given.
// all operators: http://reactivex.io/documentation/operators.html
observable$ = from(numbers)
observable$.pipe(
  filter(number => number >= 2),
  map(number => number * 2),
).subscribe(
  number => { console.log(number) }
)

// return an observable from an operator ? To see `2` logged.
// `value` will be an actual observable; will not be "unwrapped"
observable$ = from([1])
observable$.pipe(
  map(v => from([2]))
).subscribe(
  value => { console.log('observable object:', value) }
)

