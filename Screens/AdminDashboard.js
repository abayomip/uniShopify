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
    const userData = useSelector(state => state.auth.userData);
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
        navigation.navigate('AdminOrderManagement')

    }
    const onPressAddProduct = () => {
        navigation.navigate('AddProduct')

    }

    const onPressLogout = () => {
        dispatch(logout())
        console.log('userData after log out', uid)

        navigation.navigate('Login');

    }
    if (!isAuthenticated) {
        return null;
    }
    return (
        <View style={styles.productCard}>

            <Text style={{
                fontStyle: 'italic', fontSize: 50, alignItems: 'center',
                fontWeight: 'bold', paddingBottom: 5, paddingTop: 80,
            }}>UniShopify</Text>
            <Text style={{
                paddingBottom: 40, fontStyle: 'italic',
            }}>Market Place Student Place....</Text>
            <View style={{ margin: 5, }}>

                <TouchableOpacity style={styles.button} onPress={onPressViewItems}>
                    <Text style={styles.buttonText}> View All Items </Text>
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
                <TouchableOpacity style={styles.button} onPress={onPressAddProduct}>
                    <Text style={styles.buttonText}> Add Product </Text>
                </TouchableOpacity>
                
            <TouchableOpacity style={styles.button} onPress={onPressLogout}>
                <Text style={styles.buttonText}> Logout</Text>
            </TouchableOpacity>
            </View>


        </View>
    )
}

export default AdminDashboard

