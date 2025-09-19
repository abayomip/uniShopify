import { StyleSheet, View } from "react-native";
import { getPathFromState} from '@react-navigation/native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'pink',
    },

    checkOutInfo:{
      fontSize: 17,
      paddingTop:1,
      textDecorationLine: 'underline',
      fontFamily:'Unna-Bold', 
   },

  viewTotalSales:{
    fontSize: 20, 
    marginTop: 10,
    fontFamily:'Unna-Bold', 
    textDecorationLine:'underline',


  },

    scrollView:{
      flex: 1,
       },

    recieverName:{
      fontSize: 30, 
      borderWidth: 1, 
      borderRadius: 25, 
      height: 35,
      paddingLeft: 10,
      marginVertical: 14,
      marginHorizontal: 4,
      fontFamily:'Unna-Bold', 
    },

    recieverAddress:{
      fontSize: 30,
      borderWidth: 1, 
      marginHorizontal: 4,
      marginBottom: 10,
      borderRadius: 25, 
      height: 35, 
      paddingLeft: 10,
      fontFamily:'Unna-Bold', 

    },
 
 
    itemInfo:{
      marginVertical: 1, 
      marginTop: -5,
      marginLeft: 15,
       fontSize: 23, 
      fontFamily:'Unna-Bold', 
   

    },

    cartInfo:{
      marginHorizontal:1,
      marginVertical: 4,
      fontFamily:'Unna-BoldItalic',    
      fontSize: 16, 
     // marginLeft: 10,
   

    },
    inputText:{
      fontFamily:'Unna-BoldItalic',    
      // fontSize: 90, 
     //fontWeight: 'bold',

    },
    appLogo:{
      fontSize: 60, 
      alignItems: 'center',
      paddingBottom: 5,
      fontFamily:'Unna-BoldItalic',    
    },
    appValue:{
      paddingBottom: 40, 
      fontFamily:'Unna-Italic',    
      fontSize: 16, 

    },
    studentLoginSts:{
      fontSize: 20, 
      fontFamily:'Unna-BoldItalic',    
    textAlign: 'center',
    },

    please:{
      fontSize: 20, 
      margin: 5,
      fontFamily:'PlayfairDisplaySC-Bold',    
    },

    signInNotice:{
      fontSize: 23, 
     // fontStyle: 'italic', 
      color: 'red',
     // fontWeight: 'bold',
      fontFamily:'PlayfairDisplaySC-BlackItalic',    

    },

    headerText:{
      fontSize: 18,
      fontFamily: "Unna-BoldItalic",
      marginLeft: 15,
      paddingBottom: 1,

    },

    fieldNames:{
      borderTopWidth: 2, 
      paddingTop: 13, 
      fontSize: 22, 
      paddingBottom: 3,
      borderBottomWidth: 1, 
      fontFamily: "Unna-Bold",
    },
    shoppingBagText:{
      paddingTop: 15, 
      fontSize: 22, 
      paddingBottom: 10,
      fontFamily: "Unna-Bold",
      textAlign: 'center',
      borderBottomWidth: 1, 
    },

    footers:{
      marginHorizontal:7,
      backgroundColor: 'pink',
      borderRadius: 20,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: 20,
      alignself: 'center', 
      

    },
   

  

    itemAllCategoryProduct: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      padding:1,
      margin: 20,
    },


    similarContainer: {
      marginHorizontal:7,
      backgroundColor: 'pink',
      borderRadius: 20,
      //padding: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 2,
      marginBottom: 8,
      marginTop: 5,
      alignself: 'center', 
    },

    SimilarCatImage: {
      width: 100,
      height: 100,
      borderRadius: 30,
      marginRight: 10,
    },

    
titleCatProduct: {
  fontSize: 17,
  //fontWeight: 'bold',
 marginTop: 1,
  marginBottom: 5,
  color: 'black',
  textAlign: 'left',
  fontFamily: "PlayfairDisplaySC-Bold"

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
        borderWidth: 2, 
        textAlignVertical: 'top', 

        
    },
    inputProductDetails:{
      borderWidth: 2, 
      width: 298, 
      height: 110, 
      padding: 10,
      backgroundColor: 'white',
      borderColor: '#ccc',
      textAlignVertical: 'top', 

        
  },
  inputProductName:{
    borderWidth: 2, 
    borderColor: '#ccc',
    width: 300, 
    height: 50, 
   // backgroundColor: 'white',  
},

inputSearch:{
  borderWidth: 2, 
  borderColor: '#ccc',
  width: 392, 
  height: 90, 
  fontSize: 17,
  fontWeight:'bold',

 // backgroundColor: 'white',  
},

inputSearchText:{
  // borderWidth: 2, 
  borderRadius: 4, 
  width: 392, 
  height: 60, 
  padding: 10,
  marginBottom: 10,
  marginTop: 15,
  fontFamily:'Unna-BoldItalic',    
  backgroundColor: 'white',
  borderColor: '#ccc', 
  fontSize: 27,
       
},
scrollStyleContainer:{
  flex: 1,
  padding: 10,
  marginTop:10,
  marginBottom: 20,
},

scrollStyleContainerUpdate:{
  flex: 1,
  padding: 10,
  marginTop:10,
  
},


    addProductView:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:60,
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
      fontSize: 52,
      fontFamily:'Unna-BoldItalic',    

    },
    extraButton:{
       borderWidth: 1,
      //  borderTopWidth: 1,
      //  borderBottomWidth: 1,
       padding:4,
       


    },

    extraText:{
      fontSize: 20,
      paddingTop: 5,
      paddingBottom: 5,
      fontFamily: "Unna-Bold",
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
      height: 33,
      borderRadius:4,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: 'grey',
      marginLeft: 1,
    },

     buttonInfoText:{
      color: 'black',
      
    },

    userTableContainer:{
      margin: 20,
      borderWidth:2,
      borderColor: '#000',
      //backgroundColor: 'pink',
      // marginHorizontal:60,
      // marginVertical:60,

    },

    userHeaderRow:{
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: 'black',
      //borderTopWidth: 1,


    },



    spButtonContainer:{
      flex: 1,
      justifyContent: 'space-between',
    },
    
    UserButtonText:{
    color: '#fff',
      //justifyContent: 'space-between',
      fontWeight:'bold',
    },

    borderLine:{
      borderRightWidth: 2,
      width:120,
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
      //backgroundColor: 'black',
      fontSize: 18,
      fontWeight:'bold',
      height:40,
      width: 160, 
      textAlign: 'center',
      padding:7,
      justifyContent: 'space-between',

    },

    userButtonEdit:{
      backgroundColor: 'grey',
      alignItems: 'center',
      padding:10,
      justifyContent: 'center',
      width: 100, 
      borderRadius:5,
      margin: 5,
      marginLeft:14,
      marginRight:1,
    },

    userBorderLine: {
  borderRightWidth: 2,
  borderRightColor: 'black',
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
    },

    userInfoContainer:{
      flexDirection:'row',
    //paddingVertical:5,
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    
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

   
 
 userBodStudentId: {
  width: 120,
  borderRightWidth: 2,
  borderRightColor: 'black',
},

userInfoText: {
  fontWeight:'bold',
  flex: 1,
  textAlign: 'center', 
  borderRightWidth: 1,
  fontSize: 20,
  height: 60,
},

borderLineEmail: {
  borderRightWidth: 2,
  borderRightColor: 'black',
},

 userCellText: {
  //flex: 1,
  textAlign: 'center',   
  //justifyContent:'center',
  padding:10,
  paddingTop:20,
  borderRightWidth: 1,
  borderRightColor: '#ddd',
  width: 120,
borderBottomWidth:2,

},



userButtonCon: {
  flex: 1,
  textAlign: 'center',   
  justifyContent:'center',
  borderRightWidth: 1,
  borderRightColor: '#ddd',
},



    userDetails:{
      paddingHorizontal:5,
      padding:10,
      fontSize: 15,
      height: 40,
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
  borderWidth:3,
  flexDirection:'row',
  marginVertical:5,
  textDecorationLine:'underline',
  textAlign:'center',
  overflow: 'hidden',
  height: 40,
  width: 330, 

//wordWrap: 'break-word',
// maxHeight: '100%',
// maxWeight: '100%',

},


updateUptItem:{
 // fontSize:24,
  fontWeight:'bold',
  paddingTop:2,
  alignItems: 'center',
  borderWidth:3,
  flexDirection:'row',
  marginVertical:5,
  textDecorationLine:'underline',
  textAlign:'center',
  overflow: 'hidden',
  height: 80,
  width: 330,

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


updateUserInfo:{
  fontSize:20,
  fontWeight:'bold',
  paddingTop:2,
  alignItems: 'center',
  flexDirection:'row',
  marginVertical:5,
  height: 80,
  textAlign:'center',
  //borderTopWidth:1,
  borderBottomWidth:1


},


updateUserInfoText:{
  fontSize:22,
  paddingTop:10,
  padding:8,
  alignItems: 'center',
  flexDirection:'row',
  height: 50,
  marginVertical:5,
  fontFamily:'Unna-Italic',    

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
  fontFamily:'Unna-Italic',    
  paddingHorizontal:3,
  paddingBottom: 7,
  flexDirection:'row',
  fontSize: 22,
  marginVertical:2,
},

buttonUpdateUser: {
  backgroundColor: 'grey',
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
  //fontWeight: 'bold',
  padding: 1,
  paddingLeft: 3,
  paddingTop: 1,
  paddingBottom: 5,
fontFamily: "PlayfairDisplaySC-Black"
},

orderSeller: {
  fontSize: 23,
  //fontWeight: 'bold',
  padding: 1,
  paddingTop: 1,
  paddingBottom: 5,
fontFamily: "PlayfairDisplaySC-Black",
paddingLeft: 15,

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
  borderRadius: 20,
  marginTop: 7,

},

productCard: {


  flex: 1,
  backgroundColor: 'pink',
  borderRadius: 20,
  padding: 1,
  justifyContent: 'center',
  marginBottom: 7,
  marginHorizontal: 5,
  marginTop: 7,

},



addButtonToCart: {
  marginTop: 10,
  height: 45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 30,
  backgroundColor: 'grey',
},
addToCartContainer: {
  marginHorizontal: 30,
  marginBottom: 10,

},
cartButtonText: {
  color: 'white',
  fontSize: 20,
  
},
userCard: {
  flex: 1,
  marginHorizontal:5,
  backgroundColor: 'pink',
  borderRadius: 20,
  padding: 20,
  marginVertical:6,
  height: 715,
},

scrollViewContent: {
  padding: 20,
},

updateProductCard: {
  flex: 1,
  marginHorizontal:7,
  backgroundColor: 'pink',
 borderRadius: 13,
   padding: 20,


},
updateContainer: {
   flex: 1,

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
    marginTop:10,
    marginBottom:20,


},
sectionButton: {
  backgroundColor: 'grey',
  borderRadius: 5,
  padding: 12,
  marginHorizontal: 10,
  margin: 15,
  width: 350,
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
  fontSize: 22,
  //  fontWeight: 'bold',
    fontFamily: "PlayfairDisplaySC-Bold"


},
productDetails: {
  fontSize: 18,
    color: 'black',
    paddingTop: 13,
    paddingBottom: 13,
    fontFamily: "Unna-Regular",
},

orderGenDetails: {
  fontSize: 25,
    color: 'black',
    paddingTop: 13,
    paddingBottom: 13,
    fontFamily: "Unna-Regular",
},

rowValueOne:{
  flexDirection: 'row',
  marginTop: 5,
},
rowValueTwo:{
  flexDirection: 'row',
    paddingBottom: 10,
    marginHorizontal:10,
    flex: 1,
    justifyContent: 'space-between',


},

productCategory:{ 
  paddingBottom: 5,
  fontSize: 15,
  fontWeight: 'bold',

},

productSize:{
  alignSelf: 'flex-start',
  paddingHorizontal: 23,
  fontSize: 19,
  fontWeight: 'bold',

  },

  productPriceText:{
  fontSize: 21,
  fontWeight: 'bold',
 
    },

    productPrice:{
      fontSize: 21,
    fontWeight: 'bold',
    color: 'red',
    padding: 1,
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
  fontSize: 18,
  color: '#999',
  marginLeft: 2,

},

itemOrder: {
  fontSize: 18,
  color: '#999',
  marginLeft: 2,
  paddingTop: 5,
  fontFamily: "Unna-Regular",
  color: 'black',

},

buttons: {
  paddingTop: 40,
  paddingBottom: 50,
},

button: {
  backgroundColor: 'grey',
  borderRadius: 5,
  padding: 10,
  marginTop: 12,
  width: 300,
  height: 40,
},
buttonUpdateColl: {
  backgroundColor: 'grey',
  borderRadius: 5,
  padding: 10,
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
searchButton: {
  backgroundColor: 'grey',
  borderRadius: 5,
  padding: 10,
  //marginRight: 10,
  marginTop: 12,
  width: 392,
  height: 50,
marginBottom:5,
},

buttonUpdateItem: {
  backgroundColor: 'grey',
  borderRadius: 5,
  //padding: 10,
  marginBottom: 30,
 marginTop: 12,
  width: 340,
  height: 40,
  justifyContent: 'center',
//paddingBottom:25,
},


updateText:{
  fontSize:20,
  fontWeight:'bold',
  paddingTop:10,
  padding:5,
  alignItems: 'center',
  borderWidth:2,
  //flexDirection:'row',
  height: 38,
  marginVertical:5,
  textDecorationLine:'underline',

},

updateTextDetailsBott:{
  fontSize:25,
  fontWeight:'bold',
  paddingTop:19,
  padding:5,
  alignItems: 'center',
  borderWidth:2,
  //flexDirection:'row',
  height: 78,
  marginVertical:5,
  textDecorationLine:'underline',
},
updateTextDetailsBottInput:{
  fontSize:20,
  paddingTop:1,
  padding:5,
  alignItems: 'center',
  borderWidth:2,
  //flexDirection:'row',
  height: 78,
  marginVertical:5,
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
  alignItems: 'center',
  justifyContent: 'center',
  
},


verAlign: {
  paddingTop: 25,

  
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
  fontSize: 20,
  fontWeight: 'bold',
 marginTop: 1,
  marginBottom: 5,
  color: 'black',
  marginHorizontal:20,
  textAlign: 'left',
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
  marginTop: 5,
},

cartContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',


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
  height: 80, 
  borderRadius: 25,
  



},
infoCart: {
  marginLeft: 10,
  flex: 1,
},
removeButton: {
  alignItems: 'center',
  paddingLeft: 2,

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

formContainer: {
  marginTop: 80,
  padding:20,
  borderRadius:10,
  backgroundColor:'rgba(255, 255, 255, 0.3)',
 marginBottom: 20,
  width: 310,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 50,

},

LoginCard: {
  backgroundColor: '#fff',
  borderRadius: 10,
  shadowColor: '#000',
  width: 280,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    padding:7,
    paddingBottom: 1,
  },
  loginInput: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth:1,
    borderBottomColor:'#B0C4DE'
  },

  });

  export default styles;

  
  