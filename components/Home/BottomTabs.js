import { View, Text, TouchableOpacity,Image, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import { Divider } from 'react-native-elements'

export const bottomTabsIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/home.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png'
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/search.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/search.png'
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/cinema-.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/cinema-.png'
    },
    {
        name: 'Shop',
        active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/shop-local.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/shop-local.png'
    },
    {
        name: 'Profile',
        active: 'https://avatars.githubusercontent.com/u/29388627?v=4',
        inactive: 'https://avatars.githubusercontent.com/u/29388627?v=4'
    },
]

const BottomTabs = ({icons}) => {
    const [activeTab, SetActiveTab] = useState('Home')

    const Icon= ({icon})=>(
        <TouchableOpacity onPress={()=>SetActiveTab(icon.name)}>
            <Image source={{uri: activeTab === icon.name ? icon.active : icon.inactive }} 
            style={[styles.icon, icon.name==='Profile'? styles.profilePic() : null, 
            activeTab==='Profile' && icon.name===activeTab? styles.profilePic(activeTab) : null]} />
        </TouchableOpacity>
    )
  return (
    <View>
    <Divider width={1} orientation='vertical'/>
    <View style={styles.container}>
      {icons.map((icon, index)=>(
       <Icon key={index} icon={icon}/> 
      ))}
    </View>
    </View>
  )
}


  

const styles =StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: "black"

    },

     profilePic:  (activeTab = '') => ({
        borderRadius:50,
        borderWidth: activeTab === 'Profile' ? 2 : 0,
        borderColor: "white",
      }),

    icon:{
        width:30,
        height:30,
    },
    
})
export default BottomTabs