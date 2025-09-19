import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from '../assets/stylesheets/style'

//A function component for the login dashboard
const Login = ({ route, navigation }) => {
    const onPressLoginStudent = () => {
        navigation.navigate('StudentLogin')

    }
    const onPressLoginAdmin = () => {
        navigation.navigate('AdminLogin')

    }

    return (
        <View style={styles.productCard}>
            <View style={{
                alignItems: 'center',
            }}>
                <Text style={styles.appLogo}>UniShopify</Text>
                <Text style={styles.appValue}>Market Place Student Place....</Text>
                <View style={{
                    margin: 5, paddingBottom: 120, marginBottom: 70,
                }}>


                    <TouchableOpacity style={styles.button} onPress={onPressLoginAdmin}>
                        <Text style={styles.buttonText}> Admin Login </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onPressLoginStudent}>
                        <Text style={styles.buttonText}> Student Login </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Login

