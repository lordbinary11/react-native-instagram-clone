import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import {  auth, signOut } from '../../Firebase'; // Import the Firebase app instance

const handleSignOut = async () => {
  try {
    
    await signOut(auth);
    // You can also do any additional actions after sign-out, such as navigating to a different screen
  } catch (error) {
    console.log('Error during sign-out:', error.message);
  }
};

const header = ({navigation}) => {
  return (
    <View style={styles.container}>
     <TouchableOpacity onPress={handleSignOut}>
       <Image style={styles.logo}
        source={require('../../assets/black_header_logo.png')}/>
      </TouchableOpacity>
    
      <TouchableOpacity onPress={()=> navigation.push('NewPostScreen')}>
        <Image style={styles.icon}
        source={require('../../assets/addCollection.png')}/>
      </TouchableOpacity>

      <TouchableOpacity>
        <Image style={styles.icon}
        source={require('../../assets/like.png')}/>
      </TouchableOpacity>
   
      <TouchableOpacity>
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>11</Text>
        </View>
        <Image style={styles.icon}
        source={require('../../assets/message.png')}/>
      </TouchableOpacity>
   

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    flexDirection: 'row',
  },

  iconsContainer:{
    flexDirection: 'row',
  },

  icon:{
    width: 30,
    height: 30,
    resizeMode:'contain',
    marginLeft: 10
      
  },

    logo: {
      width: 150,
      height: 100,
      resizeMode: 'contain',
      marginRight: 80
    },

    unreadBadge:{
      backgroundColor: "red",
      position: 'absolute',
      left: 20,
      bottom: 18,
      width: 25,
      height: 18,
      borderRadius:25,
      alignItems:'center',
      justifyContent: 'center',
      zIndex: 100,
    },
    
    unreadBadgeText:{
      color: "white",
    fontWeight: 600
    }
  });
  

export default header