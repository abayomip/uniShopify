import { Text, View, FlatList, Button,TouchableOpacity, Image} from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewOrder } from '../tools/actions/authActions'

const AdminOrderManagement = ({ route, navigation, uid }) => {
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


    const onPressViewProduct = (uid) => {

      navigation.navigate('ViewSingleOrder', { uid })
      console.log("xxx:", uid);
  
    }

    const renderItem = ({ item }) => (
      <View style={styles.cardAllProduct}>

      <View style={styles.itemAllProduct}>
        <Image source={{ uri: item.productImage }} style={styles.allproductImage} resizeMode='contain' />
        <View style={styles.itemContentAllProduct}>
          <Text style={styles.productName} >{item.productName} </Text>
          <Text style={styles.itemOrder}>{item.orderId}</Text>
        </View>
      </View>


      <TouchableOpacity onPress={() => onPressViewProduct(item.uid)} style={{
        flexDirection: 'row', backgroundColor: 'grey',
        borderRadius: 5,
        paddingHorizontal: 90, paddingVertical: 8,

      }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', }}> View Order </Text>
      </TouchableOpacity>
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






export default AdminOrderManagement

