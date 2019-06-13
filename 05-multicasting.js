const { Observable, of, Subject } = require("rxjs");
const { map, filter, tap, take } = require("rxjs/operators");

let source$

// Normally, you can only have one active subscriber. If you add a second one,
// the observable will be re-created; the two subscribers (observers) will not
// receive the same values. Below, _each_ observable will get it's own 1, 2, 3:
source$ = of(1, 2, 3)
source$.subscribe(v => console.log('subscriber 1', v))
source$.subscribe(v => console.log('subscriber 2', v))

// Same thing is better illustrated below; observers will not get the same
// numbers. Well, they might, but that is very unlikely: the observable will
// re-run on every subscription, generating another set of values, which may or
// may not be the same.

// This is what's known as a "cold" observable. It gets cold after running;
// but will "warm up" on each subscription. Multiple subscribers will not have
// access to the same "running", or "warmed up", observable.

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

source$ = new Observable(subscriber => {
    console.log('Observable running !')
    let count = 0 
    while(count < 3) {
        subscriber.next(getRandomInt(1000))
        count++
    }
})
source$.subscribe(v => console.log('subscriber 1', v))
source$.subscribe(v => console.log('subscriber 2', v))

// And now, with Subjects... Note how all three subscribers
// get the same value
let subject$

subject$ = new Subject()
subject$.subscribe(v => console.log('subscriber 1', v))
subject$.subscribe(v => console.log('subscriber 2', v))
subject$.subscribe(v => console.log('subscriber 3', v))
subject$.next(getRandomInt(1000))

// Now, let's use a subject as a proxy. So, one observable produces some values.
// We know subjects can also be observers; which means they can subscribe. The
// subject subscribes to some observable, and emits the values on to multiple
// observers. He subscribb, but he also emitt !
console.log('\nSubjects can proxy:')
subject$ = new Subject()
subject$.subscribe(v => console.log('proxy subscriber 1', v))
subject$.subscribe(v => console.log('proxy subscriber 2', v))
source$.subscribe(subject$)