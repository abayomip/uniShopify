import { StyleSheet, Text, View, FlatList, SafeAreaView, ScrollView, Button } from 'react-native';
import React from 'react'
import { useEffect, useState, setData } from 'react'
import styles from '../assets/stylesheets/style'
import { FetchSimilarCategory } from '../tools/actions/authActions'
import Input from '../assets/stylesheets/textInput'
import { ViewProductItem } from '../tools/actions/authActions'
import { ProductRetriever } from '../tools/actions/authActions'
import { Image, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserProductView = ({ route, navigation }) => {
  const [productData, setProductData] = useState([])
  const [isPolicy, setIsPolicy] = useState(false)
  const [isCustomerServices, setIsCustomerServices] = useState(false)
  const [isAbout, setIsAbout] = useState(false)


  const [selectedByCategory, setSelectedByCategory] = useState([])
  const { uid } = route.params || {}; 



  useEffect(() => {
    //fetch particular product uid details
    ViewProductItem(uid)
      .then(async (fetchData) => {
        console.log("productData:", fetchData);
        // utilizing useState to update the retreived data 
        setProductData([fetchData]);

        if (fetchData && fetchData.category) {
          console.log("test:", fetchData.category);
          const fetchedProductsByCategory = await FetchSimilarCategory(fetchData.category, fetchData.uid);
          setSelectedByCategory(fetchedProductsByCategory)
          const uid = fetchData.uid
          console.log("category products:", selectedByCategory);
          console.log("category uid:", uid);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      });
  }, [uid]);







  //Product details are rendered as items
  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={{
      }}>

        <Image source={{ uri: item.productImage }} style={styles.productImage} />
        <View style={styles.itemProduct}>

          <Text style={styles.Seller}>{item.seller}</Text>
          <Text style={{ fontSize: 14 }}>{item.category}</Text>
          <Text style={styles.productName}>{item.productName}</Text>

          <View style={styles.rowValueOne}>

            <Text style={styles.productPrice}>£{item.productPrice}</Text>

          </View>

          <View style={styles.item}>
            <TouchableOpacity style={styles.sectionButton} >
              <Text onPress={onPressToSignIn} style={styles.buttonTextOption}>  Add to bag </Text>
            </TouchableOpacity>

          </View>

          <Text style={styles.fieldNames}>Product Description:</Text>

          <Text style={styles.productDetails}>{item.productDetails}</Text>
          <Text style={styles.fieldNames}>Product Size: </Text>

          <Text style={styles.productDetails}> {item.productSize}</Text>
        </View>
      </View>
    </View>

  );



  const onPressViewProduct = (uid) => {
    navigation.navigate('UserProductView', { uid })
    console.log("cat:", uid);
  }

  const onPressToSignIn = () => {
    navigation.navigate('Login')
    alert("Please sign to add Items to your shopping bag")

  }


  const handlePolicy = () => {
    setIsPolicy(!isPolicy)
  }

  const handleCS = () => {
    setIsCustomerServices(!isCustomerServices)
  }

  const handleAbout = () => {
    setIsAbout(!isAbout)
  }

  return (
    <SafeAreaView style={{}}>
      <FlatList
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
        ListFooterComponent={
          <>
            <Text style={styles.headerText}>Product of similar category</Text>
            <ScrollView horizontal style={styles.scrollView}>
              {selectedByCategory.map(selectedByCategory => (
                <View key={selectedByCategory.uid} style={styles.similarContainer}>

                  <View style={styles.itemAllCategoryProduct}>
                    <Image source={{ uri: selectedByCategory.productImage }} style={styles.SimilarCatImage} resizeMode='contain' />
                    <View style={styles.itemContentAllProduct}>
                      <Text style={styles.titleCatProduct} >{selectedByCategory.productName} </Text>
                      <Text style={styles.itemPrice}>Price: £{selectedByCategory.productPrice}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => onPressViewProduct(selectedByCategory.uid)} style={{
                    flexDirection: 'row', backgroundColor: 'grey',
                    borderRadius: 5,
                    paddingHorizontal: 10, paddingVertical: 8, width: 190, height: 35,
                    alignSelf: 'center', marginBottom: 13,


                  }}>
                    <Text style={{
                      color: 'white', marginLeft: 30,
                      fontSize: 15, fontWeight: 'bold', textAlign: 'center',
                    }}> View Product </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            <Text style={styles.headerText}>Helpful Infomation</Text>

            <View style={styles.productCard}>
              <View style={{
                marginTop: 7, marginBottom: 10, marginLeft: 9, marginRight: 9,
              }}>

                <TouchableOpacity style={styles.extraButton} onPress={handleCS}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <Text style={styles.extraText}>Customer Services </Text>
                    <MaterialCommunityIcons
                      name={'isCustomerServices' ? 'chevron-down' : 'chevron-up'}
                      size={20}
                      color={'black'} />
                  </View>
                </TouchableOpacity>
                {isCustomerServices && (
                  <View style={{}}>
                    <Text style={{}}> Student Login </Text>
                  </View>
                )}


                <TouchableOpacity style={styles.extraButton} onPress={handlePolicy}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <Text style={styles.extraText}>Policy </Text>
                    <MaterialCommunityIcons
                      name={'isCustomerServices' ? 'chevron-down' : 'chevron-up'}
                      size={20}
                      color={'black'} />
                  </View>
                </TouchableOpacity>
                {isPolicy && (
                  <View style={{}}>
                    <Text style={{}}> Student Login </Text>
                  </View>
                )}



                <TouchableOpacity style={styles.extraButton} onPress={handleAbout}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <Text style={styles.extraText}>About uniShopify </Text>
                    <MaterialCommunityIcons
                      name={'isCustomerServices' ? 'chevron-down' : 'chevron-up'}
                      size={20}
                      color={'black'} />
                  </View>
                </TouchableOpacity>
                {isAbout && (
                  <View style={{}}>
                    <Text style={{}}> Student Login </Text>
                  </View>
                )}
              </View>
            </View>
          </>
        }

      />

    </SafeAreaView>
  )
}

export default UserProductView

