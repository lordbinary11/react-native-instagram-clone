import { View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { USERS } from '../../data/users'
const stories = () => {

  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal
       showsHorizontalScrollIndicator={false}>

         {USERS.map((story, index) => (
            <View key={index} style={{alignItems:'center'}}>
            <Image source={{uri: story.image}} style={styles.story}/>
            <Text style={{color:"white"}}>{
             story.user.length>11? story.user.slice(0,10).toLowerCase()+'...' : story.user.toLowerCase()   
            }</Text>
            </View>
         ))}    
       </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    story:{
    width:55,
    height:55,
    borderRadius: 50,
    marginLeft:6,
    borderWidth:2,
    borderColor: "#ff8501"
    }

})

export default stories