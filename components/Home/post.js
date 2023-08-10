import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'

import likedIcon from '../../assets/liked_icon.png';
import likeIcon from '../../assets/like.png';
import commentIcon from '../../assets/comment_icon.png';
import shareIcon from '../../assets/share_icon.png';
import saveIcon from '../../assets/save_icon.png';

const post = ({post}) => {
  return (
    <View style={{marginBottom:30}}>
      <Divider width={1} orientation='vertical'/>
      <PostHeader post={post}/>
      <PostImage post={post}/>
      <View style={{marginHorizontal:15, marginTop:10}}>
      <PostFooter post={post}/>
      <Likes post={post}/>
      <Caption post={post}/>
      <CommentsSection post={post}/>
      <Comments post={post}/>
      </View>
    </View>
  )
}

const PostHeader=({post})=>{
    return(
    <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:5,
        alignItems:'center'
    }}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image source={{uri: post.profile_picture}} style={styles.story}/>
            <Text style={{color:"white", marginLeft:5, fontWeight:700}}>{post.user}</Text>
        </View>

        <Text style ={{color:"white", fontWeight:700}}>...</Text>
    </View>
)}

const PostImage=({post})=>(
    <View
       style={{
        width:'100%',
        height:420
       }}>
      
    <Image source={{uri: post.imageUrl}} style={{height:'100%' , resizeMode:'cover'}}/>
    </View>

)

const PostFooter=()=>(
    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
       <View style={{flexDirection:'row'}}>
          <Icon imgStyle={styles.footerIcon} imgSource={likeIcon} />
          <Icon imgStyle={styles.footerIcon} imgSource={commentIcon} />
          <Icon imgStyle={styles.footerIcon} imgSource={shareIcon} />
       </View>
       
        <View>
          <Icon imgStyle={styles.footerIcon} imgSource={saveIcon} />
        </View>
    </View>        
)

const Icon=({imgStyle, imgSource})=>(
    <TouchableOpacity>
        <Image style={imgStyle} source={imgSource}/>
    </TouchableOpacity>
)

const Likes=({post})=>(
    <View style={{flexDirection:'row', marginTop:4}}>
    <Text style={{color:"white", fontWeight:'600'}}>{post.likes.toLocaleString('en')} likes</Text>
    </View>
)

const Caption=({post})=>(
    <View style={{marginTop:4}}>
    <Text style={{color:"white"}}>
    <Text style={{fontWeight:700}}>{post.user}</Text>  <Text>{post.caption}</Text>
    </Text>
    </View>
)

const CommentsSection=({post})=>(
    <View>
      {!!post.comments.length &&(
        <Text style={{color:"gray"}}>
        View {post.comments.length > 1? 'all ' : ''}{post.comments.length}
        {post.comments.length > 1? ' Comments' : ' Comment' }</Text>
      )}
    </View>
)

const Comments=({post})=>(
    <>
        {post.comments.map((comment,index)=>(
            <View key={index}>
                <Text style={{color:"white"}}>
                   <Text style={{fontWeight:700}}>{comment.user}</Text>  {comment.comment}
                </Text>
            </View>
        ))}
    </>
)
const styles=StyleSheet.create({
    story:{
    width:35,
    height:35,
    borderRadius:50,
    marginLeft:6,
    borderWidth:1.6,
    borderColor: "#ff8501"
    },

    footerIcon:{
        width:30,
        height:30,
        marginRight:5
    }

})

export default post