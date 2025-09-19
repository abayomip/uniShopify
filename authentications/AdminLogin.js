import { StyleSheet, Text, View, KeyboardAvoidingView,ScrollView, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
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

  //A callback function 'useCallback' is used to manage changes to user entries fields, it takes the parameter id and value
  //the inputHandler return a memorised version of the callback function, that only changes if one of the input changes
  const inputHandler = useCallback((inputId, inputValue) => {
    //validating the user entries with the validateInputData functions and obtaining the result  
    const result = validateInputData(inputId, inputValue);
    //dispatch an action to Update the formstate depending on the entered values
    dispatchFormState({ inputId, VerifyResult: result, inputValue })
  }, [dispatchFormState])

  //This onPress function create an action using the LoginAdmin function with the user entered values
  const onPressLoginAdmin = async () => {
    try {
      setIsLoading(true);
      const action = LoginAdmin(
        formState.entryValues.email,
        formState.entryValues.password,
      );
      //Dispatch the action to the redux state management
      await dispatch(action);
      setError(null);
      navigation.navigate('AdminDashboard');
      alert("You are logged in Successfully");
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





  return (
    <KeyboardAvoidingView
      style={styles.productCard}
    >
<ScrollView style={{  marginTop: 47,
}}>
      <Text style={styles.title}>uniShopify</Text>
      
      <Text style={styles.studentLoginSts} >Administrator Login</Text>
      <View style={styles.formContainer}>

        <View style={styles.LoginCard}>
          <Input
            id="email"
            placeholder='email'
            style={styles.loginInput}
            errorText={formState.entryValidities["email"]}
            onInputChanged={inputHandler}
          />
        </View>

        <View style={styles.LoginCard}>
          <Input
            id="password"
            placeholder='Password'
            style={styles.loginInput}
            autoCapitalize="none"
            errorText={formState.entryValidities["password"]}
            onInputChanged={inputHandler}
            secureTextEntry={true}
          />
        </View>
        <Text> Insert details to SignIn</Text>
{error ? <Text style = {{}}>{error}</Text> : null }
        <TouchableOpacity style={styles.buttonInfo} onPress={onPressLoginAdmin}
        disabled= {isLoading}>
        <Text style={styles.buttonInfoText}> LOGIN </Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator size="large"/>}
      </View>


      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AdminLogin

