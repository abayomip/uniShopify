import { Text, View, FlatList, ScrollView, Button } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewProducts } from '../tools/actions/authActions'
import { DeleteStudentProfile } from '../tools/actions/authActions'
import { Image, TouchableOpacity } from 'react-native';
 import { FetchCategory } from '../tools/actions/authActions'
 import { firstnameRetriever } from '../tools/actions/authActions'
 import { useSelector } from 'react-redux';
 import { useDispatch } from 'react-redux';

const UniShop = ({ route, navigation }) => {
  const [productData, setProductData] = useState([])
  const [firstname, setFirstname] = useState([])

  const { uid } = route.params || {}; // Fetching the user uid
  //const dispatch = useDispatch();// A hook to access redux dispatch function
  //const userData = useSelector(state => state.auth.userData);
  //const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  //console.log("productData:", productData);

  // useEffect(() => {
  //   //Fetch product details 
  //   FetchCategory()
  //     .then((fetchData) => {
  //       console.log("fetchDatat:", fetchData);

  //       setCategory(fetchData);
  //       console.log("setCategory:", category);
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, []);




  useEffect(() => {
    //Fetch Student details 
    async function fetctUser() {
      const data = await firstnameRetriever();
      console.log("Loggedinp user", data)
      //fetch student details to studentData
      const studentData = JSON.parse(data);

      //fetch particular student uid details
    if(studentData){
      setFirstname(studentData.firstname)
    }
    console.log("user", studentData)

    }
    fetctUser()

  }, [uid]);

  useEffect(() => {
    //Fetch product details 
    ViewProducts()
      .then((fetchData) => {
        console.log("fetchData:", fetchData);

        setProductData(fetchData);
        console.log("setProductData:", productData);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  //onPress button to navigate to the update screen
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
          <Text style={styles.titleProduct} >  {item.productName} </Text>
          <Text style={styles.itemPrice}>Product Price: £{item.productPrice}</Text>
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
      </View>


      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        <Text style={{ fontSize: 30, }}>  {firstname} You are</Text>
        <TouchableOpacity style={styles.signInButton} onPress={onPressLoginAdmin}>
          <Text style={{
            fontSize: 19, fontStyle: 'italic', color: 'red',
            fontWeight: 'bold',


          }}> Sign In! </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      //numColumns={2} // Set the number of columns to 2

      />
    </View>
  )
}
export default UniShop

