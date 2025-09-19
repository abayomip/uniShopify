import { StyleSheet, Text, TextInput,View} from 'react-native'

export const Input = (props) => {
    const onChangeText = (text)=> {
      props.onInputChanged(props.id,text)

    }
    return (
      <View style ={styles.container}>
        <View 
        style={styles.inputContainer}
        >
          <TextInput
          {...props}
          placeholder={props.placeholder}
          style={[styles.input, props.textInputStyle, props.scrollContentContainer]}
          autoCapitalize='none'
          onChangeText = {onChangeText}

          />
      </View>
      {
        props.errorText && (
          <View style= {styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText[0]}</Text>
          </View>
        )
      }
      </View>
    )
  }
  
  const styles = StyleSheet.create({
   
    inputContainer:{
    },
    input:{
        borderWidth: 2, 
        borderRadius: 4, 
        width: 265,
        height: 40, 
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        borderColor: '#ccc',   
        textAlignVertical: 'top', 
        fontFamily:'Unna-BoldItalic',    
      },
  
    
    errorContainer: {
        marginVertical: 4
        },
        errorText:{
          color: "red",
          fontSize:12
        },
      
  }
  ) 
  
  
  export default Input
  


  
  