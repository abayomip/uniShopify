import { StyleSheet, Text, View, FlatList, Button, KeyboardAwareScrollView, ScrollView } from 'react-native';
import React from 'react'
import { useEffect, useState, setData } from 'react'
import styles from '../assets/stylesheets/style'
import Input from '../assets/stylesheets/textInput'
import { ViewProductItem } from '../tools/actions/authActions'
import { ProductRetriever } from '../tools/actions/authActions'
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { firstnameRetriever } from '../tools/actions/authActions'
import { DeleteItem } from '../tools/actions/authActions'


const Item = ({ route, navigation }) => {
  const [productData, setProductData] = useState([])

  const [userData, setUserData] = useState([])

  const { uid } = route.params || {}; // Fetching the user uid
  const dispatch = useDispatch();// A hook to access redux dispatch function


  useEffect(() => {
    //fetch particular product uid details
    ViewProductItem(uid)
      .then((fetchData) => {
        console.log("productData:", fetchData);
        //checking if the data returned is array and ensuring the data retrived is an array
        setProductData(Array.isArray(fetchData) ? fetchData : [fetchData]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      });
  }, [uid]);



  const onPressUpdateStudent = (uid) => {

    navigation.navigate('UpdateItem', { uid })

  }

  const onPressItemDelete = async (uid) => {
    try {
      //This function is call to delete student record
      await DeleteItem(uid)
      console.log('item Deleted');
      navigation.navigate('AllProduct')

    } catch (error) {
      console.error('Error updating user to DB', error);
      throw error;
    }
  };



  useEffect(() => {
    //Fetch Student details 
    async function fetctUser() {
      const data = await firstnameRetriever();
      console.log("Loggedlong user", data)
      const studentData = JSON.parse(data);
      if (studentData) {
        console.log("userr", userData)

        setUserData(studentData)

      }

    }
    fetctUser()
  }, [uid]);




  //Product details are rendered as items
  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={{
}}>
      <Text style={styles.Seller}> {item.seller}</Text>

      <Image source={{ uri: item.productImage }} style={styles.productImage} />
      <View style={styles.itemProduct}>
      <Text style={styles.productDetails}>Product ID: {item.productID}</Text>

        <Text style={styles.productCategory}> Category: {item.category}</Text>


        <Text style={styles.productName}> {item.productName} </Text>
        <Text style={styles.productDetails}> {item.productDetails}</Text>
        <View style={styles.rowValueOne}>
          <Text style={styles.productPrice}>Price: £{item.productPrice}</Text>
          <Text style={styles.productSize}>Product Size: {item.productSize}</Text>

        </View>

        <Text style={styles.productAddedDate}>Date Added: {item.registerDate}</Text>
        </View>
      </View>
      <View style={styles.item}>
      <TouchableOpacity style={styles.sectionButton} >

          <Text onPress={() => onPressItemDelete(item.uid)} style={{fontSize: 20,
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',  width: 120,}}>  Delete </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sectionButton}  >
          <Text onPress={() => onPressUpdateStudent(item.uid)} style={{fontSize: 20,
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',  width: 120,}}>  Update </Text>

        </TouchableOpacity>
      </View>


    </View>
  );

  return (


    <FlatList
      data={productData}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid}
    //numColumns={1} // Example: Render items in two columns
    // Other props for customization...
    />
  )
}
export default Item

