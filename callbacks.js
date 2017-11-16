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

function asyncOperationWithCallback(order, cb) {
    const time = Math.ceil(Math.random() * 10000)
    setTimeout(function () {
        log(`This operation is ${order} and ends successfully`)
        cb(null, time)
    }, time)
}

function asyncOperationWithCallbackThatCanFail(order, cb) {
    const time = Math.ceil(Math.random() * 10000)
    const willFail = !Math.floor(Math.random() * 4)
    setTimeout(function () {
        if (willFail) {
            return cb(new Error(`Something bad happened in ${order}`))
        }
        log(`This operation is ${order} and ends successfully`)
        cb(null, time)
    }, time)
}

function noSyncOk() {
    asyncOperationWithCallback(0, (err, response) => err ? error(err.message) : log(`time ${response}`))
    asyncOperationWithCallback(1, (err, response) => err ? error(err.message) : log(`time ${response}`))
    asyncOperationWithCallback(2, (err, response) => err ? error(err.message) : log(`time ${response}`))
    asyncOperationWithCallback(3, (err, response) => err ? error(err.message) : log(`time ${response}`))
    asyncOperationWithCallback(4, (err, response) => err ? error(err.message) : log(`time ${response}`))
}

function noSyncCanFail() {
    asyncOperationWithCallbackThatCanFail(0, (err, response) => err ? error(err.message) : log(`time ${response}`))
    asyncOperationWithCallbackThatCanFail(1, (err, response) => err ? error(err.message) : log(`time ${response}`))
    asyncOperationWithCallbackThatCanFail(2, (err, response) => err ? error(err.message) : log(`time ${response}`))
    asyncOperationWithCallbackThatCanFail(3, (err, response) => err ? error(err.message) : log(`time ${response}`))
    asyncOperationWithCallbackThatCanFail(4, (err, response) => err ? error(err.message) : log(`time ${response}`))
}

function allOk() {
    let time = 0
    asyncOperationWithCallback(0, function (err, response) {
        if (err) {
            return error(err.message)
        }
        time += response

        asyncOperationWithCallback(1, function (err, response) {
            if (err) {
                return error(err.message)
            }
            time += response

            asyncOperationWithCallback(2, function (err, response) {
                if (err) {
                    return error(err.message)
                }
                time += response

                asyncOperationWithCallback(3, function (err, response) {
                    if (err) {
                        return error(err.message)
                    }
                    time += response

                    asyncOperationWithCallback(4, function (err, response) {
                        if (err) {
                            return error(err.message)
                        }
                        time += response
                        log(`time ${response}`)
                    })
                })
            })
        })
    })
}



function syncCanFail() {
    let time = 0
    asyncOperationWithCallbackThatCanFail(0, function (err, response) {
        if (err) {
            return error(err.message)
        }
        time += response

        asyncOperationWithCallbackThatCanFail(1, function (err, response) {
            if (err) {
                return error(err.message)
            }
            time += response

            asyncOperationWithCallbackThatCanFail(2, function (err, response) {
                if (err) {
                    return error(err.message)
                }
                time += response

                asyncOperationWithCallbackThatCanFail(3, function (err, response) {
                    if (err) {
                        return error(err.message)
                    }
                    time += response

                    asyncOperationWithCallbackThatCanFail(4, function (err, response) {
                        if (err) {
                            return error(err.message)
                        }
                        time += response
                        log(`time ${response}`)
                    })
                })
            })
        })
    })
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