import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView,Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useReducer, useCallback } from 'react'
import styles from '../assets/stylesheets/style'
import Input from '../assets/stylesheets/textInput'
import { reducer } from '../tools/reducers/formReducer';
import { validateInputData } from '../tools/actions/formActions';
import { LoginStudent, dataRetrieve } from '../tools/actions/authActions'
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
//Creating StudentLogin function screen component and initialising states variables using useState and useReducer to update
const StudentLogin = ({ navigation }) => {
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

  //This onPress function create an action using the LoginStudent function with the user entered values
  const onPressStudentLogin = async () => {
    try {
      setIsLoading(true);
      const action = LoginStudent(
        formState.entryValues.email,
        formState.entryValues.password,
      );
      //Dispatch the action to the redux state management
       await dispatch(action);
      setError(null);

      navigation.navigate('HomeScreen');
      alert("You are logged in Successfully");
      setIsLoading(false);
    } catch (error) {
      console.log('Login error:', error);
      setIsLoading(false);
      setError(error.message);
    }
  }
  useEffect(() => {
    if (error) {
      alert("An error occured", error)
    }
  }, [error]
  )
  const onPressNewUser = () => {
    navigation.navigate('RegisterUser');
  }


  return (
    <KeyboardAvoidingView
      style={styles.productCard}
      behaviour="padding"
    >
      <ScrollView style={{  marginTop: 47,
}}>
       <Text style={styles.title}>uniShopify</Text>
       <Text style={styles.studentLoginSts} >Student Login</Text>
        <View style={styles.formContainer}>

        <View style={styles.LoginCard}>
        <Input 
          id="email"
          placeholder='email'
          errorText={formState.entryValidities["email"]}
          onInputChanged={inputHandler}
          style={styles.inputText}

        />
        </View>
        <View style={styles.LoginCard}>
        <Input
          id="password"
          placeholder='Password'
          errorText={formState.entryValidities["password"]}
          onInputChanged={inputHandler}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        </View>

        <Text> Insert details to SignIn</Text>
        <TouchableOpacity style={styles.buttonInfo} onPress={onPressStudentLogin}>
        <Text style={styles.buttonInfoText}> LOGIN </Text>
      </TouchableOpacity>
              </View>
<View style={{marginRight: 12,
}}>
      <TouchableOpacity style={styles.buttonInfo} onPress={onPressNewUser}>
          <Text style={styles.buttonInfoText}> Register for a new Account </Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default StudentLogin

