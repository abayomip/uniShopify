import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import React from 'react'
import { useEffect, useState, setData } from 'react'
import styles from '../assets/stylesheets/style'
import Input from '../assets/stylesheets/textInput'
import { ViewProductItem } from '../tools/actions/authActions'
import { ProductRetriever } from '../tools/actions/authActions'
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from "../collections/authSlice";
import { fetchProductsToCart } from '../tools/actions/authActions'
import { updateProductDB } from '../tools/actions/authActions'
//import { useAuth } from './AuthContext'; // Import the AuthContext for accessing user information
import { firstnameRetriever } from '../tools/actions/authActions'


const Product = ({ route, navigation }) => {
  const [productData, setProductData] = useState([])
  //const [products, setProducts] = useState([])
  //const { user } = useAuth(); // Access the user information from the AuthContext
  const [userData, setUserData] = useState([])

  const [cart, setCart] = useState([])
  // console.log("data:", data);
  const { uid } = route.params || {}; // Fetching the user uid
  const dispatch = useDispatch();// A hook to access redux dispatch function
  //const productData = useSelector(state => state.auth.productData);
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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

    navigation.navigate('UpdateStudent', { uid })

  }




useEffect(() => {
  //Fetch Student details 
  async function fetctUser() {
    const data = await firstnameRetriever();
    console.log("Loggedlong user", data)
    const studentData = JSON.parse(data);
  if(studentData){
    console.log("userr", userData)

    setUserData(studentData)

  }

  }
  fetctUser()
}, [uid]);

const AddToCart = async (item) =>{
  try {
if(userData && userData.uid){
  console.log("datam", userData.uid)
  console.log("datm", item)
  const uid = userData.uid; 
  await fetchProductsToCart( uid,item);
  await updateProductDB(item.uid);
  alert('Product is succesfully added to cart')

}else{
  console.error('No data or User ID not available');
  alert('Error adding product to Cart')

}
} catch (error) {
  console.error('Error', 'adding item to shopping bag:', error);
}
};


  //Product details are rendered as items
  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.productImage }} style={styles.productImage} />
      <View style={styles.itemProduct}>
        <Text style={styles.productCategory}> {item.category}</Text>

        <Text style={styles.productDetails}>Product ID: {item.productID}</Text>

        <Text style={styles.productName}> {item.productName} </Text>
        <Text style={styles.productDetails}>Product Details: {item.productDetails}</Text>
        <View style={styles.rowValueOne}>
          <Text style={styles.productPrice}>Price: £{item.productPrice}</Text>
          <Text style={styles.productSize}>Product Size: {item.productSize}</Text>

        </View>

        <Text style={""}>Date Added: {item.registerDate}</Text>

      </View>


      <View style={styles.item}>
        <TouchableOpacity style={styles.sectionButton} >
          <Text onPress={() => AddToCart(item)} style={styles.buttonTextOption}>  Add to bag </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sectionButton}  >
          <Text onPress={{}} style={styles.buttonTextOption}>  Add to Wishlist </Text>
        </TouchableOpacity>
       
      </View>


    </View>
  );

  return (
    //<KeyboardAwareScrollView>
    <FlatList
      data={productData}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid}
    //numColumns={1} // Example: Render items in two columns
    // Other props for customization...
    />
    // </KeyboardAwareScrollView>
  )
}
export default Product

