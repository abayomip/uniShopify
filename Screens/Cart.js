import {  Text, View, FlatList, Button, Alert} from 'react-native';
import React from 'react'
import { useEffect, useState, setData } from 'react'
import { ViewCart } from '../tools/actions/authActions'
import { Image, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheets/style'
import { firstnameRetriever } from '../tools/actions/authActions'
import { useStripe } from '@stripe/stripe-react-native';
//import PayPal from 'react-native-paypal';



const Cart = ({ route, navigation, item }) => {
  const stripe = useStripe()

  const [cartItems, setCartItems] = useState([])
const [loading, setLoading] = useState(true);
const [error, setError] = useState([])
const [userData, setUserData] = useState([])
const { uid } = route.params || {}; // Fetching the user uid

useEffect(() => {
 
  //Fetch Student details 
  const  fetctUser = async()=> {
    try{
    const data = await firstnameRetriever();
    console.log("Loggedlong user", data)
    const studentData = JSON.parse(data);
  if(studentData){
    console.log("userr", studentData.uid)
setLoading(false)
setUserData(studentData)
  }
const uid = studentData.uid
const items = await ViewCart(uid);
setCartItems(items);
  
} catch (error) {
console.error('Error:', error);
setError(error.message);
} finally {
setLoading(false);
}
};

fetctUser();
}, []);


// const onPressHandlePayment = () => {
//   navigation.navigate('HandlePayment')

// }
// const handlePayPalCheckout = async () => {
//   try {
//     const paymentResponse = await PayPal.requestOneTimePayment(
//       'Ab1AsLSOviSE768nZku0HUk3Y3k3vUcfQnEihMKDJgXmWIDxJkb0Qe9XQxZee8PCFWNBHObi-be3tsPW',
//       {
//         amount: theTotalPrice.toString(),
//         currency: 'GBP',
        
//       }
//     );

//     if (paymentResponse?.response?.id) {
//       // Payment was successful
//       Alert.alert('Payment Successful', 'Thank you for your purchase!');
//     } else {
//       // Payment was canceled or failed
//       Alert.alert('Payment Error', 'Payment was not successful.');
//     }
//   } catch (error) {
//     console.error('PayPal Error:', error);
//     Alert.alert('PayPal Error', 'An error occurred while processing payment.');
//   }
// };



const TotalProductPrice = () => {
  if(!cartItems || cartItems.length === 0) {
    return 0;
  }
  
  let theTotalPrice = 0;
  for (const item of cartItems) {
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

const handleCheckout = async () => {
  console.log('Payment button pressed'); // Add this console log

  try {
    // Example: Fetch total price from your backend server
    const totalPrice = await TotalProductPrice();

    // Example: Call your backend server to create a payment intent
    const response = await fetch('http://192.168.0.87:3000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalAmount: totalPrice }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();

    // Example: Use Stripe's client SDK to handle payment
    const { clientSecret } = data;
    const { error, paymentIntent } = await stripe.confirmPayment(clientSecret, {
      payment_method: {
        card: cardElement, // Assuming you have a card element from Stripe's Elements
        billing_details: {
          name: 'Customer Name', // Replace with actual customer name
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      // Payment succeeded, handle success scenario (e.g., show success message)
      console.log('Payment succeeded:', paymentIntent);
    } else {
      // Payment failed or is still processing, handle accordingly
      console.log('Payment status:', paymentIntent.status);
    }
  } catch (error) {
    // Handle errors (e.g., display error message to the user)
    console.error('Error processing payment:', error);
  }
};



  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.productImage }} style={styles.productImage} />
      <View style={styles.itemProduct}>
        <Text style={styles.productCategory}> {item.category}</Text>

        <Text style={styles.productDetails}>Product ID: {item.productID}</Text>

        <Text style={styles.productName}> {item.productName} </Text>
        <Text style={styles.productDetails}>Product Details: {item.productDetails}</Text>
        <View style={styles.rowValueOne}>
          <Text style={styles.productPrice}>Price: £{parseFloat(item.productPrice)}</Text>
          <Text style={styles.productSize}>Product Size: {item.productSize}</Text>

        </View>

        <Text style={""}>Date Added: {item.registerDate}</Text>

      </View>
     


    </View>
  );
  return (
    <View>
      <Text style={{  fontSize: 16,
  fontWeight: 'bold',fontStyle: 'italic',  marginBottom: 7,
}}>Shopping Bag</Text>
   <Text style={{  fontSize: 16,
  fontWeight: 'bold',fontStyle: 'italic',  marginBottom: 7,
}}>Total Price: £{TotalProductPrice()}</Text>
<TouchableOpacity style={{   color: '#fff',fontSize: 16,fontWeight: 'bold',  marginBottom: 7,}} onPress={handleCheckout} >
          <Text style={styles.spbuttonText}>  Pay </Text>
  </TouchableOpacity>
    <FlatList
      data={cartItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid}
      //numColumns={2} // Set the number of columns to 2
    />
     <View style={styles.totalContainer}></View>
 
 <TouchableOpacity style={{flex: 1, padding: 12,
          alignItems: 'center', justifyContent: 'space-between'}} >
          <Text onPress={""} style={styles.spbuttonText}>  Add to Wishlist </Text>
  </TouchableOpacity>
   
   </View>
   
  )
}

export default Cart

