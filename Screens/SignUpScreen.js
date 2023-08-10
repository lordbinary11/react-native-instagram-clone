import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import SignUpForm from '../components/Home/signUpScreen/SignUpForm'

const instagramLogo= 'https://th.bing.com/th/id/OIP.6vFFJlPpFw2aEEavclO2QAHaHa?pid=ImgDet&w=206&h=206&c=7'
const SignUpScreen = ({navigation}) => (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{uri: instagramLogo, width: 100, height:100}} />
      </View>
      <SignUpForm navigation={navigation} />
    </View>
  )

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal:12

    },

    logoContainer:{
        alignItems:'center',
        marginTop:50
    }

})
export default SignUpScreen