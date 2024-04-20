import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { ViewSingleStudent } from '../tools/actions/authActions'
import { useEffect, useState } from 'react'

const Search = ({ route, navigation }) => {
  const navigateToProduct = () => {
    navigation.navigate('AddProduct'); // Pass any necessary params { productId: 123 }
  };




  return (
    <View>

      <Text>Home Screen</Text>
      <Button title="View Product" onPress={navigateToProduct} />
    </View>
  );
};

export default Search

const styles = StyleSheet.create({})