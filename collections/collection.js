import { configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";

//use the varibale store to create configureStore function, it takes an object as its argument. 
export const store = configureStore({
    //object containing the reducer property, which is assigned a key and a value pair 
    reducer: {
        auth: authSlice
    }
})