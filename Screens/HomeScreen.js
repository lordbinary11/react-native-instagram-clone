import { SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/Home/header'
import Stories from '../components/Home/stories'
import Post from '../components/Home/post'
import { POSTS } from '../data/posts'
import BottomTabs, { bottomTabsIcons } from '../components/Home/BottomTabs'
import { useEffect } from 'react'
import {db, getDocs, collectionGroup} from '../Firebase'


const HomeScreen = ({navigation}) => {

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collectionGroup(db, 'posts'));
        const posts = querySnapshot.docs.map((doc) => doc.data());
        console.log(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  return ( 
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories/>
      <ScrollView showsVerticalScrollIndicator={false}>
      {POSTS.map((post, index)=>(
        <Post post={post} key={index}/>
      ))}
      </ScrollView> 
      <BottomTabs icons={bottomTabsIcons}/> 
    </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  container : {
    backgroundColor: "black",
    flex: 1,
  },
})

export default HomeScreen