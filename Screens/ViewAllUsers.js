import { Text, View, FlatList, Button } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewRegisteredUser } from '../tools/actions/authActions'
import { DeleteStudentProfile } from '../tools/actions/authActions'
import { TouchableOpacity } from 'react-native';




//Student details are display in this screen and admin will have the oppurtunity to update student details
const ViewAllUsers = ({ route, navigation }) => {
  const [data, setData] = useState([])
  console.log("data:", data);


  useEffect(() => {
    //Fetch Student details 
    ViewRegisteredUser()
      .then((fetchData) => {
        console.log("fetchData:", fetchData);

        setData(fetchData);
        console.log("setData:", data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  //onPress button to navigate to the update screen
  const onPressUpdateStudent = (uid) => {

    navigation.navigate('UpdateUser', { uid })

  }

  const onPressDeleteStudent = async (uid) => {
    try {
      //This function is call to delete student record
      await DeleteStudentProfile(uid)
      console.log('Student Deleted');
      navigation.navigate('ViewAllUsers')

    } catch (error) {
      console.error('Error updating user to DB', error);
      throw error;
    }
  };
  //Student details are rendered as items
  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <View style={styles.userInfoList}>
       <Text style={styles.userInfoLabel}>First Name: {item.firstname} </Text>
      <Text style={styles.userInfoLabel}>Last Name: {item.lastname}</Text>
      <Text style={styles.userInfoLabel}>User Name: {item.username}</Text>
      <Text style={styles.userInfoLabel}>Student ID: {item.studentId}</Text>
      <Text style={styles.userInfoLabel}>Email: {item.email}</Text>
      <Text style={styles.productAddedDate}>Registered Date: {item.registerDate}</Text>
      </View>
      <View style={styles.spButtonContainer}>
        <TouchableOpacity style={styles.spButton} >
          <Text onPress={() => onPressUpdateStudent(item.uid)} style={styles.spbuttonText}>  Edit Details </Text>

          <Text onPress={() => onPressDeleteStudent(item.uid)} style={styles.spbuttonText}>  Delete </Text>
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

export default ViewAllUsers

