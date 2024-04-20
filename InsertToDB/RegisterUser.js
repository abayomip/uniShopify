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
    email: isTestMode ? "example@example.com" : "",
    password: isTestMode ? "************" : "",
  },
  entryValidities: {
    firstname: false,
    lastname: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  EntryIsValid: false,
}

const RegisterUser = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("null");
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const dispatch = useDispatch();// A hook to access redux dispatch function
  
      //The inputHandler function is use to respond to the formState. 
    //A callback function is used to manage changes to user entries fields and it takes the parameter id and value
    //it will return memorised version of the callback that only changes if one of the input changes
    const inputHandler = useCallback((inputId, inputValue) => {
      //validating the user entries with the validateInputData functions and obtaining the result
      const result = validateInputData(inputId, inputValue);
      //dispatch an action to Update the formstate depending on the entered values
      dispatchFormState({ inputId, VerifyResult: result, inputValue })
    }, [dispatchFormState])
  
    //This onPress function create an action using the StudentRegister function with the user enterd values
    const onPressRegisterAdmin = async () => {
      try {
        setIsLoading(true);
        const action = registerUser(
          formState.entryValues.firstname,
          formState.entryValues.lastname,
          formState.entryValues.username,
          formState.entryValues.email,
          formState.entryValues.password,
          formState.entryValues.confirmPassword
  
  
        );
        //Dispatch the action to the redux state management
  
        dispatch(action);
  
        alert("New User Account Created", "Account Created")
        setError(null);
        setIsLoading(false);
        //Navigate to the AdminDashboard screen
  
        navigation.navigate("AdminLogin");
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
              //style={styles.input}
              id="firstname"
              placeholder='Firstname'
              // onChangeText={(text) => inputHandler(firstname)}
              errorText={formState.entryValidities["firstname"]}
              onInputChanged={inputHandler}
            />
  
            <Input
              //  style={styles.input}
              id="lastname"
              placeholder='Lastname'
              //onChangeText={(text) => inputHandler(lastname)}
              errorText={formState.entryValidities["lastname"]}
              onInputChanged={inputHandler}
            />
            <Input
              // style={styles.input}
              id="username"
              placeholder='Username'
              //onChangeText={(text) => inputHandler(username)}
              errorText={formState.entryValidities["username"]}
              onInputChanged={inputHandler}
  
            />
  
            <Input
              //  style={styles.input}
              id="email"
              placeholder='email'
              //onChangeText={(text) => inputHandler(email)}
              errorText={formState.entryValidities["email"]}
              onInputChanged={inputHandler}
  
            />
  
            <Input
  
              //style={styles.input}
              id="password"
              placeholder='Password'
              //onChangeText={(text) => inputHandler(password)}
              errorText={formState.entryValidities["password"]}
              onInputChanged={inputHandler}
              secureTextEntry={true}
  
  
            />
            <Input
              //style={styles.input}
              id="confirmPassword"
              placeholder='Confirm Password'
              //onChangeText={(text) => inputHandler(confirmPassword)}
              errorText={formState.entryValidities["confirmPassword"]}
              onInputChanged={inputHandler}
              secureTextEntry={true}
  
  
            />
  
            <TouchableOpacity style={styles.button} onPress={onPressRegisterAdmin}>
              {isLoading && <ActivityIndicator size="small" color="#fff" />}
              <Text style={styles.buttonText}> {isLoading ? 'Registering...' : 'Register'} </Text>
  
            </TouchableOpacity>
  
            <Button title="Go back" onPress={() => navigation.goBack()} />
  
          </View>
  
        </View>
      </KeyboardAvoidingView>
    )
  }
  

export default RegisterUser

