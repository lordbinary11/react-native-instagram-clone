
import React from 'react'
import { SignedInStack, SignedOutStack } from './navigation'
import { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, initializeApp } from 'firebase/auth';
import { app } from './Firebase'; // Import the Firebase app instance


const AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        // Get the Firebase Auth instance
        const auth = getAuth(app);
    
        // Set up a listener to check for changes in the user's authentication status
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // If a user is logged in, set the currentUser state to the user
            setCurrentUser(user);
          } else {
            // If no user is logged in, set the currentUser state to null
            setCurrentUser(null);
          }
        });
    
        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
    }, []);

  return <>{currentUser? <SignedInStack/> : <SignedOutStack/> }</>
 
} 

export default AuthNavigation