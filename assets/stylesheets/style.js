import { StyleSheet, View } from "react-native";
import { getPathFromState} from '@react-navigation/native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightgrey'
      
    },

    input:{
        // borderWidth: 2, 
        borderRadius: 4, 
        width: 300, 
        height: 40, 
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderColor: '#ccc',        
    },
    errorContainer: {
    marginVertical: 4
    },
    errorText:{
      color: "red",
      fontSize:12
    },
    title:{
      alignSelf: 'center',
      marginBottom: 10,
      fontSize: 40
    },
    button:{
      alignSelf: 'center',
      // borderWidth: 2,
      // borderColor: 'white',
      width: 300,
      height: 40,
      borderRadius:4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      marginBottom: 20
     
    },

    buttonText:{
      color: 'white',
      fontWeight: 'bold'
    }, 

    buttonAR:{
      alignSelf: 'center',
      // borderWidth: 2,
      // borderColor: 'white',
      width: 300,
      height: 40,
      borderRadius:4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      marginBottom: 20
     
    },

     buttonAL:{
      alignSelf: 'center',
      // borderWidth: 2,
      // borderColor: 'white',
      width: 300,
      height: 40,
      borderRadius:4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      marginBottom: 20,
      position: 'relative',
      top: -285,
     
    }, 
    buttonInfo: {
      alignSelf: 'center',
   borderWidth: 2,
    borderColor: 'black',
      width: 300,
      borderRadius:4,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: 'grey',
    },
     buttonInfoText:{
      color: 'black',
      
    },
    spButtonContainer:{
      flex: 1,
    
    },

    spButton:{
      flexDirection:'row',
      justifyContent: 'space-between',
      paddingHorizontal:10,
      color: 'black',
      padding:5,
      backgroundColor:'grey',


    },
   

    spbuttonText:{
      color: 'white',
      backgroundColor: 'black',
      borderRadius:10,
      fontSize: 21,
      fontWeight:'bold',
      


    },
    userContainer:{
      flex: 1,
     paddingHorizontal:10,
     borderRadius:8,
     margin: 2,
     backgroundColor: 'pink',
     //justifyContent: 'space-between',
     //alignItems: 'center'
    },
    studentContainer:{
      flex: 5,
      paddingHorizontal:5,
      backgroundColor: 'lightgrey',
      marginTop: 5,
    },


    userDetails:{
      paddingHorizontal:5,
      padding:10,
      fontSize: 15,
      height: 35,
      borderWidth: 1,
      marginVertical:2,
      fontWeight:'bold',
      color: 'black',
      textDecorationLine:'underline',
      fontStyle:'italic'
     },
     stuDentDetails:{
      borderRadius:5,
      paddingHorizontal:5,
      fontSize: 20,
      height: 25,
      borderWidth: 2,
      marginVertical:2,
      fontWeight:'bold',
      color: 'black',
      textDecorationLine:'underline',
      fontStyle:'italic',
      padding: 25,
     },

     image:{
      width: 190, 
      height: 150,
      borderWidth: 1,
      marginVertical: 5,

     },
     imageUpdate:{
      width: 411, 
      height: 250,
      borderWidth: 1,
      marginVertical: 5,
      justifyContent:'center'

     },
updateText:{

  //borderWidth:1,
  paddingHorizontal:3,
  flexDirection:'row',
  fontSize: 15,
  height: 25,
  marginVertical:2,
  fontWeight:'bold',
  //textDecorationLine:'underline',


},
updateTextInput:{
  fontWeight:'bold',
  //borderWidth:1,
  paddingHorizontal:3,
  paddingTop:7,
fontSize:17,
  flexDirection:'row',
  //fontSize: 15,
  height: 25,
  marginVertical:2,
  //fontWeight:'bold',

},
update:{
  fontSize:17,
  fontWeight:'bold',
  padding:10,
  alignItems: 'center',
  borderWidth:1,
  paddingHorizontal:3,
  flexDirection:'row',
  height: 33,
  marginVertical:6,
  textDecorationLine:'underline',

},
logoutContainer:{
flex: 1,
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  paddingTop: 20,
 

},
logoutButton:{
  backgroundColor: 'black',
  padding: 5,
  borderRadius: 5,
  
},
logoutButtonText:{
  color: 'white',
  fontSize: 25,
},


ProductContainer: {
  flex: 1,
},
productBackgroundImage: {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  resizeMode: 'cover',
},
productTitle: {
fontSize:20,
fontWeight: 'bold',
position: 'absolute',
paddingTop: 10,
top: 0,
},
itemImage: {
  width: 180,
  height: 200,
  borderRadius: 30,
  marginRight: 20,
  marginBottom: 15,
  top: 6,
  
},
card: {
  marginHorizontal:10,
  height: 320,
  backgroundColor: 'pink',
  borderRadius: 10,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 2,
  marginBottom: 20,
  
},
productImage: {
  width: '95%',
  aspectRatio: 1,
  borderRadius: 30,
},

productCard: {
  marginHorizontal:10,
  height: 820,
  backgroundColor: 'pink',
  borderRadius: 10,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
  elevation: 2,
  marginBottom: 20,
  
},
item: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
overflow: 'hidden',
  

},
itemProduct: {
  padding: 15,
  //marginBottom: 20,
//overflow: 'hidden',
},

itemContent: {
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
position: 'relative',
paddingTop: 10,

},

productsName: {
  fontSize: 16,
  fontWeight: 'bold',
},
productName: {
  fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
},
productDetails: {
  fontSize: 16,
    color: '#333',
    lineHeight: 24,
    paddingBottom: 5,

},
rowValueOne:{
  flexDirection: 'row',
  justifyContent: 'center',
  marginVertical:20,
  alignItems: 'center',
},
rowValueTwo:{
  flexDirection: 'row',
},

productCategory:{ 
  paddingBottom: 5,
  fontSize: 15,

},

productSize:{
  alignSelf: 'flex-start',
  paddingHorizontal: 30,
  },

  productPrice:{
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
    },

itemDetails: {
  fontSize: 11,
  color: 'black',
  margin:10,
  fontStyle: 'italic'
},
itemPrice: {
  fontWeight:'bold',
  fontSize: 16,
  color: '#999',
},
buttons: {
  paddingTop: 40,
  paddingBottom: 50,
},
button: {
  backgroundColor: '#FFC107',
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 12,

},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

registerContainer: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'pink'
  
},


signInButton: {
//    width: 60,
//  height: 30,
// borderRadius:70,
//  paddingHorizontal: 50,
//  paddingVertical: 10,
// right:20,
//   paddingTop: 30,
//   	backgroundColor: 'yellow',
//    margin: 5,
//   	  marginLeft:15,
  
},
totalContainer: {
  position: 'absolute',
  bottom: 10,
  left: 10,
  right: 10,
  backgroundColor: '#fff',
  padding: 10,
  borderTopWidth: 1,
  borderTopColor: '#ccc',
},
totalText: {
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'right',
 

},

  });

  export default styles;

  
  //  spButton:{ flexDirection:'row'
    //justifyContent: 'space-between',
   // paddingHorizontal:16,
//color: 'black'
//   }
