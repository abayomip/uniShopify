import { Text, View, FlatList, Button,TouchableOpacity, Image, ScrollView} from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewOrder } from '../tools/actions/authActions'

const OrderReport = ({ route, navigation }) => {
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

    const onPressOrderReport = () => {
        navigation.navigate('ReportGeneration')

    }
    const renderItem = ({ item }) => (
<ScrollView style={{flex: 1, margin: 1,paddingBottom: 10}}>
<View style={styles.productCard}>
               

          <Text style={styles.orderSeller}>Seller Name: {item.seller}</Text>
          <View style={styles.itemProduct}>
            <Text style={styles.fieldNames}> Product Name: {item.productName} </Text>
            <Text style={styles.fieldNames}>Price: £{item.productPrice}</Text>

            <Text style={styles.fieldNames}> Customer Name: {item.name}</Text>

            <Text style={styles.fieldNames}> Address: {item.address}</Text>
            <Text style={styles.fieldNames}> OrderID: {item.orderId}</Text>

                </View>
                </View>
                </ScrollView>
          );


          return (
            
            <View>
                <View style={{  alignItems: 'center',paddingBottom: 5
}}>
                <TouchableOpacity style={{}} onPress={onPressOrderReport}>
                    <Text style={styles.viewTotalSales}> Click to view Total sales per seller </Text>
                </TouchableOpacity>
                </View>
            <FlatList
              data={orderData}
              renderItem={renderItem}
              keyExtractor={(item) => item.uid}
            />
            </View>
          )
        }






export default OrderReport

