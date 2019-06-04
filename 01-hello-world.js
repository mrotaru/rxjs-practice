const { Observable, from } = require('rxjs')

const numbers = [1, 2, 3]

// create an observable (by convention, append $ to the variable name) and an
// observer
const observable$ = from(numbers)
const observer = {
  next: value => {
    console.log(value)
  },
  error: err => {
    console.log(`ERROR: ${err}`)
  },
  complete: () => {
    console.log('complete')
  },
}

// at this point, we have an observable - which will produce values - and an
// observer, which will observe the observable (duh!) and somehow react to the
// values it emits. Exactly how, is specified in the `next` property of the
// observer, which is function. The observable will call this function when it
// produces a value, providing the value as a parameter.

// However, for that to happen, the
// observer must register it's interest in the observable, by "subscribing" to
// it:
observable$.subscribe(number => {
  console.log(number)
})
