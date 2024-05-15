import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Button, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, TouchableHighlight, Image, } from 'react-native'
import { useEffect, useState, useRef, useReducer, useCallback } from 'react'
import styles from '../assets/stylesheets/style'
import Input from '../assets/stylesheets/textInput'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL, downloadURL } from "firebase/storage";
import { reducer } from '../tools/reducers/formReducer';
import { validateProductInput } from '../tools/actions/formActions';
import { CreateItem } from '../tools/actions/authActions'
import { useDispatch } from 'react-redux';
import { getStorageInstance, getFirebaseApp } from "../Backend/FirebaseHandler";



const isTestMode = true;
//declaring the initial state of the form and its validity status

const initialState = {
  entryValues: {
    productImage: isTestMode ? "Image" : "",
    productName: isTestMode ? "Gucci Print T.Shirt" : "",
    productDetails: isTestMode ? "Designs by London-based artist and illustrator Hattie Stewart lend a vibrant and playful touch to the House's Pre-Fall 2024 collection" : "",
    category: isTestMode ? "Clothing" : "",
    productSize: isTestMode ? "M" : "",
    productPrice: isTestMode ? "£550" : "",
    productID: isTestMode ? "001" : "",
    seller: isTestMode ? "SoSo Ventures" : "",
  },
  entryValidities: {
    productImage: false,
    productName: false,
    productDetails: false,
    category: false,
    productSize: false,
    productPrice: false,
    productID: false,
    seller: false,
  },
  EntryIsValid: false,
}
const AddProduct = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("null");
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();// A hook to access redux dispatch function
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0)
  const [uid, setUid] = useState('');
  const [downloadURL, setDownloadURL] = useState("")


  //The inputHandler function is use to respond to the formState. 
  //A callback function is used to manage changes to user entries fields and it takes the parameter id and value
  //it will return memorised version of the callback that only changes if one of the input changes
  const inputHandler = useCallback((inputId, inputValue) => {
    //validating the user entries with the validateInputData functions and obtaining the result
    const result = validateProductInput(inputId, inputValue);
    //dispatch an action to Update the formstate depending on the entered values
    dispatchFormState({ inputId, VerifyResult: result, inputValue })
  }, [dispatchFormState])


  //Function to selct image and store to the DB storage
  const onImageSelect = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaType: 'photo',
      allowsEditing: true,
      allowsMultipleSelection: false,
      selectionLimit: 1
    });
    //console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      //upload image to database
      await upLoadStudentImage(result.assets[0].uri, "image")
    }
  }

  const upLoadStudentImage = async (uri, fileType) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    //getting the storage instance with getStorageInstance
    const imageStorage = getStorageInstance();
    const storageRef = ref(imageStorage, "image/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob)

    // listen for events
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      // logging the upload progress and changes
      switch (snapshot.state) {
        case 'paused':
          console.log('upload is paused');
          break;
        case 'running':
          console.log('upload is running');
          break;
      }
    },
      (error) => {
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);

          setDownloadURL(downloadURL)

        });
      }
    );
  }



  //This onPress function create an action using the StudentRegister function with the user enterd values
  const onPressCreateProduct = async () => {
    try {
      setIsLoading(true);
      const action = CreateItem(
        downloadURL,
        formState.entryValues.productName,
        formState.entryValues.productDetails,
        formState.entryValues.category,
        formState.entryValues.productSize,
        formState.entryValues.productPrice,
        formState.entryValues.productID,
        formState.entryValues.seller


      );
      //Dispatch the action to the redux state management
      dispatch(action);

      alert("Product Succefully created", "Item Created")
      setError(null);
      setIsLoading(false);
      //Navigate to the AdminDashboard screen
      navigation.navigate("AdminDashboard");
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


      <Text style={{ fontSize: 50, fontWeight: 'bold', paddingBottom: 30, color: 'grey', }}>uniShopify</Text>

      {image &&

        <Image source={{ uri: image }} style={{
          width: 300, height: 200, alignItems: 'center', borderWidth: 2,
        }} />}

      <TouchableOpacity onPress={onImageSelect}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{
            fontWeight: 'bold', fontSize: 20, color: 'grey', paddingHorizontal: 3, padding: 2,
          }}>Click to Select a product Image</Text>
        </View>
      </TouchableOpacity>

      <Input
        //style={styles.input}
        id="productName"
        placeholder='productName'
        // onChangeText={(text) => inputHandler(firstname)}
        errorText={formState.entryValidities["productName"]}
        onInputChanged={inputHandler}
      />
      <Input
        //style={styles.input}
        id="productDetails"
        placeholder='productDetails'
        // onChangeText={(text) => inputHandler(firstname)}
        errorText={formState.entryValidities["productDetails"]}
        onInputChanged={inputHandler}
      />

      <Input
        // style={styles.input}
        id="category"
        placeholder='category'
        //onChangeText={(text) => inputHandler(username)}
        errorText={formState.entryValidities["category"]}
        onInputChanged={inputHandler}

      />

      <Input
        //  style={styles.input}
        id="productSize"
        placeholder='productSize'
        //onChangeText={(text) => inputHandler(email)}
        errorText={formState.entryValidities["productSize"]}
        onInputChanged={inputHandler}

      />
      <Input

        //style={styles.input}
        id="productPrice"
        placeholder='productPrice'
        //onChangeText={(text) => inputHandler(password)}
        errorText={formState.entryValidities["productPrice"]}
        onInputChanged={inputHandler}


      />

      <Input

        //style={styles.input}
        id="productID"
        placeholder='productID'
        //onChangeText={(text) => inputHandler(password)}
        errorText={formState.entryValidities["productID"]}
        onInputChanged={inputHandler}


      />
      <Input

        //style={styles.input}
        id="seller"
        placeholder='seller'
        //onChangeText={(text) => inputHandler(password)}
        errorText={formState.entryValidities["seller"]}
        onInputChanged={inputHandler}


      />




      <TouchableOpacity style={styles.button} onPress={onPressCreateProduct}>
        {isLoading && <ActivityIndicator size="small" color="#fff" />}
        <Text style={styles.buttonText}> {isLoading ? 'Registering...' : 'Register'} </Text>

      </TouchableOpacity>

      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}




    </KeyboardAvoidingView>
  )
}

export default AddProduct

