import React from 'react'
import { StyleSheet, Text, TextInput,View, KeyboardAvoidingView,ScrollView, Button, TouchableOpacity, ActivityIndicator, TouchableWithoutFeedback, TouchableHighlight, Image, } from 'react-native'
import { useEffect, useState, useRef, useReducer, useCallback } from 'react'
import styles from '../assets/stylesheets/style'

import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL, downloadURL } from "firebase/storage";

//import { useDispatch } from 'react-redux';
import { getStorageInstance, getFirebaseApp } from "../Backend/FirebaseHandler";
import { addProductToCollection } from '../tools/actions/authActions'





const initialState = {

    productImage: "",
    productName: "",
    productDetails:"",
    category:"",
    productSize: "",
    productPrice: "",
    productID: "",
    seller: "",
  }

const AddProduct = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("null");

  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0)
  const [uid, setUid] = useState('');
  const [downloadURL, setDownloadURL] = useState("")
  const [product, setProduct] = useState(initialState);


 

  //Function to select image and store to the DB storage
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
      await upLoadProductImage(result.assets[0].uri, "image")
    }
  }

  const upLoadProductImage = async (uri, fileType) => {
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


  const {productImage, productName, productDetails,
    category, productSize, productPrice,productID,seller,} = product
 
 const handleInput = (field,value) =>{
   setProduct({
     ...product,
     [field]: value,
   })
 }
 const onPressCreateProduct = async () => {
     try{
       if (productImage && productName && productDetails && category, 
         productSize && productPrice && productID &&seller){
           const newProduct ={
            productImage:downloadURL,            
             productName, productDetails,
             category, productSize, productPrice,productID,seller,
             registerDate: new Date().toISOString()
           }
           const newProductId = await addProductToCollection(newProduct)
           setProduct(initialState);
           alert("Product Succefully created: ", newProductId)
          }else{
             alert('Please complete each fields')
           } 
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
          <View style={{flex: 1,  alignItems: 'center',}}>

      {image &&

        <Image source={{ uri: image }} style={{
          width: 370, height: 300, alignItems: 'center', borderWidth: 3,marginTop: 9,borderRadius:5,

        }} />}

      <TouchableOpacity onPress={onImageSelect}>
        <View style={{  }}>
          <Text style={styles.viewTotalSales}>Click to Select a product Image</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.scrollStyleContainer}>

      <TextInput
       style={styles.input}
        value ={productName}
        placeholder='productName'
        onChangeText = {(value)=> handleInput('productName', value)}

        

      />
      
     <View  style={{marginBottom: 10,}}>
      <TextInput
             style={styles.inputProductDetails}
        value ={productDetails}
        placeholder='productDetails'
        onChangeText = {(value)=> handleInput('productDetails', value)}
        multiline
      />
</View>
      <TextInput
             style={styles.input}
        value={category}
        placeholder='category'
        onChangeText = {(value)=> handleInput('category', value)}

        
      />

      <TextInput
        style={styles.input}
        value={productSize}
        placeholder='productSize'
        onChangeText = {(value)=> handleInput('productSize', value)}

      />
      <TextInput
        style={styles.input}
        value={productPrice}
        placeholder='productPrice'
        onChangeText = {(value)=> handleInput('productPrice', value)}
        

      />

      <TextInput
        style={styles.input}
        value ={productID}
        placeholder='productID'
        onChangeText = {(value)=> handleInput('productID', value)}

      />
      <TextInput
        style={styles.input}
        value={seller}
        placeholder='seller'
        onChangeText = {(value)=> handleInput('seller', value)}

      />

</ScrollView>


<View style={{  marginBottom: 45,
}}>
      <TouchableOpacity style={styles.buttonUpdateColl} onPress={onPressCreateProduct}>
        {isLoading && <ActivityIndicator size="small" color="#fff" />}
        <Text style={styles.buttonText}> {isLoading ? 'Registering...' : 'Add To Collection'} </Text>

      </TouchableOpacity>

      </View>

      </View>
    </KeyboardAvoidingView>
  )
}

export default AddProduct

