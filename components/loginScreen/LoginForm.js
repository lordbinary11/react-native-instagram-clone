import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import  Validator  from 'email-validator'
import {auth, signInWithEmailAndPassword} from '../../Firebase'



const LoginForm = ({navigation}) => {

    const LoginFormSchema= Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, 'Your password has to have at least 6 characters')
    })

    const onLogin = async (email, password) => {
        try {
            
          const userCredential = await signInWithEmailAndPassword(auth, email, password); // Sign in the user
    
          // Signed-in user details
          const user = userCredential.user;
          console.log('Firebase login successful', user.email);
        } catch (error) {
          Alert.alert(
            'Login Error',
             error.message + '\n\n... What would you like to do next?');
        }
      };

  return (
   <View style={styles.wrapper}>

     <Formik
     initialValues={{email: '', password: ''}}
     onSubmit={(values)=> {
      onLogin(values.email, values.password)
     }}
     validationSchema={LoginFormSchema}
     validateOnMount={true}
     >

   {({handleBlur, handleChange, handleSubmit, values, errors, isValid})=>(
    <>

      <View style={[styles.inputField, 
      {borderColor: values.email.length < 1 || Validator.validate(values.email)? '#D3D3D3' : 'red'} ]}>
         <TextInput
            placeholderTextColor= "gray"
            placeholder='Phone number, username or email'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            autoFocus= {true}
            onChangeText={handleChange('email')} 
           onBlur={handleBlur('email')}
           value={values.email}
          />
        </View>

      <View style={[styles.inputField,
      {borderColor: values.password.length < 1 || values.password.length>=6? '#D3D3D3' : 'red'} ]}>
         <TextInput
            placeholderTextColor= "gray"
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect= {false}
            secureTextEntry={true}
            textContentType='password'
            onChangeText={handleChange('password')} 
           onBlur={handleBlur('password')}
           value={values.password}
          />
        </View>  

        <View style={{alignItems: 'flex-end', marginBottom: 30}}>
            <Text style={{color: '#0096F6'}}>Forgot Password?</Text>
        </View>

      <Button onPress={()=> handleSubmit()}
       title= 'Log In'
       disabled={!isValid}
       />

      <View style={styles.SignUpContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.push('SignUpScreen')} >
            <Text style={{color:  '#0096F6' }} >Sign Up</Text>
        </TouchableOpacity>
      </View>
   </>
   )}
    </Formik>
    </View>
  )
  }

  const styles= StyleSheet.create({
    wrapper:{
        marginTop:55
    },

      inputField:{
       borderRadius:4,
       padding:10,
       backgroundColor: "#FAFAFA",
       marginBottom:10,
       borderWidth:1,
       borderColor: "#D3D3D3"
    },

    SignUpContainer:{
        flexDirection:'row',
        width: '100%',
        justifyContent:'center',
        marginTop: 50
    }
  })

export default LoginForm