"use strict"
/**
 * Created by garusis on 15/11/17.
 */
function error(message) {
    console.error("\x1b[31m", message)
}

function log(message) {
    console.log("\x1b[32m", message)
}

function asyncOperationWithPromise(order) {
    const time = Math.ceil(Math.random() * 5000)

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            log(`This operation is ${order} and ends successfully`)
            resolve(time)
        }, time)
    })
}

function asyncOperationWithPromiseThatCanFail(order) {
    const time = Math.ceil(Math.random() * 10000)
    const willFail = !Math.floor(Math.random() * 4)
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (willFail) {
                return reject(new Error(`Something bad happened in ${order}`))
            }
            log(`This operation is ${order} and ends successfully`)
            resolve(time)
        }, time)
    })
}

function noSyncOk() {
    asyncOperationWithPromise(0).then(response => log(response)).catch(err => error(err.message))
    asyncOperationWithPromise(1).then(response => log(response)).catch(err => error(err.message))
    asyncOperationWithPromise(2).then(response => log(response)).catch(err => error(err.message))
    asyncOperationWithPromise(3).then(response => log(response)).catch(err => error(err.message))
    asyncOperationWithPromise(4).then(response => log(response)).catch(err => error(err.message))
}

function noSyncCanFail() {
    asyncOperationWithPromiseThatCanFail(0).then(response => log(response)).catch(err => error(err.message))
    asyncOperationWithPromiseThatCanFail(1).then(response => log(response)).catch(err => error(err.message))
    asyncOperationWithPromiseThatCanFail(2).then(response => log(response)).catch(err => error(err.message))
    asyncOperationWithPromiseThatCanFail(3).then(response => log(response)).catch(err => error(err.message))
    asyncOperationWithPromiseThatCanFail(4).then(response => log(response)).catch(err => error(err.message))
}

function allOk() {
    asyncOperationWithPromise(0)
        .then(function (first) {
            return asyncOperationWithPromise(1)
                .then(current => first + current)
        })
        .then(function (accum) {
            return asyncOperationWithPromise(2)
                .then(current => accum + current)
        })
        .then(function (accum) {
            return asyncOperationWithPromise(3)
                .then(current => accum + current)
        })
        .then(function (accum) {
            return asyncOperationWithPromise(4)
                .then(current => accum + current)
        })
        .then(function (accum) {
            return asyncOperationWithPromise(5)
                .then(current => accum + current)
        })
        .then(function (accum) {
            log(accum)
        })
        .catch(err => error(err.message))
}


function syncCanFail() {
    asyncOperationWithPromiseThatCanFail(0)
        .then(function (first) {
            return asyncOperationWithPromiseThatCanFail(1)
                .then(current => first + current)
        })
        .then(function (accum) {
            return asyncOperationWithPromiseThatCanFail(2)
                .then(current => accum + current)
        })
        .then(function (accum) {
            return asyncOperationWithPromiseThatCanFail(3)
                .then(current => accum + current)
        })
        .then(function (accum) {
            return asyncOperationWithPromiseThatCanFail(4)
                .then(current => accum + current)
        })
        .then(function (accum) {
            return asyncOperationWithPromiseThatCanFail(5)
                .then(current => accum + current)
        })
        .then(function (accum) {
            log(accum)
        })
        .catch(err => error(err.message))
}

exports.run = function () {
    switch (process.env.RUN) {
        case "no-sync-ok":
            noSyncOk()
            break
        case "no-sync-can-fail":
            noSyncCanFail()
            break
        case "all-ok":
            allOk()
            break
        case "can-fail":
            syncCanFail()
            break
    }
}