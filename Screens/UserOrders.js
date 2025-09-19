import { Text, View, FlatList, Button,TouchableOpacity, Image} from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewUserOrders } from '../tools/actions/authActions'
import { firstnameRetriever } from '../tools/actions/authActions'

const UserOrders = ({ route, navigation }) => {
    const [orderData, setOrderData] = useState([])
    console.log("Orderdata:", orderData);
    const { uid } = route.params || {}; // Fetching the user uid
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([])
    const [userData, setUserData] = useState([])



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
            const items = await ViewUserOrders(uid);
            setOrderData(items);
    
          } catch (error) {
            console.error('Error:', error);
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetctUser();
      }, []);


    const renderItem = ({ item }) => (
        <View style={styles.productCard}>
          <View style={{        



    }}>

          <Text style={styles.Seller}>Seller: {item.seller}</Text>
    
          <Image source={{ uri: item.productImage }} style={styles.productImage} />

          <View style={styles.itemProduct}>
          <Text style={styles.fieldNames}>Product ID:</Text>
          <Text style={styles.productDetails}> {item.productID}</Text>

            <Text style={styles.fieldNames}> Category:</Text>
            <Text style={styles.productDetails}> {item.category}</Text>

            <Text style={styles.fieldNames}> Product: </Text>
            <Text style={styles.productDetails}>{item.productName} </Text>

            <Text style={styles.fieldNames}> Product Details:</Text>
            <Text style={styles.productDetails}> {item.productDetails}</Text>

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
            //numColumns={2}
            />
          )
        }






export default UserOrders

