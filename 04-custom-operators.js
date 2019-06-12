const { Observable, of } = require("rxjs");
const { map } = require("rxjs/operators");

// An operator is a higher-order function. The returned function
// takes an observable as a param, and returns an observable.
let source$ = of(1, 2, 3)
let doubler = map(value => value * 2)
let doubled$ = doubler(source$)
doubled$.subscribe(
    value => console.log(value)
)

// custom operator that just wraps map
const doublerOperator = () => map(value => value * 2)
source$.pipe(
    doublerOperator(),
).subscribe(
    value => console.log(value)
)

// completely custom operator - from source values, emit only numbers,
// and add a pre-defined value to them.
const add = toAdd => $src => {
    return new Observable(subscriber => {
        $src.subscribe(
            value => {
                if (!Number.isNaN(parseFloat(value))) {
                    subscriber.next(value + toAdd)
                }
            },
            err => subscriber.error(err),
            () => subscriber.complete(),
        )
    })
}

// simple operator that just logs
const log = () => $src => {
    return new Observable(subscriber => {
        $src.subscribe(
            value => {
                console.info(value)
            },
            err => subscriber.error(err),
            () => subscriber.complete(),
        )
    })
}

// since our 'add' operator is filtering out values that cannot be
// converted to a number (such as 'foo'), these values will not be
// passed to `log`
of(1, 2, 'foo', 3).pipe(
    add(100),
    log(),
).subscribe()
