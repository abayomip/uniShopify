import { Text, View, FlatList,ScrollView , Button } from 'react-native';
import React from 'react'
import { useEffect, useState } from 'react'
import styles from '../assets/stylesheets/style'
import { ViewRegisteredUser } from '../tools/actions/authActions'
import { DeleteStudentProfile } from '../tools/actions/authActions'
import { TouchableOpacity } from 'react-native';




//users details are display in this screen and will have the oppurtunity to update their details
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
    <View style={styles.userInfoContainer}>
     
       <Text style={[styles.userCellText,styles.userBorderLine ]}> {item.firstname} </Text>
      <Text style={[styles.userCellText,styles.userBorderLine ]}> {item.lastname}</Text>
      <Text style={[styles.userCellText,styles.userBorderLine ]}>{item.username}</Text>
      <Text style={[styles.userCellText,styles.userBorderLine ]}> {item.studentId}</Text>
      <Text style={[styles.userCellText,styles.userBorderLine ]}> {item.email}</Text>
      <Text style={[styles.userCellText,styles.userBorderLine ]}> {item.registerDate}</Text>
    
      
        <TouchableOpacity onPress={() => onPressUpdateStudent(item.uid)} style={[styles.userButtonEdit,styles.userBorderLine ]}>  
          <Text style={styles.UserButtonText} >Edit Details </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressDeleteStudent(item.uid)} style={[styles.userButtonEdit,styles.userBorderLine ]}>  
            <Text style={styles.UserButtonText}> Delete </Text>
        </TouchableOpacity>
   


    </View>
  );
  return (
    <View style={styles.productCard}>

    <ScrollView horizontal >
    <View style={styles.userTableContainer}> 
<View style={styles.userHeaderRow}>
<Text style={[styles.userInfoText, styles.borderLine, styles.verAlign  ]}>First Name </Text>
<Text style={[styles.userInfoText, styles.borderLine, styles.verAlign ]}>Last Name </Text>
<Text style={[styles.userInfoText, styles.borderLine, styles.verAlign ]}>User Name </Text>
<Text style={[styles.userInfoText, styles.borderLine, styles.verAlign ]}>Student ID </Text>
<Text style={[styles.userInfoText, styles.borderLine, styles.verAlign ]}>Email </Text>
<Text style={[styles.userInfoText, styles.borderLine ]}>Registered Date </Text>
<Text style={[styles.userInfoText, styles.borderLine ]}>Click below to Edit User</Text>
<Text style={[styles.userInfoText, styles.borderLine,{ fontSize: 18,marginTop: 2} ]}>Click below to Delete User</Text>
</View >
   
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.uid.toString()}
    />
 </View>
 </ScrollView>
 </View>

  )
}

export default ViewAllUsers

