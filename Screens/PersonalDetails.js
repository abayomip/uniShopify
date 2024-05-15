import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import React from 'react'
import { useEffect, useState, setData } from 'react'
import styles from '../assets/stylesheets/style'
import Input from '../assets/stylesheets/textInput'
import { ViewStudentProfile } from '../tools/actions/authActions'
import { dataRetrieve } from '../tools/actions/authActions'
import { Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from "../collections/authSlice";



const PersonalDetails = ({ route, navigation }) => {
  const [data, setData] = useState([])
  console.log("data:", data);
  const { uid } = route.params || {}; // Fetching the user uid
  const dispatch = useDispatch();// A hook to access redux dispatch function
  const userData = useSelector(state => state.auth.userData);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);



  useEffect(() => {
    //Fetch Student details 
    async function fetctUser() {
      const data = await dataRetrieve();
      console.log("Loggedin user", data)
      //fetch student details to studentData
      const studentData = JSON.parse(data);

      //fetch particular student uid details
      ViewStudentProfile(studentData.uid)
        .then((fetchData) => {
          console.log("fetchData:", fetchData);// fetchData
//wrapping the data object fetched into an array
          setData([fetchData]);
          console.log("setData:", data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    }
    fetctUser()

  }, [uid]);

  const onPressUpdateStudent = (uid) => {

    navigation.navigate('UpdateUser', { uid })

  }
  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.updateUser} >
      <Text style={styles.updateTextUser}>First Name:</Text>
      <Text style={styles.updateTextInputUser}>{item.firstname} </Text>
      </View>

      <View style={styles.updateUser} >
      <Text style={styles.updateTextUser}>Last Name:</Text>
      <Text style={styles.updateTextInputUser}> {item.lastname}</Text>
      </View>

      <View style={styles.updateUser} >
      <Text style={styles.updateTextUser}>User Name:</Text>
      <Text style={styles.updateTextInputUser}> {item.username}</Text>
      </View>

      <View style={styles.updateUser} >
      <Text style={styles.updateTextUser}>Student ID:</Text>
      <Text style={styles.updateTextInputUser}>{item.studentId}</Text>
      </View>

      <View style={styles.updateUser} >
      <Text style={styles.updateTextUser}>Email:</Text>
      <Text style={styles.updateTextInputUser}>{item.email}</Text>
      </View>

      <Text style={styles.userDetails}>Registered Date: {item.registerDate}</Text>
   

      <View style={styles.spButtonContainer}>
        <TouchableOpacity style={{
          flex: 1, padding: 12,
          alignItems: 'center', justifyContent: 'space-between'
        }} >
          <Text onPress={() => onPressUpdateStudent(item.uid)} style={styles.spbuttonText}>  Edit Details </Text>

        </TouchableOpacity>

      </View>



    </View>
  );
  // const onPressLogout = () => {
  //   dispatch(logout())
  //   console.log('userData after log out', null)

  //   navigation.navigate('StudentLogin');

  // }
  // if (!isAuthenticated) {
  //   return null;
  // }
  return (
    //<KeyboardAwareScrollView>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid.toString()}
    //numColumns={1} // Example: Render items in two columns
    // Other props for customization...
    />
    // </KeyboardAwareScrollView>
  )
}


export default PersonalDetails

