import { View, Text, Image, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import FormikPostUploader from './FormikPostUploader'

const AddNewPost = ({navigation}) => {
  return (
   <View style={styles.container}>
    <Header navigation={navigation} />
    <FormikPostUploader navigation={navigation}/>
   </View>
  )
}

const Header=({navigation})=>(
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={()=> navigation.goBack()}>
    <Image  source={require('../../assets/icons8-back-50.png')} style={{width:30, height:30, margin:10}} />
    </TouchableOpacity>
    <Text style={styles.headerText} >NEW POST</Text>
    <Text></Text>
</View>
)
      


const styles=StyleSheet.create({
    container:{
        marginTop:20
    },

    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

    headerText:{
        color:"white",
        fontWeight:700,
        fontSize: 20,
        marginRight:25
    }

})
export default AddNewPost