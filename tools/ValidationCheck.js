import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {validate} from "validate.js"

// implementing input validation with validate.js
//Each functions defines the constraints that will be applied against each entry fields
export const verifyString = (id, value) => {
    const limit = {
        presence: {
        allowEmpty: false
        }
    }
    if(value !=="")
 limit.format = {
    pattern: ".+",
    flags:"i",
    message: "Fields can't be empty."
    }

const verifyResult = validate ({[id]: value}, {[id]: limit})
return verifyResult && verifyResult[id]
}

export const verifyEmail = (id, value) => {
    const limit = {
        presence: {
        allowEmpty: false
        }
    }
    if(value !==""){
     limit.email  = {
            message: 'format is invalid',
        }
    }

const verifyResult = validate ({[id]: value}, {[id]: limit})
return verifyResult && verifyResult[id]
}

export const verifyPassword = (id, value) => {
    const limit = {
        presence: {
        allowEmpty: false
        }
    }
    if(value !==""){
     limit.length = {
            minimum: 6,
        message:"must atleast be 6 characters"
    }
    }


const verifyResult = validate ({[id]: value}, {[id]: limit})
return verifyResult && verifyResult[id]
}