import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from '../assets/stylesheets/style'
import TextInput from '../assets/stylesheets/style'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from "../collections/authSlice";

//A function component for the login dashboard
const Profile = ({ route, navigation }) => {
   const { uid } = route.params || {}; // Fetching the user uid
    const dispatch = useDispatch();// A hook to access redux dispatch function
    const userId = useSelector(state => state.auth.userData?.uid);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

   

    const onPressUserProfile = () => {
        navigation.navigate('PersonalDetails')

    }
    const onPressLoginAdmin = () => {
        navigation.navigate('UserOrders')

    }
    const onPressAddProduct = () => {
      navigation.navigate('AddProduct')

  }
  const onPressLogout = () => {
    dispatch(logout())
    console.log('userData after log out', userId)

    navigation.navigate('Login');

}
if (!isAuthenticated) {
    return null;
}


    return (
        <View style={styles.container}>

            <Text style={{fontStyle: 'italic', fontSize: 50, alignItems: 'center',
    fontWeight: 'bold',
}}>uniShopify</Text>
            <Text style={{fontStyle: 'italic', fontSize: 20, alignItems: 'center',
    fontWeight: 'bold',
}}>Account Overview</Text>

            <TouchableOpacity style={styles.button} onPress={onPressUserProfile}>
                <Text style={styles.buttonText}> Personal Details </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onPressLoginAdmin}>
                <Text style={styles.buttonText}> Orders </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={onPressAddProduct}>
                <Text style={styles.buttonText}> Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressLogout}>
                <Text style={styles.buttonText}> Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

