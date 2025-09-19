import { getFirebaseApp, getStorageInstance } from "../../Backend/FirebaseHandler";
import { getFirestore, doc, setDoc, addDoc, collectionGroup, query, docRef, where, getDoc, getDocs, collection, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

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


export const registerUser = (firstname, lastname, username, studentId, email, password) => {
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
      const userData = await createUsers(firstname, lastname, username, studentId, email, uid);
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


export const addProductToCollection = async (product) => {
  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, 'ProductDB'), {
      ...product,
      registerDate: new Date().toISOString()
    });
    if (docRef) {
      console.log('Document ID: ', docRef.id);

      const createdProd = {
        ...product,
        uid: docRef.id,
      };
      await setDoc(docRef, createdProd)
      console.log('Items added succ', docRef.id)

      return docRef.id
    }
  } catch (error) {
    console.error('Error occurred while creating product to DB', error);

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


export const createUsers = async (firstname, lastname, username, studentId, email, uid) => {
  const userData = {
    firstname, lastname, username, studentId, email, uid, registerDate: new Date().toISOString(),

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

}


export const saveToProductStorage = (productData) => {
  AsyncStorage.setItem(

    'productData', JSON.stringify(
      productData

    )


  )

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
export const updateStudentUser = async (uid, updateUserData) => {
  console.log('before update:', updateUserData);

  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const userRef = doc(db, 'UserDB', uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {

      //passing the updateUserData as an object
      await updateDoc(userRef, updateUserData[0])
      console.log('User Updated! UID ${uid}');
      alert("Account Succefully Updated", "Account Updated")

      console.log('userData:', updateUserData);
      console.log('Inside updateFunction - After update:', updateUserData);
    } else {
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




export const FetchCategory = async (category) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const docRef = collection(db, 'ProductDB');
    const q = query(docRef, where("category", "==", category));
    const querySnapshot = await getDocs(q)
    const product = [];

    querySnapshot.forEach((doc) => {
      console.log('product:', product);
      product.push({ uid: doc.id, ...doc.data() });
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
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    if (!uid) {

      console.error('Error: No user ID provided.');
      return;
    }

    const itemCartCollection = collection(db, `CartDB/${uid}/items`);

    await addDoc(itemCartCollection, { ...item, uid: item.uid });

    console.log('Product added to cart:', item);
  } catch (error) {
    console.error('Error adding product to shopping bag:', error)
    throw error;

  }
}



export const updateProductDB = async (uid) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const productRef = doc(db, 'ProductDB', uid);
    await deleteDoc(productRef)
    console.log('Product remove from ProductDB:', uid);
  } catch (error) {
    console.error('Error updating:', error)
    throw error;

  }
}




export const ViewCart = async (uid) => {
  //getting the firebase instance
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const q = query(collection(db, 'CartDB', uid, 'items'));
    const querySnapshot = await getDocs(q);

    const itemsBag = []
    querySnapshot.forEach((doc) => {
      const items = doc.data();
      itemsBag.push(items)
    });
    return itemsBag;
  } catch (error) {
    console.error("Error fetching items: ", error)
    throw error;
  }
};




export const order = async (orderId, uid, purchasedProducts, name, address) => {
  try {
    const db = getFirestore();
    if (!uid) {
      console.error('Error: No user ID provided.');
      return;
    }
    //create an order collection
    const orderCollectionRef = collection(db, `OrderDB/${uid}/item`);

    // Iterate through each purchased products
    for (const item of purchasedProducts) {
      const timestamp = new Date();
      //move the products to the order collection
      await addDoc(orderCollectionRef, { ...item, uid, orderId, name, address, orderDate: timestamp });
      console.log('items moved to OrderDB:',);
    }
    console.log('User items fetched from CartDB:', uid);
  } catch (error) {
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

    //ref to the subcollection items under the DB for each items
    const cartCollectionRef = collection(db, `CartDB/${uid}/items`);

    // Fetching all documents in the 'items' subcollection
    const querySnapshot = await getDocs(cartCollectionRef);

    // Iterate through each document to delete the product from the CartDB
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log('Item deleted from CartDB', doc.id)
    });

    console.log('All items deleted from cart for user:', uid)
  } catch (error) {
    console.error('Error deleting items from cart for user:', uid)
    throw error;
  }
};


export const ViewOrder = async () => {
  //getting the firebase instance
  const db = getFirestore();

  try {
    //Query the DB using collectionGroup instead of collection to query the sub-collection 'item' regardless of their parent collection  
    const querySnapshot = await getDocs(collectionGroup(db, 'item'));
    //initialize an empty array to store the feteched products
    const orderProducts = []
    querySnapshot.forEach((doc) => {
      console.log('product:', orderProducts);
      orderProducts.push({ uid: doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
    });
    return orderProducts;
  } catch (error) {
    console.error("Error fetching items: ", error)
    return []
  }
};



export const ViewUserOrders = async (uid) => {
  //getting the firebase instance
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const q = query(collection(db, 'OrderDB', uid, 'item'));
    const querySnapshot = await getDocs(q);

    const productsBag = []
    querySnapshot.forEach((doc) => {
      const items = doc.data();
      productsBag.push(items)
    });
    return productsBag;
  } catch (error) {
    console.error("Error fetching items: ", error)
    throw error;
  }
};



export const SearchForProducts = async (searchProduct) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const docRef = collection(db, 'ProductDB');

    const q = query(docRef,
     where("productName", ">=", searchProduct),
     where("productName", "<=", searchProduct + '\uf8ff'));
 //This condition ensure that the productName field value is less or equal to the 'searchProduct' concat with '\uf8ff'
      //'\uf8ff' to the searchProduct ensures that all possible characters that could follow searchProduct are captured


    const querySnapshot = await getDocs(q)

    const products = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()

    }));
    console.log('product:', products);

    console.log('Data Stored:', products);

    return products;

  } catch (error) {
    console.error("Error:", error)
    throw error;

  }
}


export const FetchSimilarCategory = async (category, excludeId) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    const docRef = collection(db, 'ProductDB');
    const q = query(docRef, where("category", "==", category));
    const querySnapshot = await getDocs(q)
    //const products = [];

    const products = querySnapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data()

    }));
    return products.filter(product => product.uid !== excludeId);

  } catch (error) {
    console.error("Error:", error)
    return []

  }

};


export const fetchProductsFromCart = async (item) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    if (item && item.uid) {
      console.log('uidRecieve:', item.uid);

    const itemCartCollection = collection(db, 'ProductDB' );

    //ref to the document using the item uid
    const docRef = doc(itemCartCollection,item.uid )

//set the item doc data and the item uid
    const newRef = {
    ...item,
    uid: item.uid
    }

   await setDoc(docRef,newRef);

    console.log('Product remove from cart:', item.uid);
    }else{
      console.error('Error adding product to collection:', error)

    }
  } catch (error) {
    console.error('Error adding product:', error)
    throw error;

  }
}


export const deleteProductFromCartDB = async (uid, item) => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
   try {
   
    //ref to  the subcollection items under the DB for each items
    const cartItemRef = collection(db, `CartDB/${uid}/items`);

    //query the collection to find the product by the document ID.
    const q = query(cartItemRef, where("uid", "==", item.uid));
    console.log('Item uid', item.uid)
    console.log('uid', item.uid)
    const querySnapshot = await getDocs(q)

    //Iterate through each document to delete the product from the CartDB
    querySnapshot.forEach(async (doc) => {
    //call the deleteDoc to delete the matched product
    await deleteDoc(doc.ref);
    console.log('Document ID', doc.id);

    });
    console.log('User item deleted from CartDB', uid)
  } catch (error) {
    console.error('Error deleting items from cart for user:')
    throw error;
  }
};

export const viewSingleOrders = async (uid) => {
  //getting the firebase instance
  const app = getFirebaseApp();
  const db = getFirestore(app);
  try {
    //ref to  the subcollection items under the DB for each items
    const q = query(collection(db, 'OrderDB', uid, 'item'));
    const querySnapshot = await getDocs(q);

    const order = []
    querySnapshot.forEach((doc) => {
      const items = doc.data();
      order.push(items)
    });
    return order;
  } catch (error) {
    console.error("Error fetching items: ", error)
    throw error;
  }
};

