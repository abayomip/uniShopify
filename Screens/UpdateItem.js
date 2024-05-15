import { StyleSheet, Text, View, FlatList, Button, TextInput, image, TouchableOpacity } from 'react-native';
import React from 'react'
import { useEffect, useState, useRef, setData } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewProductItem } from '../tools/actions/authActions'
import { updateItem } from '../tools/actions/authActions'
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorageInstance, getFirebaseApp } from "../Backend/FirebaseHandler";
import { ref, uploadBytesResumable, getDownloadURL, downloadURL } from "firebase/storage";



//Update student screen function
const UpdateItem = ({ navigation, route }) => {

  //initialising of the states variables using useState hook
  const [data, setData] = useState([])
  const [productData, setProductData] = useState([])
  const [Loading, setLoading] = useState(true)
  const [image, setImage] = useState("");
  const [downloadURL, setDownloadURL] = useState("")
  const { uid } = route.params; // Fetching the user uid


  useEffect(() => {
    //fetch particular product uid details
    ViewProductItem(uid)
      .then((fetchData) => {
        console.log("productData:", fetchData);
        //checking if the data returned is array and ensuring the data retrived is an array
        setProductData(Array.isArray(fetchData) ? fetchData : [fetchData]);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      });
  }, [uid]);
  //ImagePicker function
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
      //upload image 
      await uploadItemImage(result.assets[0].uri, "image")
    }
  }

  const uploadItemImage = async (uri, fileType) => {
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

  //The manageInput function manage user input and set the updated value to productData
  const manageInput = (text, index, field) => {
    //Updating the local state
    setProductData((prevproductData) => {
      //create a shallow copy of the previous array data
      const newDataCopy = [...prevproductData];

      //A shallow copy of the user object at the particular index
      newDataCopy[index] = { ...newDataCopy[index], [field]: text };
      console.log('Updated state:', newDataCopy);

      return newDataCopy;
    });
  };



  //The function calls the updateStudentUser function from the authAction to update user input
  const onPressUpdateItem = async (uid, productData, downloadURL) => {
    try {
      //The function checks if the image uploaded ur is present
      if (downloadURL !== null) {
        //pass the url to the student picture profile field
        productData.productImage = downloadURL
        console.log('Before calling updateItem:', productData.profilePicture);
      }
      console.log('before calling updateItem:', productData);
      //updateItem to update the user record
      await updateItem(uid, productData)

      console.log('after calling updateItem:', updateItem);

      console.log('after state:', productData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }


  return (
    <View style={styles.updateProductCard} >
      {Loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.updateContainer}  >
          <View >
            {productData.map((data, index) => (
              <View key={index}>



                <Image source={{ uri: image || data.productImage }} style={styles.updateImage} />
                <TouchableOpacity style={styles.buttonUpdate} onPress={() => onImageSelect(index)} >
                  <Text style={styles.buttonText}> click to update item picture </Text>
                </TouchableOpacity>
                <View style={styles.update} >
                  <Text style={styles.updateText} >Category:</Text>
                  <TextInput
                    value={data.category}
                    onChangeText={(text) => manageInput(text, index, 'category')}
                    editable={true}
                    style={styles.updateTextInput}
                  />
                </View>
                <View style={styles.update} >
                  <Text style={styles.updateText} >Seller:</Text>
                  <TextInput
                    value={data.seller}
                    onChangeText={(text) => manageInput(text, index, 'seller')}
                    editable={true}
                    style={styles.updateTextInput}
                  />
                </View>

                <View style={styles.update} >
                  <Text style={styles.updateText}>Item ID:</Text>
                  <TextInput
                    value={data.productID}
                    onChangeText={(text) => manageInput(text, index, 'productID')}
                    editable={true}
                    style={styles.updateTextInput}

                  />
                </View>
                <View style={styles.update} >
                  <Text style={styles.updateText}>Name:</Text>
                  <TextInput
                    value={data.productName}
                    onChangeText={(text) => manageInput(text, index, 'productName')}
                    editable={true}
                    style={styles.updateTextInput}
                  />
                </View>
                <View style={styles.update} >
                  <Text style={styles.updateText}>Details:</Text>
                  <TextInput
                    value={data.productDetails}
                    onChangeText={(text) => manageInput(text, index, 'productDetails')}
                    editable={true}
                    style={styles.updateTextInput}
                  />
                </View>

                
                <View style={styles.update} >
                  <Text style={styles.updateText}>Price:</Text>
                  <TextInput
                    value={data.productPrice}
                    onChangeText={(text) => manageInput(text, index, 'productPrice')}
                    editable={true}
                    style={styles.updateTextInput}
                  />
                </View>
                <View style={styles.update} >
                  <Text style={styles.updateText}>productSize:</Text>
                  <TextInput
                    value={data.productSize}
                    onChangeText={(text) => manageInput(text, index, 'productSize')}
                    editable={true}
                    style={styles.updateTextInput}
                  />
                </View>
                <View style={styles.update} >
                  <Text style={styles.updateText}>registerDate:</Text>
                  <TextInput
                    value={data.registerDate}
                    onChangeText={(text) => manageInput(text, index, 'registerDate')}
                    editable={true}
                    style={styles.updateTextInput}
                  />
                </View>
              </View>
            ))}
          </View>
          <Button title="Update" onPress={() => onPressUpdateItem(uid, productData, downloadURL)} />

        </View>
      )}
    </View>
  );





}


export default UpdateItem


