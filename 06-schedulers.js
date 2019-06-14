const { Observable, of, Subject, from, asyncScheduler, asapScheduler, queueScheduler } = require("rxjs");
const { map, filter, tap, take, observeOn } = require("rxjs/operators");
const chalk = require('chalk')
console.green = (...args) => console.log(chalk.green(...args))
console.blue = (...args) => console.log(chalk.blue(...args))

// queueScheduler - should be named syncScheduler, because it results in sync
// execution. Note how all the values emitted by observables are logged between
// 'START' and 'FINISH' - it means nothing was scheduled for async execution
console.log('START 1')
from([1, 2, 3], queueScheduler).pipe(
    tap(v => console.green('green 1')),
    tap(v => console.blue('blue 1')),
).subscribe()
console.log('FINISH 1')

console.log('')

// Using asyncScheduler, stuff will be logged after 'FINISH 2', because the
// tasks were scheduled for async execution. Schedulers cannot convert an async
// scheduled observable to sync
console.log('START 2')
from([1, 2, 3], asyncScheduler).pipe(
    tap(v => console.green('green 2')),
    observeOn(queueScheduler), // has no effect ? can't switch from async to sync
    tap(v => console.blue('blue 2')),
).subscribe()
console.log('FINISH 2')

// We can, however, schedule tasks for async execution from a sync stream
console.log('START 3')
from([1, 2, 3], queueScheduler).pipe(
    tap(v => console.green('green 3')), // all green 3 sync, between START 3 and FINISH 3
    observeOn(asyncScheduler), // all blue 3 async; after FINISH 3 
    tap(v => console.blue('blue 3')),
).subscribe()
console.log('FINISH 3')