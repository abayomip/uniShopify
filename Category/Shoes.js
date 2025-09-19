import { StyleSheet, Text, View, ScrollView,FlatList} from 'react-native'
import React from 'react'
import { FetchCategory } from '../tools/actions/authActions'
import { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheets/style'

const Shoes = ({ route, navigation }) => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        const shoeItems = async () => {
            try {
              // fetch products in the shoes category
                const itemShoes = await FetchCategory('Shoes');
                setCategory(itemShoes);
            } catch (error) {
                console.error("Error fetching clothing items: ", error)
            }
        };

        shoeItems();
    }, []);


    const onPressViewProduct = (uid) => {

      navigation.navigate('Product', { uid })
      console.log("xxx:", uid);
  
    }
    const onPressLoginAdmin = () => {
      navigation.navigate('Login')
  
    }
    const onPressClothing = () => {
      navigation.navigate('Clothing')
  
    }
  
    const onPressAcademics = () => {
      navigation.navigate('Academics')
  
    }
    const onPressMobile = () => {
      navigation.navigate('MobilePhone')
  
    }
  
    const onPressSofa = () => {
      navigation.navigate('Sofa')
  
    }
  
    const onPressKitchen = () => {
      navigation.navigate('Kitchen')
  
    }
  
    const onPressShoes = () => {
      navigation.navigate('Shoes')
  
    }
  

 //product details are rendered as items
 const renderItem = ({ item }) => (
  <View style={styles.cardAllProduct}>

    <View style={styles.itemAllProduct}>
      <Image source={{ uri: item.productImage }} style={styles.allproductImage} resizeMode='contain' />
      <View style={styles.itemContentAllProduct}>
      <Text style={styles.productName}>{item.productName} </Text>
      <Text style={styles.itemPrice}>Price: £{item.productPrice}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={() => onPressViewProduct(item.uid)} style={{
        flexDirection: 'row', backgroundColor: 'grey',
        borderRadius: 5,
        paddingHorizontal: 90, paddingVertical: 8,

      }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', }}> View Product </Text>
      </TouchableOpacity>
    </View>
      );
    
      return (
        
    <View style={{ flex: 1, }}>
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.buttonCategory} onPress={onPressClothing}>
          <Text style={styles.buttonTextCat}>Clothings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory} onPress={onPressAcademics}>
          <Text style={styles.buttonTextCat}>Academics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory} onPress={onPressMobile}>
          <Text style={styles.buttonTextCat}>Mobiles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory} onPress={onPressSofa}>
          <Text style={styles.buttonTextCat}>Sofa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory} onPress={onPressKitchen}>
          <Text style={styles.buttonTextCat}>Kitchen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory} onPress={onPressShoes}>
          <Text style={styles.buttonTextCat}>Shoes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory} onPress={onPressLoginAdmin}>
          <Text style={styles.buttonTextCat}>Button 7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCategory} onPress={onPressLoginAdmin}>
          <Text style={styles.buttonTextCat}>Button 8</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

        <FlatList
          data={category}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
        
        />
            </View>

      )
    }


export default Shoes

