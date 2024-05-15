import { StyleSheet, View } from "react-native";
import { getPathFromState} from '@react-navigation/native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'pink'
      
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
    // button:{
    //   alignSelf: 'center',
    //   // borderWidth: 2,
    //   // borderColor: 'white',
    //   width: 300,
    //   height: 40,
    //   borderRadius:4,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: 'black',
    //   marginBottom: 20,
      
     
    // },

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
      justifyContent: 'space-between',
    },

    updateUserItem:{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
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
      fontSize: 18,
      fontWeight:'bold',
      height:40,
      width: 160, 
      textAlign: 'center',
      padding:7,
      justifyContent: 'space-between',

    },
    userContainer:{
      flex: 1,
     paddingHorizontal:10,
     width: 380, 
     height: 300, 
     borderRadius:8,
     margin: 5,
     backgroundColor: 'pink',
     padding:20,
     paddingVertical:4,
marginBottom:3,
marginTop:5,


     //justifyContent: 'space-between',
     //alignItems: 'center'
    },
    studentContainer:{
      flex: 5,
      paddingHorizontal:5,
      backgroundColor: 'lightgrey',
      marginTop: 5,
    },
    userInfoList: {
      marginTop: 20,
      flex: 3,
      alignItems: 'center',

    },
    userInfoLabel: {
      fontWeight:'bold',
      marginRight: 5,
      fontSize: 22,

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
          padding:10,
          
     },
     label: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    value: {
      fontSize: 20,
      
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
      // borderWidth: 1,
      // marginVertical: 5,
      // justifyContent:'center'

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



updateTextDetails:{
  flexDirection:'row',
  height: 25,
  marginVertical:2,
  fontWeight:'bold',
  paddingHorizontal:3,

},

updateTextInput:{
  fontWeight:'bold',
  //borderWidth:1,
  paddingHorizontal:3,
  paddingTop:7,
fontSize:17,
  flexDirection:'row',
  fontSize: 15,
  height: 25,
  marginVertical:2,
  fontWeight:'bold',

},

update:{
  fontSize:20,
  fontWeight:'bold',
  paddingTop:2,
  alignItems: 'center',
  borderWidth:2,
  flexDirection:'row',
  marginVertical:5,
  textDecorationLine:'underline',
  height: 40,
textAlign:'center',
overflow: 'hidden',
//wordWrap: 'break-word',
// maxHeight: '100%',
// maxWeight: '100%',

},


updateUser:{
  fontSize:20,
  fontWeight:'bold',
  paddingTop:2,
  alignItems: 'center',
  borderWidth:2,
  flexDirection:'row',
  marginVertical:5,
  textDecorationLine:'underline',
  height: 80,
textAlign:'center',
overflow: 'hidden',
//wordWrap: 'break-word',
maxHeight: '100%',
maxWeight: '100%',

},


updateTextUser:{
  fontSize:25,
  fontWeight:'bold',
  paddingTop:10,
  padding:8,
  alignItems: 'center',
  borderWidth:2,
  flexDirection:'row',
  height: 50,
  marginVertical:5,
  textDecorationLine:'underline',
//marginTop: 90,
},

updateTextInputUser:{
  fontWeight:'bold',
  //borderWidth:1,
  paddingHorizontal:3,
  paddingTop:7,
  flexDirection:'row',
  fontSize: 25,
  height: 40,
  marginVertical:2,
  fontWeight:'bold',
  textDecorationLine:'underline',

},

buttonUpdateUser: {
  backgroundColor: 'black',
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 12,
  width: 360,
  height: 40,
  justifyContent: 'center',
marginBottom:5,
paddingRight:9,
alignItems: 'center',

},
updateDetails:{
  fontSize:20,
  fontWeight:'bold',
  paddingTop:2,
  alignItems: 'center',
  borderWidth:2,
  flexDirection:'row',
  marginVertical:5,
  textDecorationLine:'underline',
  height: 60,
textAlign:'center',
overflow: 'hidden',
wordWrap: 'break-word',
// maxHeight: '100%',
// maxWeight: '100%',

},
ImageButton:{
  color: 'grey',
  backgroundColor: 'black',
  fontSize: 25,
  fontWeight:'bold',
  height:40,
  width: 60, 
  textAlign: 'center',
  padding:7,

   
  
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
Seller: {
  fontSize: 23,
  fontWeight: 'bold',
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
  width: '100%',
  aspectRatio: 1,
  
},

productCard: {
  flex: 1,
  marginHorizontal:10,
  backgroundColor: 'pink',
  borderRadius: 20,
  padding: 60,
  justifyContent: 'flex-start',
  //flexDirection: 'column'
},
addButtonToCart: {
  marginTop: 10,
  height: 45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  backgroundColor: '#00BFFF',
},
addToCartContainer: {
  marginHorizontal: 30,
  marginBottom: 10,

},
cartButtonText: {
  color: 'black',
  fontSize: 20,
  
},
userCard: {
  flex: 1,
  marginHorizontal:10,
  backgroundColor: 'pink',
  borderRadius: 20,
  padding: 20,
  marginVertical:10,



  // justifyContent: 'flex-start',
  //flexDirection: 'column'
},

updateProductCard: {
  flex: 1,
  marginHorizontal:7,
  backgroundColor: 'pink',
  borderRadius: 13,
  padding: 20,
 justifyContent: 'center',
  //flexDirection: 'column'
 // alignItems: 'center',

},
updateContainer: {
   justifyContent: 'center',
},
updateImage: {
  width: 300,
  height: 200,
  borderRadius: 20,
  justifyContent: 'center',
margin:12,
marginBottom:1,

},
item: {
  flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    marginVertical:5,
    paddingHorizontal:10,

},
sectionButton: {
  backgroundColor: 'grey',

  borderRadius: 5,
  padding: 12,
  marginHorizontal: 10,
  margin: 15,
},
buttonTextOption: {
  fontSize: 20,
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold',

},
itemContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:60,
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
  fontSize: 20,
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
  fontWeight: 'bold',

},

productSize:{
  alignSelf: 'flex-start',
  paddingHorizontal: 30,
  fontSize: 16,
  fontWeight: 'bold',

  },

  productPrice:{
    alignSelf: 'flex-start',
    paddingHorizontal: 30,
    fontSize: 16,
    fontWeight: 'bold',
    },
    productAddedDate:{
      alignSelf: 'flex-start',
      fontSize: 15,
      fontWeight: 'bold',
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
  backgroundColor: 'grey',
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 12,
  width: 300,
  height: 40,
},

buttonUpdate: {
  backgroundColor: 'grey',
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 12,
  width: 340,
  height: 40,
  justifyContent: 'center',
marginBottom:5,
},

updateText:{
  fontSize:20,
  fontWeight:'bold',
  paddingTop:10,
  padding:5,
  alignItems: 'center',
  borderWidth:2,
  flexDirection:'row',
  height: 38,
  marginVertical:5,
  textDecorationLine:'underline',

},
buttonCategory: {
  backgroundColor: 'white',
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 12,
  width: 90,
  height: 40,

},
buttonTextCat: {
  color: 'grey',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},

buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
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


allpContainer: {
  flex: 1,
},
allproductImage: {
  width: 140,
  height: 140,
  borderRadius: 30,
  marginRight: 20,
},

titleProduct: {
  fontSize: 24,
  fontWeight: 'bold',
 marginTop: 10,
  marginBottom: 10,
  color: 'black',
  marginHorizontal:20,

},
buttonAp: {
  borderRadius: 2,
  padding: 10,
  marginRight: 10,
  textAlign: 'center',
  width:10,

},

itemAllProduct: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},

itemContentAllProduct: {
  flex: 1,
},

cardAllProduct: {
  marginHorizontal:20,
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

cartContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal:10,

},
cartContainerView: {
  backgroundColor: 'pink',
  flex: 1,
  borderRadius: 20,

},

cartDetailsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  shadowColor: '#cccccc',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 1,
  backgroundColor: '#fff',
  marginBottom: 10,
  width: 380, 
  height: 150, 
  borderRadius: 15,

},
infoCart: {
  marginLeft: 10,
  flex: 1,
},
removeButton: {
  alignItems: 'center',
},
cartImage: {
  width: 100,
  height: 80,
  borderRadius: 25,
},
CartItemName: {
  fontSize: 20,
},
CartItemPrice: {
  fontSize: 16,
  color: '#888',
},
  });

  export default styles;

  
  //  spButton:{ flexDirection:'row'
    //justifyContent: 'space-between',
   // paddingHorizontal:16,
//color: 'black'
//   }
