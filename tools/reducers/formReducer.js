import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// A reducer function that updates base on the action provided
export const reducer = (state, action) => {
    //extract necessary properties from the action object
    const {VerifyResult, inputId, inputValue} = action;

    //update the entered value for specified input ID
    const updatedEntryValues = {
        ...state.entryValues,
        [inputId] : inputValue
    }
//update entered value validity status based on the validation result
    const updateValidities  = {
        ...state.entryValidities,
        [inputId] : VerifyResult
    
    }
    //Initializing a flag to track the overall validty
    let updatedEntryIsValid = true;

//A foreach to check the entered value validty to determine if the overall entry is valid
    for(const key in updateValidities ){
        if(updateValidities [key] !== undefined)
        updatedEntryIsValid = false
    break
    }
//Returning the updated state object
  return {
    entryValues: updatedEntryValues,
    entryValidities: updateValidities ,
    EntryIsValid: updatedEntryIsValid,
  }
   
  
}


