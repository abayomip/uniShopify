import { Text, View, FlatList, Button,TouchableOpacity, Image} from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewOrder } from '../tools/actions/authActions'

const AdminOrderManagement = ({ route, navigation }) => {
    const [orderData, setOrderData] = useState([])
    console.log("Orderdata:", orderData);
  
  
    useEffect(() => {
      //Fetch Student details 
      ViewOrder()
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
                    <Text style={styles.productCategory}> Name: {item.name}</Text>

          <Text style={styles.Seller}> {item.seller}</Text>
    
          <Image source={{ uri: item.productImage }} style={styles.productImage} />

          <View style={styles.itemProduct}>
          <Text style={styles.productDetails}>Product ID: {item.productID}</Text>
    
            <Text style={styles.productCategory}> Category: {item.category}</Text>
    
    
            <Text style={styles.productName}> {item.productName} </Text>
            <Text style={styles.productDetails}> {item.productDetails}</Text>
            <Text style={styles.productCategory}> Address: {item.address}</Text>
            <Text style={styles.productCategory}> OrderID: {item.orderId}</Text>

            <View style={styles.rowValueOne}>
              <Text style={styles.productPrice}>Price: £{item.productPrice}</Text>
              <Text style={styles.productSize}>Product Size: {item.productSize}</Text>
    
            </View>
                </View>
                </View>
                </View>

          );


          return (


            <FlatList
              data={orderData}
              renderItem={renderItem}
              keyExtractor={(item) => item.uid}
            //numColumns={1} // Example: Render items in two columns
            // Other props for customization...
            />
          )
        }






export default AdminOrderManagement

