import { getFirebaseApp, getStorageInstance } from "../../Backend/FirebaseHandler";
import { getFirestore, doc, setDoc, addDoc,collectionGroup, query, docRef, where, getDoc, getDocs, collection, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { child, getDatabase, ref } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticate } from "../../collections/authSlice";
import 'firebase/firestore';





export const register = (firstname, lastname, username, email, password) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(result)
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const userData = await createAdmin(firstname, lastname, username, email, uid);
      dispatch(authenticate({ token: accessToken, userData }))
      //save user data and token to storage
      saveToDataStorage(accessToken, uid, expiryDate)
    } catch (error) {
      alert(error.message)
      console.log(error)
      const errorCode = error.errorCode
      let message = "There is an issue"

      if (errorCode === "auth/wrong-password!!!" || errorCode === "auth/user-not-available") {
        message = "incorrect email or password"
      }
      throw new Error(message);

    }
  }
}


export const registerUser = (firstname, lastname, username,studentId, email, password) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(result)
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const userData = await createUsers(firstname, lastname, username,studentId, email, uid);
      dispatch(authenticate({ token: accessToken, userData }))
      //save user data and token to storage
      //saveToDataStorage(accessToken, uid, expiryDate)
    } catch (error) {
      alert(error.message)
      console.log(error)
      const errorCode = error.errorCode
      let message = "There is an issue"

      if (errorCode === "auth/wrong-password!!!" || errorCode === "auth/user-not-available") {
        message = "incorrect email or password"
      }
      throw new Error(message);

    }
  }
}
export const StudentRegister = (profilePicture, firstname, lastname, username, email, password, studentId, courseName) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(result)
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const userData = await createStudentUser(profilePicture, firstname, lastname, username, email, studentId, courseName, uid);
      dispatch(authenticate({ token: accessToken, userData }))
      //save user data and token to storage
      saveToDataStorage(accessToken, uid, expiryDate)
    } catch (error) {
      alert(error.message)
      console.log(error)
      const errorCode = error.errorCode
      let message = "There is an issue"

      if (errorCode === "auth/wrong-password!!!" || errorCode === "auth/user-not-available") {
        message = "incorrect email or password"
      }
      throw new Error(message);

    }
  }
}


export const CreateItem = (productImage, productName, productDetails, category, productSize, productPrice, productID, seller) => {
  return async (dispatch) => {
    try {

      const productData = await Product(productImage,
        productName,
        productDetails,
        category,
        productSize,
        productPrice,
        productID,
        seller)
      dispatch(authenticate({ productData }))
      //save user data and token to storage
      saveToProductStorage(productData)
    } catch (error) {
      alert(error.message)
      console.log(error)
      throw new Error("An issue occured while creating product");
    }
  }
}

export const Product = async (productImage, productName, productDetails, category, productSize,
  productPrice,
  productID,seller) => {
  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const ProductRef = collection(db, 'ProductDB')

    const docRef = await addDoc(ProductRef, {
      productImage, productName, productDetails, category, productSize,
      productPrice,
      productID,seller,
      uid: '',
      registerDate: new Date().toISOString()
    });

    const CreatedProd = {
      productImage, productName, productDetails, category, productSize,
      productPrice,
      productID,seller,
      uid: docRef.id,
      registerDate: new Date().toISOString()
    };
    await updateDoc(docRef, { uid: docRef.id });
    console.log('ProductCreated:', CreatedProd);
    return CreatedProd;
  } catch (error) {
    console.error('Error occurred while creating product to DB', error);
    throw error;
  }
}


export const ViewProducts = async () => {
  //getting the firebase instance
  const app = getFirebaseApp();
  const db = getFirestore(app);
  //Empty array use to store the data retrieved from the DB
  const data = [];

  try {
    const querySnapshot = await getDocs(collection(db, "ProductDB"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      data.push(doc.data());
      //data.push(JSON.stringify(doc.data()));

    });
    console.log('Data:', data);

  } catch (error) {
    console.error("Error:", error)
    throw error;

  }
  return data;

}

export const ViewProductItem = async (uid) => {

  const app = getFirebaseApp();
  const db = getFirestore(app);
  const userRef = doc(db, 'ProductDB', uid);
  try {
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      console.log('data!', data);
      //return JSON.stringify(data);
     // const jsonString = JSON.stringify(data);

     return data;

    } else {
      console.log('Data doesnt exist!');
      return null;
    }
  } catch (error) {
    console.log('Error getting user data:', error);
    throw error;

  }
}

export const ViewSingleStudent = async (uid) => {

  const app = getFirebaseApp();
  const db = getFirestore(app);
  const userRef = doc(db, 'UserDB', uid);
  try {
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const data = snapshot.data();

      console.log('data!', data);

      return data;

    } else {
      console.log('Data doesnt exist!');
      return null;
    }
  } catch (error) {
    console.log('Error getting user data:', error);
    throw error;

  }
}




//login function to manage the admin user login using Firestore Authentication 
export const LoginAdmin = (email, password) => {
  //the function recieves dispatch as an argument, this allows to dispatch the action 
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //Extracts the user uid and Token Manager 
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime);

      //userData variable holds the result from the async function 
      const userData = await getAdminData(uid);
      if (userData) {
        //If user exist the below line dispatched an action using the Authenticate action creator 
        //containing the user auth token and user data, this action will triggers the reducer function to update the redux store state.
        dispatch(authenticate({ token: accessToken, userData }));
        saveToDataStorage(accessToken, uid, expiryDate)
        console.log('Login Successfull!');

      } else {
        throw new Error('User record not found!');
      }

    } catch (error) {
      alert(error.message)
      console.log(error)
      const errorCode = error.errorCode
      let message = "There is an issue"

      if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
        message = "Wrong email or password"
      }
      throw new Error(message);

    }

  }
}


//Student login function using Firestore Authentication 
export const LoginStudent = (email, password) => {
  //the function recieves dispatch as an argument, this allows to dispatch the action 
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      //Extracts the user uid and Token Manager 

      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime);

      //userData variable holds the result from the async function 
      const userData = await ViewStudentProfile(uid);
      if (userData) {
        //If user exist the below line dispatched an action using the Authenticate action creator 
        //containing the user auth token and user data, this action will triggers the reducer function to update the redux store state.
        dispatch(authenticate({ token: accessToken, userData }));
        saveToDataStorage(accessToken, uid, expiryDate)
        console.log('Login Successfull!');

      } else {
        throw new Error('User record not found!');
      }

    } catch (error) {
      alert(error.message)
      console.log(error)
      const errorCode = error.errorCode
      let message = "There is an issue"

      if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
        message = "Wrong email or password"
      }
      throw new Error(message);

    }

  }
}



export const createAdmin = async (firstname, lastname, username, email, uid) => {
  const userData = {
    firstname, lastname, username, email, uid, registerDate: new Date().toISOString(),

  };
  console.log('Create user in DB:', userData);
  const app = getFirebaseApp();
  const db = getFirestore(app);
  const userRef = doc(db, 'AdminDB', uid);

  try {
    await setDoc(userRef, userData);

    return userData;
  } catch (error) {
    console.error('Error creating user to DB', error);
    throw error;
  }
};


export const createUsers = async (firstname, lastname, username, studentId,email, uid) => {
  const userData = {
    firstname, lastname, username,studentId, email, uid, registerDate: new Date().toISOString(),

  };
  console.log('Create user in DB:', userData);
  const app = getFirebaseApp();
  const db = getFirestore(app);
  const userRef = doc(db, 'UserDB', uid);

  try {
    await setDoc(userRef, userData);

    return userData;
  } catch (error) {
    console.error('Error creating user to DB', error);
    throw error;
  }
};

export const createStudentUser = async (profilePicture, firstname, lastname, username, email, studentId, courseName, uid) => {

  const userData = {
    profilePicture, firstname, lastname, username, email, studentId, courseName, uid, registerDate: new Date().toISOString(),

  };
  console.log('Create user in DB:', userData);
  const app = getFirebaseApp();
  const db = getFirestore(app);
  const userRef = doc(db, 'StudentDB', uid);

  try {
    await setDoc(userRef, userData);
    console.log('userData:', userData);
    return userData;


  } catch (error) {
    console.error('Error creating user to DB', error);
    throw error;
  }
};

export const saveToDataStorage = (token, uid, expiryDate) => {
  AsyncStorage.setItem(

    'userData', JSON.stringify({
      token,
      uid,
      expiryDate: expiryDate.toISOString(),

    })

  )
  // console.log('userData10:', userData);

}


export const saveToProductStorage = (productData) => {
  AsyncStorage.setItem(

    'productData', JSON.stringify(
      productData

    )


  )
  //console.log('productData:', productData);

}
export const ProductRetriever = async () => {
  try {
    const value = await AsyncStorage.getItem('productData');
    console.log('ID receved:', value); // Log the stored user ID

    if (value !== null) {

      return value;

    }
  } catch (error) {
    console.error('Error retrieving data:', error);

  }
}




export const dataRetrieve = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    console.log('User ID receved:', value);

    if (value !== null) {

      return value;

    }

  } catch (error) {
    // console.error('Error retrieving data:', error);

  }
}
//retrive user details with the user id
export const getAdminData = async (uid) => {

  const app = getFirebaseApp();
  const db = getFirestore(app);
  const userRef = doc(db, 'AdminDB', uid);
  try {
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data) {
        saveFirstname(data)
      }
      console.log('datta:', data);


      return data;

    } else {
      console.log('Data doesnt exist!');
      return null;
    }
  } catch (error) {
    console.log('Error getting user data:', error);
    throw error;

  }
}


export const saveFirstname = (data) => {
  AsyncStorage.setItem(

    'data', JSON.stringify(
      data

    )


  )
  console.log('datta:', data);

}

export const firstnameRetriever = async () => {
  try {
    const value = await AsyncStorage.getItem('data');
    console.log('IDD receved:', value); // Log the stored user ID

    if (value !== null) {

      return value;

    }
  } catch (error) {
    console.error('Error retrieving data:', error);

  }
}



export const ViewRegisteredStudent = async () => {
  //getting the firebase instance
  const app = getFirebaseApp();
  const db = getFirestore(app);
  //Empty array use to store the data retrieved from the DB
  const data = [];

  try {
    const querySnapshot = await getDocs(collection(db, "StudentDB"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      data.push(doc.data());

    });
    console.log('Data:', data);

  } catch (error) {
    console.error("Error:", error)
    throw error;

  }
  return data;

}

export const ViewRegisteredUser = async () => {
  //getting the firebase instance
  const app = getFirebaseApp();
  const db = getFirestore(app);
  //Empty array use to store the data retrieved from the DB
  const data = [];

  try {
    const querySnapshot = await getDocs(collection(db, "UserDB"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      data.push(doc.data());

    });
    console.log('Data:', data);

  } catch (error) {
    console.error("Error:", error)
    throw error;

  }
  return data;

}

export const ViewStudentProfile = async (uid) => {
  //getting the firebase instance with getFirebaseApp()
  const app = getFirebaseApp();
  const db = getFirestore(app);
  //Empty array use to store the data retrieved from the DB
  const data = [];
  const docRef = doc(db, 'UserDB', uid);

  try {
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      if (data) {
        saveFirstname(data)
      }
      console.log('datta:', data);


      return data;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error:", error)
    throw error;

  }
  return data;

}
export const updateItem = async (uid, productData) => {
  console.log('before update:', productData);

  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const userRef = doc(db, 'ProductDB', uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {

      //passing the updateUserData as an object
      await updateDoc(userRef, productData[0])
      console.log('item Updated! UID ${uid}');
      alert("Item Succefully Updated", "Item Updated")

      console.log('itemData:', productData);
      console.log('Inside updateFunction - After update:', productData);
    } else {
      console.log('item does not exist:', uid);

    }
    //timestamp: serverTimestamp()});
  } catch (error) {
    console.error('Error updating user to DB', error);
    throw error;
  }
};
export const updateStudentUser = async (uid, updateUserData) =>{
  console.log('before update:', updateUserData);

  const app =  getFirebaseApp();
  const db = getFirestore(app);
  try{
  const userRef = doc(db, 'UserDB', uid);
  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {

 //passing the updateUserData as an object
    await updateDoc(userRef,updateUserData[0]) 
    console.log('User Updated! UID ${uid}');
    alert("Account Succefully Updated", "Account Updated")

      console.log('userData:', updateUserData);
      console.log('Inside updateFunction - After update:', updateUserData);
  }else{
    console.log('User does not exist:', uid);

  } 
      //timestamp: serverTimestamp()});
  } catch (error) {
    console.error('Error updating user to DB', error);
    throw error;
  }
};
    

export const DeleteStudentProfile = async (uid) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);

  try {
    const studentRef = doc(db, 'UserDB', uid);

    await deleteDoc(studentRef);
    console.log('User Deleted! UID ${uid}');
    alert("Account Succefully Deleted", "Account Deleted")

  } catch (error) {
    console.error('Error updating user to DB', error);
    throw error;
  }
};

export const DeleteItem = async (uid) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);

  try {
    const ItemRef = doc(db, 'ProductDB', uid);

    await deleteDoc(ItemRef);
    console.log('Item Deleted! UID ${uid}');
    alert("Item Deleted", "Item Deleted")

  } catch (error) {
    console.error('Error updating DB', error);
    throw error;
  }
};

export const CSY1010_Attendance = async (studentId, loginCode) => {

  console.log('Create user in DB:', studentId);

  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const userRef = collection(db, 'AttendanceCSY1010');

    const newRef = await addDoc(userRef, {
      studentId,
      date: new Date().toISOString(),
      loginCode,
    });
    console.log('Data Stored:', newRef.studentId);


  } catch (error) {
    console.error('Error creating user to DB', error);
    throw error;
  }
};

export const CSY2020_Attendance = async (studentId, loginCode) => {

  console.log('Create user in DB:', studentId);

  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const userRef = collection(db, 'AttendanceCSY2020');

    const newRef = await addDoc(userRef, {
      studentId,
      date: new Date().toISOString(),
      loginCode,
    });
    console.log('Data Stored:', newRef.studentId);


  } catch (error) {
    console.error('Error creating user to DB', error);
    throw error;
  }
};

export const CSY1011__Attendance = async (studentId, loginCode) => {

  console.log('Create user in DB:', studentId);

  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const userRef = collection(db, 'AttendanceCSY1011');

    const newRef = await addDoc(userRef, {
      studentId,
      date: new Date().toISOString(),
      loginCode,
    });
    console.log('Data Stored:', newRef.studentId);


  } catch (error) {
    console.error('Error creating user to DB', error);
    throw error;
  }
};


export const CSY2021__Attendance = async (studentId, loginCode) => {

  console.log('Create user in DB:', studentId);

  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const userRef = collection(db, 'AttendanceCSY2021');

    const newRef = await addDoc(userRef, {
      studentId,
      date: new Date().toISOString(),
      loginCode,
    });
    console.log('Data Stored:', newRef.studentId);


  } catch (error) {
    console.error('Error creating user to DB', error);
    throw error;
  }
};

export const TimeLine = async (studentId, chat) => {

  console.log('Create user in DB:', studentId);

  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const userRef = collection(db, 'TimelineDB');

    const newRef = await addDoc(userRef, {
      studentId,
      date: new Date().toISOString(),
      chat,
    });
    console.log('Data Stored:', newRef.studentId);


  } catch (error) {
    console.error('Error creating user to DB', error);
    throw error;
  }
};



export const FetchCategory = async (category) => {
  //getting the firebase instance with getFirebaseApp()
  const app = getFirebaseApp();
  const db = getFirestore(app);
  //Empty array use to store the data retrieved from the DB
  try {
    const docRef = collection(db, 'ProductDB');
    const q = query(docRef, where("category", "==", category));
    const querySnapshot = await getDocs(q)
    const product = [];

    querySnapshot.forEach((doc) => {
      console.log('product:', product);
      product.push( {uid:doc.id, ...doc.data() });
     console.log(doc.id, " => ", doc.data());

    })
    console.log('Data Stored:', product);

    return product;
    
  } catch (error) {
    console.error("Error:", error)
    throw error;

  }

};

export const fetchProductsToCart = async (uid, item) => {
  const app =  getFirebaseApp();
  const db = getFirestore(app);
  try {
    if (!uid) {
      console.error('Error: No user ID provided.');
      return;
    }
    
  const itemCartCollection = collection(db,  `CartDB/${uid}/items`);
//await addDoc(itemCartCollection, {item});
await addDoc(itemCartCollection, {...item, uid: item.uid});

  console.log('Product added to cart:', item);
} catch (error) {
  console.error('Error adding product to shopping bag:',error)
  throw error;

}
}



export const updateProductDB = async (uid) => {
  const app =  getFirebaseApp();
  const db = getFirestore(app);
  try {
  const productRef = doc(db, 'ProductDB', uid);
  await deleteDoc(productRef)
  console.log('Product remove from ProductDB:', uid);
} catch (error) {
  console.error('Error updating:',error)
  throw error;

}
}




export const ViewCart = async (uid) => {
  //getting the firebase instance
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const q = query(collection(db,  'CartDB', uid , 'items'));
    const querySnapshot = await getDocs(q);

    const itemsBag = []
    querySnapshot.forEach((doc) =>{
      const items = doc.data();
      itemsBag.push(items)
    });
    return itemsBag;
  } catch (error) {
    console.error("Error fetching items: ", error)
    throw error;
}
};




export const order = async (orderId,uid,purchasedProducts,name,address) => {
  try{
    const db = getFirestore();
    if (!uid) {
      console.error('Error: No user ID provided.');
      return;
    }
    //create an order collection
    const orderCollectionRef = collection(db, `OrderDB/${uid}/item`);

        // Iterate through each purchased products
for (const item of purchasedProducts){
  //move the products to the order collection
  await addDoc(orderCollectionRef,{...item,uid,orderId,name,address});
  console.log('items moved to OrderDB:',);
}
console.log('User items fetched from CartDB:', uid);
  }catch(error){
    console.error('Error moving items to OrderDB', error);
    throw error;
  }

}




export const updateCartDB = async (uid) => {
const db = getFirestore();
  try {
    if (!uid) {
      console.error('Error: No user ID provided.');
      return;
    }
    
    //query the subcollection items under the DB for each items
    const cartCollectionRef = collection(db, `CartDB/${uid}/items`);

    // Fetch all documents in the 'items' subcollection
    const querySnapshot = await getDocs(cartCollectionRef);

    // Iterate through each document and delete it
    querySnapshot.forEach(async(doc) => {
      await deleteDoc(doc.ref);
      console.log('Item deleted from CartDB', doc.id)
    });

  console.log('All items deleted from cart for user:', uid)
  }catch(error){
    console.error('Error deleting items from cart for user:', uid)
    throw error;
  }
};


export const ViewOrder = async() => {
  //getting the firebase instance
  const db = getFirestore();

  try {
    //Query the OrderDB using collectionGroup instead of collection to query the items regardless of their parent collection 
    const querySnapshot = await getDocs(collectionGroup(db,  'item'));
//initialize an empty array to store the feteched products
    const orderProducts = []
    querySnapshot.forEach((doc) =>{
      console.log('product:', orderProducts);
      orderProducts.push( {uid:doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
    });
    return orderProducts;
  } catch (error) {
    console.error("Error fetching items: ", error)
    return[]
}
};


