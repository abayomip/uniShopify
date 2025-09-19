import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from '../assets/stylesheets/style'
import TextInput from '../assets/stylesheets/style'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from "../collections/authSlice";
//A function component for the login dashboard
const AdminDashboard = ({ route, navigation }) => {
    const { uid } = route.params || {}; // Fetching the user uid
    const dispatch = useDispatch();// A hook to access redux dispatch function
    const userId = useSelector(state => state.auth.userData?.uid);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const onPressViewItems = () => {
        navigation.navigate('AllProduct')

    }
    const onPressUsersManagement = () => {
        navigation.navigate('ViewAllUsers')

    }
    const onPressOrderManagement = () => {
        navigation.navigate('AdminOrderManagement')

    }
    const onPressReportGeneration = () => {
        navigation.navigate('OrderReport')

    }
    const onPressAddProduct = () => {
        navigation.navigate('AddProduct')

    }

    const onPressLogout = () => {
        dispatch(logout())
        console.log('userData after log out', userId)
        alert("log out Successfully ")

        navigation.navigate('Login');

    }
    if (!isAuthenticated) {
        return null;
    }

    const onPressNewAdmin = () => {
        navigation.navigate('AdminRegistration');
      }
    return (
        <View style={styles.productCard}>
      <View style={{    alignItems: 'center',

}}>
            <Text style={styles.title}>UniShopify</Text>
            <Text style={styles.appValue}>Market Place Student Place....</Text>
            <View style={{ margin: 5, }}>

                <TouchableOpacity style={styles.button} onPress={onPressViewItems}>
                    <Text style={styles.buttonText}> View All Products </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onPressUsersManagement}>
                    <Text style={styles.buttonText}> Users Management</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onPressOrderManagement}>
                    <Text style={styles.buttonText}> Order Management </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onPressReportGeneration}>
                    <Text style={styles.buttonText}> Report Generation </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onPressNewAdmin}>
                <Text style={styles.buttonText}> Register new admin </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={onPressAddProduct}>
                    <Text style={styles.buttonText}> Add Product </Text>
                </TouchableOpacity>
                
            <TouchableOpacity style={styles.button} onPress={onPressLogout}>
                <Text style={styles.buttonText}> Logout</Text>
            </TouchableOpacity>
            </View>

            </View>
        </View>
    )
}

export default AdminDashboard

