import { View, Text, TextInput, Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {  Button, Divider } from 'react-native-elements'
import validUrl from 'valid-url'
import {db, auth, addDoc, collection,FieldValue } from '../../Firebase'

const PlaceholderImage='https://th.bing.com/th/id/R.09b773495df08c18c7064d7721770408?rik=kUPR7t%2b0DcAf4Q&pid=ImgRaw&r=0'

const UploadPostSchema= Yup.object().shape({
  imageUrl: Yup.string().url().required('A URL is required'),
  caption: Yup.string().max(2200, 'Caption has reached the character limit')
})

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PlaceholderImage)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

 
    // Function to get the username and profile picture of the currently logged-in user
    const getLoggedInUserData = () => {
      const user = auth().currentUser;
      const unsubscribe = collection(db, 'users')
        .where('owner_uid', '===', user.uid)
        .limit(1)
        .onSnapshot(snapshot => 
          // Map the data from the document and update the state with the user details
          snapshot.docs.map(doc => {
            setCurrentLoggedInUser({
              username: doc.data().username,
              profilePicture: doc.data().profile_picture,
            })
          })
        );

      // Clean up the listener when the component unmounts
      return unsubscribe
    };

    // Call the function to fetch the user data
   useEffect(()=>{
    getLoggedInUserData()
   },[])

   const UploadPostToFirebase =  (imageUrl, caption) => {
    const userCollectionRef = collection(db, 'users');
    const userDocumentRef = doc(userCollectionRef, auth().currentUser.email);
    const postsCollectionRef = collection(userDocumentRef, 'posts');
  
    const newPostData = {
      imageUrl: imageUrl,
      user: currentLoggedInUser.username,
      profile_picture: currentLoggedInUser.profilePicture,
      owner_uid: auth().currentUser.uid,
      caption: caption,
      createdAt: FieldValue.serverTimestamp(),
      likes: 0,
      liked_by_users: [],
      comments: []
    };
  
    return addDoc(postsCollectionRef, newPostData)
      .then(() => navigation.goBack())
      .catch((error) => {
        console.error('Error uploading post:', error);
      });
  };
  

  return (

    <Formik
    initialValues={{caption:'', imageUrl:''}}
    onSubmit={(values)=> {
      UploadPostToFirebase(values.imageUrl, values.caption)
    }}
    validationSchema={UploadPostSchema}
    validateOnMount={true}
    >
      {({handleBlur, handleChange, handleSubmit, values, errors, isValid})=>(
         <>
          <View style={{ flexDirection:'row'}}>
            <Image source={{uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PlaceholderImage}}
              style={{width:100, height:100, margin:18}}
            />

          <TextInput 
           style={{color: "white", fontSize: 17, marginBottom:80}}
           placeholder='Write a Caption...' 
           placeholderTextColor={'gray'}
           multiline={true}
           onChangeText={handleChange('caption')} 
           onBlur={handleBlur('caption')}
           value={values.caption}
            />

          </View>
          <Divider width={0.2} orientation='vertical'/>

          <TextInput 
          onChange={e=>setThumbnailUrl(e.nativeEvent.text)}
          style={{color: "white"}}
          placeholder='Enter image URL' 
          placeholderTextColor={'gray'}
          onChangeText={handleChange('imageUrl')}
          onBlur={handleBlur('imageUrl')}
          value={values.imageUrl} 
          />

          {errors.imageUrl &&(
            <Text style={{fontSize:10, color:'red'}} >
               {errors.imageUrl}
            </Text>
          )}

           <Button
             onPress={handleSubmit} 
             title='Share'
             disabled={!isValid} 
            />
        
         </>
      )}

    </Formik>
  
  )
}

export default FormikPostUploader