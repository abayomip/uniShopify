import { Text, View, FlatList, Button, TextInput, Alert, ScrollView } from 'react-native';
import React from 'react'
import { useEffect, useState, setData } from 'react'
import { ViewCart } from '../tools/actions/authActions'
import { Image, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheets/style'
import { firstnameRetriever } from '../tools/actions/authActions'
import { useStripe } from '@stripe/stripe-react-native';
import { order } from '../tools/actions/authActions'
import { fetchProductsFromCart } from '../tools/actions/authActions'
import { deleteProductFromCartDB } from '../tools/actions/authActions'

import { updateCartDB } from '../tools/actions/authActions'


const Cart = ({ route, navigation, item, itemUids }) => {
  const stripe = useStripe();
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([])
  const [userData, setUserData] = useState([])
  const { uid } = route.params || {}; // Fetching the user uid
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');



  useEffect(() => {

    //Fetch Student details 
    const fetctUser = async () => {
      try {
        const data = await firstnameRetriever();
        console.log("Loggedlong user", data)
        const studentData = JSON.parse(data);
        if (studentData) {
          console.log("userr", studentData.uid)
          setLoading(false)
          setUserData(studentData)
        }
        const uid = studentData.uid
        const items = await ViewCart(uid);
        setCartItems(items);
        console.log('Lenght:', cartItems.length);

      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetctUser();
  }, []);



  const TotalProductPrice = () => {
    //checking if the cart is undefined or empty
    if (!cartItems || cartItems.length === 0) {

      return 0;
    }
    //initializing a variable theTotalPrice equal to 0 to store the total amount before calculating the itemprices
    let theTotalPrice = 0;
    //iterate over each item in the cart array
    for (const item of cartItems) {
      //checking if current item exists and has a valid price
      if (item && item.productPrice) {
        theTotalPrice += parseFloat(item.productPrice);
      }
    }

    console.log("Total Price:", theTotalPrice);
    return theTotalPrice.toFixed(2);
  };

  const [theTotalPrice, setTheTotalPrice] = useState(TotalProductPrice());

  useEffect(() => {
    setTheTotalPrice(TotalProductPrice());
  }, [item])




  const handleCheckOut = async (uid) => {

    try {
      if (!name || !address) {
        Alert.alert("insert receiver name and address and try again!");
        console.log('The User supplied a name:', name);
        console.log('The User supplied an address:', address);
        throw new Error('Please enter receiver name and address');
      }

      //retrieve the user Uid to find any item associated with the user when call updateCartDB to delete the item purchased
      const data = await firstnameRetriever();
      console.log("test user", data)
      const studentData = JSON.parse(data);
      if (studentData) {
        console.log("userr", studentData.uid)
        setLoading(false)
        setUserData(studentData)
      }
      const uid = studentData.uid

      //extract the total price from the TotalProductPrice
      const totalPrice = await TotalProductPrice()
      console.log('Total price recieved:', totalPrice);
      const purchasedProducts = cartItems;
      //send payment request to the backend server
      const response = await fetch('http://10.0.2.2:3000/create-payment-intent', {
        method: "POST",
        body: JSON.stringify({
          totalAmount: totalPrice
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //recieving the response from the backend
      const backendData = await response.json();

      if (!response.ok) return Alert.alert(backendData.message);

      //Extracting the client secret ID and OrderID
      const { ClientSecret, orderId } = backendData;
      console.log('orderId:', orderId);

      await stripe.initPaymentSheet({
        paymentIntentClientSecret: ClientSecret,
        merchantDisplayName: 'uniShopify',
      });

      //display the payment sheet
      const presentSheet = await stripe.presentPaymentSheet();

      if (presentSheet.error) return Alert.alert(presentSheet.error.message);

      //If payment succesfull display to user 
      Alert.alert("Payment complete", `Thank you! Your order ID is: ${orderId}`);
      //move items from cartDB to OrderDB with user information 
      await order(orderId, uid, purchasedProducts, name, address);
      //Delete purchased items from the cartDB
      await updateCartDB(uid);

      // Navigate to HomeScreen
      navigation.navigate('HomeScreen');
    } catch (err) {
      console.error(err);
      Alert.alert("There is an issue, try again!");
    }
  };


  const removeItem = async (item) => {
    try {

      const data = await firstnameRetriever();
      console.log("test user", data)
      const studentData = JSON.parse(data);
      if (studentData) {
        console.log("userr", studentData.uid)
        setLoading(false)
        setUserData(studentData)
      }
      const uid = studentData.uid

      //Move item to productDB if user choose not to purchase
      await fetchProductsFromCart(item);


      //delete the item from the cart DB
        console.log("uid received", uid)
        console.log("items RReceived", item)

       await deleteProductFromCartDB(uid, item);

        alert('Product is succesfully removed from cart')
       // navigation.navigate("UniShop");

    
    } catch (error) {
      console.error('Error', 'adding item to shopping bag:', error);
    }
  };







  const renderItem = ({ item }) => (

    <View style={styles.cartContainer}>
      <ScrollView >
        <View style={styles.cartDetailsContainer}>
          <Image source={{ uri: item.productImage }} style={styles.cartImage} />

          <View style={styles.infoCart}>
            <Text style={styles.CartItemName}>{item.productName} </Text>
            <Text style={styles.CartItemPrice}>Price: £{parseFloat(item.productPrice)}</Text>

          </View>

          <View style={styles.removeButton}>
            <Button title="Remove" onPress={() => removeItem(item)} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
  
const renderHeader = () => ( 
  <Text style={styles.itemInfo}>ITEMS: {cartItems ? cartItems.length : 0} </Text>
  
);
  

  return (

    <View style={styles.cartContainerView}>
      <View style={{
        paddingBottom: 10,
      }}>
        <Text style={styles.shoppingBagText}>Your Basket</Text>
        
      </View>

      <View style={{
        borderWidth: 1, paddingLeft: 10, marginHorizontal: 14, marginVertical: 24,

      }}>
        <Text style={styles.cartInfo}>Items in your basket are only reserved, please proceed to insert necessary
          information below and
          checkout to purchase items.</Text>
      </View>



      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
        ListHeaderComponent={renderHeader}
      />


      <View style={{ paddingBottom: 20, }} >
        <TextInput
          placeholder="Reciever Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.recieverName}
        />


        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={text => setAddress(text)}
          style={styles.recieverAddress}
        />
        <View style={styles.addToCartContainer}>
          <TouchableOpacity style={styles.addButtonToCart} onPress={() => handleCheckOut(uid)} >
            <Text style={styles.cartButtonText}>  Pay </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rowValueTwo} >
        <Text style={styles.checkOutInfo}>Subtotal:</Text>
        <Text style={styles.checkOutInfo}>£{TotalProductPrice()}</Text>


      </View>

      <View style={styles.rowValueTwo} >
        <Text style={styles.checkOutInfo}>Standard UK Delivery:</Text>
        <Text style={styles.checkOutInfo}>Free</Text>


      </View>





    </View>




  )
}

export default Cart

