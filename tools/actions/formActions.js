import {verifyString, verifyEmail, verifyPassword } from "../ValidationCheck";

//validity check for user input
export const validateInputData = (inputId, inputValue) => {
    if (inputId === "firstname"){
        return verifyString(inputId, inputValue)}
       else if (inputId === "lastname"){
            return verifyString(inputId, inputValue)
    }else if (inputId === "email"){
        return verifyEmail(inputId, inputValue)
    }else if (inputId==="password"){
        return verifyPassword(inputId, inputValue)
    }
}


export const validateProductInput = (inputId, inputValue) => {
    if (inputId === "productName"){
        return verifyString(inputId, inputValue)}
       else if (inputId === "productDetails"){
            return verifyString(inputId, inputValue)
       }
       else if (inputId === "category"){
        return verifyString(inputId, inputValue)
   }
       else if (inputId === "productSize"){
        return verifyString(inputId, inputValue)
   }
   else if (inputId === "productPrice"){
    return verifyString(inputId, inputValue)
}
else if (inputId === "productID"){
    return verifyString(inputId, inputValue)
}
}

