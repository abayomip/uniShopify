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
          console.log("fetchData:", fetchData);

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
 <Text style={{fontSize:20,  textAlign:'center',  fontWeight:'bold',

}}>USER DETAILS:</Text>
      <View style={styles.updateUserInfo} >
      <Text style={styles.updateUserInfoText}>First Name:</Text>
      <Text style={styles.updateTextInputUser}>{item.firstname} </Text>
      </View>

      <View style={styles.updateUserInfo} >
      <Text style={styles.updateUserInfoText}>Last Name:</Text>
      <Text style={styles.updateTextInputUser}> {item.lastname}</Text>
      </View>

      <View style={styles.updateUserInfo} >
      <Text style={styles.updateUserInfoText}>User Name:</Text>
      <Text style={styles.updateTextInputUser}> {item.username}</Text>
      </View>

      <View style={styles.updateUserInfo} >
      <Text style={styles.updateUserInfoText}>Student ID:</Text>
      <Text style={styles.updateTextInputUser}>{item.studentId}</Text>
      </View>

      <View style={styles.updateUserInfo} >
      <Text style={styles.updateUserInfoText}>Email:</Text>
      <Text style={styles.updateTextInputUser}>{item.email}</Text>
      </View>

   

      <View style={{ marginTop:20,  alignItems: 'center',paddingLeft:9,

}}>
        <TouchableOpacity style={styles.buttonUpdateUser}  >
          <Text onPress={() => onPressUpdateStudent(item.uid)} style={styles.spbuttonText}>  Edit Details </Text>

        </TouchableOpacity>

      </View>



    </View>
  );
 
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid.toString()}
    />
  )
}


export default PersonalDetails

