"use strict"
/**
 * Created by garusis on 15/11/17.
 */
const callbacks = require("./callbacks")
const promises = require("./promises")

if(process.env.USE_CALLBACKS){
    callbacks.run()
}

if(process.env.USE_PROMISES){
    promises.run()
}