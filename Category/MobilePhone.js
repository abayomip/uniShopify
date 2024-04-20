import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React from 'react'
import { FetchCategory } from '../tools/actions/authActions'
import { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheets/style'

const MobilePhone = ({ route, navigation }) => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        const mobileItems = async () => {
            try {
                const itemMobiles = await FetchCategory('Mobile');
                setCategory(itemMobiles);
            } catch (error) {
                console.error("Error fetching clothing items: ", error)
            }
        };

        mobileItems();
    }, []);


    const renderItem = ({ item }) => (
        <View style={styles.productCard}>
          <Image source={{ uri: item.productImage }} style={styles.productImage} />
          <View style={styles.itemProduct}>
            <Text style={styles.productCategory}> {item.category}</Text>
    
            <Text style={styles.productDetails}>Product ID: {item.productID}</Text>
    
            <Text style={styles.productName}> {item.productName} </Text>
            <Text style={styles.productDetails}>Product Details: {item.productDetails}</Text>
            <View style={styles.rowValueOne}>
              <Text style={styles.productPrice}>Price: {item.productPrice}</Text>
              <Text style={styles.productSize}>Product Size: {item.productSize}</Text>
    
            </View>
    
            <Text style={""}>Date Added: {item.registerDate}</Text>
    
          </View>
          <View style={styles.item}>
            <TouchableOpacity style={{
              flex: 1, padding: 12,
              alignItems: 'center', justifyContent: 'space-between'}} >
              <Text onPress={() => onPressUpdateStudent(item.uid)} style={styles.spbuttonText}>  Add to bag </Text>
    
            </TouchableOpacity>
    
            <TouchableOpacity style={{
              flex: 1, padding: 12,
              alignItems: 'center', justifyContent: 'space-between'}} >
              <Text onPress={() => onPressUpdateStudent(item.uid)} style={styles.spbuttonText}>  Add to Wishlist </Text>
    
            </TouchableOpacity>
          </View>
    
    
        </View>
      );
    
      return (
        //<KeyboardAwareScrollView>
        <FlatList
          data={category}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
        //numColumns={1} // Example: Render items in two columns
        // Other props for customization...
        />
        // </KeyboardAwareScrollView>
      )
    }


export default MobilePhone

