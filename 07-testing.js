const { TestScheduler } = require('rxjs/testing')
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