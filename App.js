import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './Screens/HomeScreen';
import Product from './Screens/Product';
import UniShop from './Screens/UniShop';

import Login from './authentications/Login';
import AdminLogin from './authentications/AdminLogin';
import StudentLogin from './authentications/StudentLogin';
import AdminRegistration from './InsertToDB/AdminRegistration';
import Clothing from './Category/Clothing';
import Academics from './Category/Academics';
import MobilePhone from './Category/MobilePhone';
import Sofa from './Category/Sofa';
import Shoes from './Category/Shoes';

import Kitchen from './Category/Kitchen';

import RegisterUser from './InsertToDB/RegisterUser';

import AddProduct from './InsertToDB/AddProduct';
import {Provider} from "react-redux"
import { store } from "./collections/collection";


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';



const Stack = createNativeStackNavigator();
function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey='pk_test_51P2gWzGvncvE1LcJZlPIE37FctVa4IDTHdXXE6qC4xLKFSj0iG6G522ypHELezG4r35i4qR2eoxbRkfz9cC4EBHt002TA9rErq'>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'HomeScreen',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        />
         <Stack.Screen name="Login" 
        component={Login} 
        options={{
          tabBarLabel: 'Login',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="Login" color={color} size={26} />
          ),
        }}
        />

<Stack.Screen name="Clothing" 
        component={Clothing} 
        options={{
          tabBarLabel: 'Clothing',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="Clothing" color={color} size={26} />
          ),
        }}
        />
        <Stack.Screen name="Academics" 
        component={Academics} 
        options={{
          tabBarLabel: 'Academics',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="Academics" color={color} size={26} />
          ),
        }}
        />

<Stack.Screen name="MobilePhone" 
        component={MobilePhone} 
        options={{
          tabBarLabel: 'MobilePhone',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="MobilePhone" color={color} size={26} />
          ),
        }}
        />

<Stack.Screen name="Sofa" 
        component={Sofa} 
        options={{
          tabBarLabel: 'Sofa',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="Sofa" color={color} size={26} />
          ),
        }}
        />

<Stack.Screen name="Shoes" 
        component={Shoes} 
        options={{
          tabBarLabel: 'Shoes',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="Shoes" color={color} size={26} />
          ),
        }}
        />

        

<Stack.Screen name="Kitchen" 
        component={Kitchen} 
        options={{
          tabBarLabel: 'Kitchen',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="Kitchen" color={color} size={26} />
          ),
        }}
        />

            <Stack.Screen name="AdminRegistration" component={AdminRegistration} 
          options={{ 
            title: 'AdminRegistration',
            tabBarLabel:'AdminRegistration',
            tabBarIcon: () => (
              <MaterialCommunityIcons name='home-account' size={20} color={'red-50'} />
            )
          }}
        />
         <Stack.Screen name="RegisterUser" component={RegisterUser} 
          options={{ 
            title: 'RegisterUser',
            tabBarLabel:'RegisterUser',
            tabBarIcon: () => (
              <MaterialCommunityIcons name='home-account' size={20} color={'red-50'} />
            )
          }}
        />

<Stack.Screen name="AdminLogin" component={AdminLogin} 
          options={{ 
            title: 'Admin Login',
            tabBarLabel:'AdminLogin',
            tabBarIcon: () => (
              <MaterialCommunityIcons name='account' size={20} color={'red-50'} />
            )
          }}
        />
         <Stack.Screen name="StudentLogin" component={StudentLogin} 
          options={{ 
            title: 'StudentLogin',
            tabBarLabel:'StudentLogin',
            tabBarIcon: () => (
              <MaterialCommunityIcons name='account' size={20} color={'red-50'} />
            )
          }}
        />
           <Stack.Screen name="AddProduct" component={AddProduct} 
          options={{ 
            title: 'AddProduct',
            tabBarLabel:'AddProduct',
            tabBarIcon: () => (
              <MaterialCommunityIcons name='home-account' size={20} color={'red-50'} />
            )
          }}
        />
        <Stack.Screen name="Product" component={Product} 
          options={{ 
            title: 'Product',
            tabBarLabel:'Product',
            tabBarIcon: () => (
              <MaterialCommunityIcons name='home-account' size={20} color={'red-50'} />
            )
          }}
        />
        <Stack.Screen name="UniShop" component={UniShop} 
          options={{ 
            title: 'UniShop',
            tabBarLabel:'UniShop',
            tabBarIcon: () => (
              <MaterialCommunityIcons name='home-account' size={20} color={'red-50'} />
            )
          }}
        />
 </Stack.Navigator>
    </NavigationContainer>
    </StripeProvider>
    </Provider>
  )

}
export default App
