import { View, Text, TextInput,Alert, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup'
import  Validator  from 'email-validator'

import {db,collection, auth, createUserWithEmailAndPassword} from '../../../Firebase'
import { setDoc, doc} from 'firebase/firestore'

const SignUpForm = ({navigation}) => {

    const SignUpFormSchema= Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2,'A username is required'),
        password: Yup.string().required().min(6, 'Your password has to have at least 6 characters')
      })

      const getRandomProfilePic = async()=>{
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
      }

      const onSignUp = async (email, username, password) => {
        try {
    
          const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Sign Up the user
    
          // Sign-Up user details
          console.log('User Successfully created', userCredential.user.email);

          const userCollection = collection(db, 'users')
          await setDoc(doc(userCollection, userCredential.user.email), {
            owner_uid: userCredential.user.uid,
            username: username,
            email: userCredential.user.email,
            profile_picture: await getRandomProfilePic()
          })
        } catch (error) {
          Alert.alert(
            'Login Error',
             error.message + '\n\n... What would you like to do next?');
        }
      };
  

  return (
   <View style={styles.wrapper}>
 
     <Formik
     initialValues={{email: '', username: '', password: ''}}
     onSubmit={(values)=> {
      onSignUp(values.email, values.username, values.password)
     }}
     validationSchema={SignUpFormSchema}
     validateOnMount={true}
     >

   {({handleBlur, handleChange, handleSubmit, values, errors, isValid})=>(
    <>

      <View style={[styles.inputField, 
      {borderColor: values.email.length < 1 || Validator.validate(values.email)? '#D3D3D3' : 'red'} ]}>
         <TextInput
            placeholderTextColor= "gray"
            placeholder='Email'
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
      {borderColor: values.username.length < 1 || values.username.length>=2? '#D3D3D3' : 'red'} ]}>
         <TextInput
            placeholderTextColor= "gray"
            placeholder='username'
            autoCapitalize='none'
            textContentType='username'
            onChangeText={handleChange('username')} 
           onBlur={handleBlur('username')}
           value={values.username}
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

      <Button onPress={handleSubmit} title= 'Sign Up' disabled={!isValid} />

      <View style={styles.SignUpContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={()=> navigation.goBack('LogInScreen')}>
            <Text style={{color:  '#0096F6' }} >Log In</Text>
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

export default SignUpForm