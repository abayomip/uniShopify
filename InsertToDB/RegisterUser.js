import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useReducer, useCallback } from 'react'
import styles from '../assets/stylesheets/style'
import Input from '../assets/stylesheets/textInput'

import { reducer } from '../tools/reducers/formReducer';
import { validateInputData } from '../tools/actions/formActions';
import { registerUser } from '../tools/actions/authActions'
import { useDispatch } from 'react-redux';



//setting testmode true  to toggle between test mode and production mode
const isTestMode = true;

//declaring the initial state of the form and its validity status
const initialState = {
  entryValues: {
    firstname: isTestMode ? "Ali" : "",
    lastname: isTestMode ? "Mohammed" : "",
    username: isTestMode ? "Champion" : "",
    studentId: isTestMode ? "12345678" : "",
    email: isTestMode ? "example@example.com" : "",
    password: isTestMode ? "************" : "",
    seller: isTestMode ? "Ali" : "",
  },
  entryValidities: {
    firstname: false,
    lastname: false,
    username: false,
    studentId: false,
    email: false,
    password: false,
    seller: false,


  },
  EntryIsValid: false,
}

const RegisterUser = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("null");
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const dispatch = useDispatch();// A hook to access redux dispatch function
  
  //A callback function 'useCallback' is used to manage changes to user entries fields, it takes the parameter id and value
  //the inputHandler return a memorised version of the callback function, that only changes if one of the input changes
    const inputHandler = useCallback((inputId, inputValue) => {
      //validating the user entries with the validateInputData functions and obtaining the result
      const result = validateInputData(inputId, inputValue);
      //dispatch an action to Update the formstate depending on the entered values
      dispatchFormState({ inputId, VerifyResult: result, inputValue })
    }, [dispatchFormState])
  
    //This onPress function create an action using the registerUser function with the user input values
    const onPressRegisterAdmin = async () => {
      try {
        setIsLoading(true);
        const action = registerUser(
          formState.entryValues.firstname,
          formState.entryValues.lastname,
          formState.entryValues.username,
          formState.entryValues.studentId,
          formState.entryValues.email,
          formState.entryValues.password,
          formState.entryValues.seller

  
        );
        //Dispatch the action to the redux state management
  
        dispatch(action);
  
        alert("New User Account Created", "Account Created")
        setError(null);
        setIsLoading(false);
        
        //Navigate to the UsersHomeScreen screen so the user can login to the application with the registered credentials.
        navigation.navigate("UsersHomeScreen");
      } catch (error) {
        console.log('error');
        setError(error.message);
      }
    }
  
  
    return (
      <KeyboardAvoidingView
        style={styles.productCard}
        behaviour="padding"
      >
  
        <View style={styles.registerContainer}>
  
          <Text style={styles.title}>uniShopify</Text>
          <View style={{ marginVertical: 22 }}>
            <Input
              id="firstname"
              placeholder='Firstname'
              errorText={formState.entryValidities["firstname"]}
              onInputChanged={inputHandler}
              textInputStyle={styles.inputProductName}

            />
  
            <Input
              id="lastname"
              placeholder='Lastname'
              errorText={formState.entryValidities["lastname"]}
              onInputChanged={inputHandler}
              textInputStyle={styles.inputProductName}

            />
            <Input
              id="username"
              placeholder='Username'
              errorText={formState.entryValidities["username"]}
              onInputChanged={inputHandler}
              textInputStyle={styles.inputProductName}

  
            />
             <Input
            id="StudentID"
            placeholder='StudentID'
            errorText={formState.entryValidities["StudentID"]}
            onInputChanged={inputHandler}
            textInputStyle={styles.inputProductName}

  
            />
  
            <Input
              id="email"
              placeholder='email'
              errorText={formState.entryValidities["email"]}
              onInputChanged={inputHandler}
              textInputStyle={styles.inputProductName}

            />
  
            <Input
              id="password"
              placeholder='Password'
              errorText={formState.entryValidities["password"]}
              onInputChanged={inputHandler}
              secureTextEntry={true}
              textInputStyle={styles.inputProductName}

  
            />
            
            <Input
              id="seller"
              placeholder='Seller'
              errorText={formState.entryValidities["seller"]}
              onInputChanged={inputHandler}
              secureTextEntry={true}
              textInputStyle={styles.inputProductName}

  
            />
           
           <View style={{  alignItems: 'center',
}} >
            <TouchableOpacity style={styles.button} onPress={onPressRegisterAdmin}>
              {isLoading && <ActivityIndicator size="small" color="#fff" />}
              <Text style={styles.buttonText}> {isLoading ? 'Registering...' : 'Register'} </Text>
  
            </TouchableOpacity>
            </View>

  
          </View>
  
        </View>
      </KeyboardAvoidingView>
    )
  }
  

export default RegisterUser

