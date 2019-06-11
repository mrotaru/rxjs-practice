const { Observable, from, of } = require("rxjs");
const { catchError } = require("rxjs/operators");

// catchError operator
// http://reactivex.io/rxjs/function/index.html#static-function-catchError
// https://blog.angular-university.io/rxjs-error-handling/

let failing = new Observable(subscriber => {
  subscriber.error("failed");
  return () => {
    console.log("cleanup");
  };
});

let obs$ = from(failing);
obs$
  .pipe(
    catchError((err, caught$) => {
      console.log("err:", err);
      console.log("caught: ", caught$);
      return of("failed, but here's a value");
      // return caught$; // retry; max call stack exception
    })
  )
  .subscribe(value => {
    console.log("value:", value);
  });
