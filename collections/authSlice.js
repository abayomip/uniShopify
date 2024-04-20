
import {createSlice} from "@reduxjs/toolkit";

//createSlice function to generate a slice of the Redux store
const authSlice = createSlice({
    name: "auth",// Slice name

//Declare the initial state of the slice
    initialState: {
        token: null,
        userData:null,
        productData:null,
        didTryAutoLogin: false,
        isAuthenticated: false
    },
// each key in the reducer represents an action typ, defining how the state should be to updated when an action is dispatched.
    reducers: {
        authenticate: (state, action)=>{
            const {payload} = action
            state.token = payload.token
            state.userData = payload.userData
            state.productData = payload.productData
            state.didTryAutoLogin = true
            state.isAuthenticated = true

        },
        logout:(state)=>{
            state.isAuthenticated = false;
            state.userData = null;

        },
        //setting action changes event on user login 
        setTryAutoLogin: (state, action) => {
        state.didTryAutoLogin = true
        }
    }
});

export const authenticate = authSlice.actions.authenticate
export const {logout} = authSlice.actions
export const setTryAutoLogin = authSlice.actions.setDidTryAutoLogin
export default authSlice.reducer
