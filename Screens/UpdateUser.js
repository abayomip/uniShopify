import { StyleSheet, Text, View, FlatList, Button, TextInput, TouchableOpacity,image } from 'react-native';
import React from 'react'
import { useEffect, useState, useRef, setData } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewStudentProfile } from '../tools/actions/authActions'
import { updateStudentUser } from '../tools/actions/authActions'



//Update student screen function
const UpdateUser = ({ navigation, route }) => {

  //initialising of the states variables using useState hook
  const [data, setData] = useState([])
  const [updateUserData, setUpdateUserData] = useState([])
  const [Loading, setLoading] = useState(true)

  const { uid } = route.params; // Fetching the user uid


  useEffect(() => {
    //Fetch Student details by calling the ViewStudentProfile function
    ViewStudentProfile(uid)
      .then((fetchData) => {
        setUpdateUserData([fetchData]);
        console.log("User data:", updateUserData);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetchinng data: ", error));
  }, []);



//The manageInput function manage user input and set the updated value to UpdateUserData
  const manageInput = (text, index, field) => {
    //Updating the local state
    setUpdateUserData((prevUpdateUserData) => {
      //create a shallow copy of the previous array data
      const newDataCopy = [...prevUpdateUserData];

      //A shallow copy of the user object at the particular index
      newDataCopy[index] = { ...newDataCopy[index], [field]: text };
      console.log('Updated state:', newDataCopy);

      return newDataCopy;
    });
  };



//The function calls the updateStudentUser function from the authAction to update user input
  const onPressUpdateStudent = async (uid, updateUserData) => {
    try {
     
      console.log('before calling updateUser:', updateUserData);
      //updateStudentUser to update the user record
      await updateStudentUser(uid, updateUserData)

      console.log('after calling updateUser:', updateStudentUser);

      console.log('after state:', updateUserData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }


  return (
    <View style={styles.userContainer} >
      <Text style={styles.update}>USER DETAILS:</Text>
      {Loading ? (
        <Text>Loading...</Text>
      ) : (
        <View >
          <View >
            {updateUserData.map((data, index) => (
              <View key={index}>
                <View style={styles.updateUser} >
                  <Text style={styles.updateTextUser}>Firstame:</Text>
                  <TextInput
                    value={data.firstname}
                    onChangeText={(text) => manageInput(text, index, 'firstname')}
                    editable={true}
                    style={styles.updateTextInputUser}
                  />
                </View>
                <View style={styles.updateUser} >
                  <Text style={styles.updateTextUser}>Last Name:</Text>
                  <TextInput
                    value={data.lastname}
                    onChangeText={(text) => manageInput(text, index, 'lastname')}
                    editable={true}
                    style={styles.updateTextInputUser}
                  />
                </View>
                <View style={styles.updateUser} >
                  <Text style={styles.updateTextUser}>Username:</Text>
                  <TextInput
                    value={data.username}
                    onChangeText={(text) => manageInput(text, index, 'username')}
                    editable={true}
                    style={styles.updateTextInputUser}
                  />
                </View>
                <View style={styles.updateUser} >
                  <Text style={styles.updateTextUser}>Student Id:</Text>
                  <TextInput
                    value={data.studentId}
                    onChangeText={(text) => manageInput(text, index, 'studentId')}
                    editable={true}
                    style={styles.updateTextInputUser}
                  />
                </View>
                <View style={styles.updateUser} >
                  <Text style={styles.updateTextUser}>Email:</Text>
                  <TextInput
                    value={data.email}
                    onChangeText={(text) => manageInput(text, index, 'email')}
                    editable={true}
                    style={styles.updateTextInputUser}

                  />
                </View>
                <View style={styles.updateUser} >
                  <Text style={styles.updateText}>Password:</Text>
                  <TextInput
                    value={data.password}
                    onChangeText={(text) => manageInput(text, index, 'password')}
                    editable={true}
                    style={styles.updateTextInputUser}
                  />
                </View>
                
              
             
                
              </View>
            ))}
          </View >
          
          <TouchableOpacity style={styles.buttonUpdateUser} onPress={() => onPressUpdateStudent(uid, updateUserData)} >
                  <Text style={styles.buttonText}> Update </Text>
                </TouchableOpacity>
        </View>
      )}
    </View>
  );





}


export default UpdateUser


