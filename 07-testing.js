const { TestScheduler } = require('rxjs/testing')
const { delay,take } = require('rxjs/operators')
const deepEqual = require('deep-equal')


let scheduler

const beforeEach = () => scheduler = new TestScheduler((a, b) => {
    if (!deepEqual(a, b)) {
        throw new Error(`${JSON.stringify(a)} not deep equal to ${JSON.stringify(b)}`)
    }
})

beforeEach()
scheduler.run(({ cold, expectObservable }) => {
    const source$ = cold('a|')
    const expected = 'a|'
    expectObservable(source$).toBe(expected)
})

beforeEach()
scheduler.run(({ cold, expectObservable }) => {
    const source$ = cold('-a|')
    const expected = '4ms -a|'
    expectObservable(source$.pipe(
        delay(4)
    )).toBe(expected)
})

beforeEach()
scheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
    const source$ = cold('-a-b-c|')
    const expected =     '-a-(b|)'
    const subscription = '^--!)'
    expectObservable(source$.pipe(
        take(2)
    )).toBe(expected)
    expectSubscriptions(source$.subscriptions).toBe(subscription)
})