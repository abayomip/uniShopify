import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useReducer, useCallback } from 'react'
import styles from '../assets/stylesheets/style'
import Input from '../assets/stylesheets/textInput'
import { reducer } from '../tools/reducers/formReducer';
import { validateInputData } from '../tools/actions/formActions';
import { LoginAdmin } from '../tools/actions/authActions'
import { useDispatch } from 'react-redux';

//setting testmode true  to toggle between test mode and production mode
const isTestMode = true;
//declaring the initial state of the form and its validity status
const initialState = {
  entryValues: {
    email: isTestMode ? "example@example.com" : "",
    password: isTestMode ? "************" : "",
  },
  entryValidities: {
    email: false,
    password: false,

  },
  EntryIsValid: false,
}
//Creating AdminLogin function screen component and initialising states variables using useState and useReducer to update
const AdminLogin = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  //The inputHandler function is use to respond to the formState. 
  //A callback function is used to manage changes to user entries fields and it takes the parameter id and value
  //it will return memorised version of the callback that only changes if one of the input changes
  const inputHandler = useCallback((inputId, inputValue) => {
    //validating the user entries with the validateInputData functions and obtaining the result  
    const result = validateInputData(inputId, inputValue);
    //dispatch an action to Update the formstate depending on the entered values
    dispatchFormState({ inputId, VerifyResult: result, inputValue })
  }, [dispatchFormState])

  //This onPress function create an action using the LoginAdmin function with the user entered values
  const onPressLoginAdmin = async  () => {
    try{
      setIsLoading(true);
   
      const action = LoginAdmin(
        formState.entryValues.email,          
        formState.entryValues.password,  
      );
      //Dispatch the action to the redux state management
       await dispatch(action);
      setError(null);
      navigation.navigate('AdminDashboard');
      alert("Login Successfully", "You are logged in");
      setIsLoading(false);


    } catch (error) {
      console.log('error');
      setIsLoading(false);
      setError(error.message);
    }
  }
  useEffect(() => {
    if (error) {
      alert("An error occured", error)
    }
  }, [error]);


  const onPressNewAdmin = () => {
    navigation.navigate('AdminRegistration');
  }


  return (
    <KeyboardAvoidingView
      style={styles.productCard}
      behaviour="padding"
    >

        <Text style={styles.title}>uniShopify</Text>
        <Text>Administrator Login</Text>
        <Input
          id="email"
          placeholder='email'
          errorText={formState.entryValidities["email"]}
          onInputChanged={inputHandler}
        />

        <Input
          id="password"
          placeholder='Password'
          autoCapitalize="none"
          //onChangeText={(text) => inputHandler(password)}
          errorText={formState.entryValidities["password"]}
          onInputChanged={inputHandler}
          secureTextEntry={true}
        />
        <Text> Insert details to SignIn</Text>

        <Button
          title="LOGIN"
          onPress={onPressLoginAdmin}
          isLoading={isLoading}
          style={styles.loginButton}></Button>


        <TouchableOpacity style={styles.buttonInfo} onPress={onPressNewAdmin}>
          <Text style={styles.buttonInfoText}> Register new admin </Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default AdminLogin

