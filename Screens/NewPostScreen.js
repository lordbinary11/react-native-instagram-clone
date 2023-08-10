import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import AddNewPost from '../components/NewPost/AddNewPost'

const NewPostScreen = ({navigation}) => {
  return (
   <SafeAreaView style={styles.container}>
    <AddNewPost navigation={navigation}/>
   </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    container : {
      backgroundColor:"black",
      flex: 1,
    },
  })
export default NewPostScreen