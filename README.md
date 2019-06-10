# RxJS

Notes and practice.

- rxjs provides a variety of ways for creating observables - from promises, DOM events, etc
- to subscribe, call the `subscribe` method on an observable, and pass it callbacks (all optional) for value, error and completion
- the callbacks can be supplied as three params, the order determining which is which, or as properties on a single object param
- when creating an observer manually, must return a function which will cleanup/free resources ([video](https://app.pluralsight.com/player?course=rxjs-getting-started&author=brice-wilson&name=d37e5066-5cf8-4ea7-a302-c593b9122224&clip=6&mode=live))
- `subscribe` calls return a "Subscription" object; most notably, it has an "unsubscribe" method
- other subscribers not affected ? As long as there is at least one subscriber, observable will continue to emit ?
- once no subscribers, it will not call the completion callback ?
- subscription objects have "add" and "remove", to be called with other subscription objects

## Useful Links
- operators: http://reactivex.io/documentation/operators.html

## Courses
https://app.pluralsight.com/library/courses/rxjs-big-picture/table-of-contents
- recent; Mar 2019 - covers v6
- basic course, but explains the basic principles well enough

https://app.pluralsight.com/player?course=rxjs-getting-started
- quite verbose, but more detailed
