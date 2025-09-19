import { Text, View, FlatList, Button,TouchableOpacity, Image} from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { viewSingleOrders } from '../tools/actions/authActions'



const ViewSingleOrder = ({ route, navigation }) => {
    const [orderData, setOrderData] = useState([])
    console.log("Orderdata:", orderData);
    const { uid } = route.params || {}; // Fetching the user uid
    console.log("new uid:", uid);

  
    useEffect(() => {
      //Fetch details 
      viewSingleOrders(uid)
        .then((fetchData) => {
          console.log("fetchData:", fetchData);
  
          setOrderData(fetchData);
          console.log("setOrderData:", orderData);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    }, []);


 

    const renderItem = ({ item }) => (
        <View style={styles.productCard}>
          <View style={{
    }}>

<Text style={styles.Seller}> Seller: {item.seller}</Text>
    
    <Image source={{ uri: item.productImage }} style={styles.productImage} />

    <View style={styles.itemProduct}>
    <Text style={styles.fieldNames}>Product ID:</Text>
    <Text style={styles.productDetails}> {item.productID}</Text>

      <Text style={styles.fieldNames}> Category:</Text>
      <Text style={styles.productDetails}> {item.category}</Text>

      <Text style={styles.fieldNames}> Product: </Text>
      <Text style={styles.productDetails}>{item.productName} </Text>

      <Text style={styles.fieldNames}> Product Details:</Text>
      <Text style={styles.productDetails}>{item.productDetails}</Text>

      <Text style={styles.fieldNames}> Post to:</Text>
      <Text style={styles.productDetails}> {item.name}</Text>
     
      <Text style={styles.fieldNames}> Address:</Text>
      <Text style={styles.productDetails}> {item.address}</Text>

      <Text style={styles.fieldNames}> OrderID:</Text>
      <Text style={styles.productDetails}>{item.orderId}</Text>

        <Text style={styles.fieldNames}>Price:</Text>
        <Text style={styles.productDetails}>£{item.productPrice}</Text>

        <Text style={styles.fieldNames}>Product Size:</Text>
        <Text style={[styles.productDetails,{borderBottomWidth:2,}]}> {item.productSize}</Text>
                </View>
                </View>
                </View>

          );


          return (
            <FlatList
              data={orderData}
              renderItem={renderItem}
              keyExtractor={(item) => item.uid}
            />
          )
        }






export default ViewSingleOrder

