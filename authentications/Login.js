import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from '../assets/stylesheets/style'
import TextInput from '../assets/stylesheets/style'

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

            <Text style={{fontStyle: 'italic', fontSize: 50, alignItems: 'center',
    fontWeight: 'bold', paddingBottom: 5, paddingTop: 80,
}}>UniShopify</Text>
            <Text style={{paddingBottom: 40,fontStyle: 'italic',
}}>Market Place Student Place....</Text>
        <View style={{margin:5,}}>

            <TouchableOpacity style={styles.button} onPress={onPressLoginAdmin}>
                <Text style={styles.buttonText}> Admin Login </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onPressLoginStudent}>
                <Text style={styles.buttonText}> Student Login </Text>
            </TouchableOpacity>
            </View>

        </View>
    )
}

export default Login

