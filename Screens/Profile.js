import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import styles from '../assets/stylesheets/style'
import TextInput from '../assets/stylesheets/style'

//A function component for the login dashboard
const Profile = ({ route, navigation }) => {

    const onPressUserProfile = () => {
        navigation.navigate('PersonalDetails')

    }
    const onPressLoginAdmin = () => {
        navigation.navigate('')

    }
    const onPressLginAdmin = () => {
      navigation.navigate('')

  }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>uniShopify</Text>
            <Text style={styles.title}>Account Overview</Text>

            <TouchableOpacity style={styles.button} onPress={onPressUserProfile}>
                <Text style={styles.buttonText}> Personal Details </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={""}>
                <Text style={styles.buttonText}> Orders </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={""}>
                <Text style={styles.buttonText}> Items Uploaded for sale </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile

