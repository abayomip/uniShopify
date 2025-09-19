import { StyleSheet, Text, View, TextInput, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'
import { Image, TouchableOpacity } from 'react-native';
import styles from '../assets/stylesheets/style'
import { SearchForProducts } from '../tools/actions/authActions'

const Search = ({ route, navigation }) => {
  const [searchProduct, setSearchProduct] = useState('');
  const [searchResult, setSearchResult] = useState([]);

 

  const handleSearch = async () => {
    try {
      const products = await SearchForProducts(searchProduct);
      setSearchResult(products);
    } catch (error) {
      console.error("Error fetching items: ", error)
    }
  };

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

    <View style={{  }}>
   
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.buttonCategory} onPress={onPressClothing}>
            <Text style={styles.buttonTextCat}> Clothings! </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCategory} onPress={onPressAcademics}>
            <Text style={styles.buttonTextCat}> Academics! </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCategory} onPress={onPressMobile}>
            <Text style={styles.buttonTextCat}> Mobiles! </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCategory} onPress={onPressSofa}>
            <Text style={styles.buttonTextCat}> Sofa! </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCategory} onPress={onPressKitchen}>
            <Text style={styles.buttonTextCat}> Kitchen! </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCategory} onPress={onPressShoes}>
            <Text style={styles.buttonTextCat}> Shoes! </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCategory} onPress={onPressLoginAdmin}>
            <Text style={styles.buttonTextCat}> Buuton7! </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCategory} onPress={onPressLoginAdmin}>
            <Text style={styles.buttonTextCat}> Buuton8! </Text>
          </TouchableOpacity>
        </ScrollView>
   
       
      <TextInput
        style={styles.inputSearchText}
        placeholder='Enter search term here'
        value={searchProduct}
        onChangeText={setSearchProduct}
        textInputStyle={styles.inputText}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch} >
        <Text style={styles.buttonText}> Click </Text>
      </TouchableOpacity>
      
      <FlatList
        data={searchResult}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}

      />
    </View>
    
  )
}

export default Search

