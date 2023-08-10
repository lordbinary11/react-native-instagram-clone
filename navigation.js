import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './Screens/HomeScreen'
import NewPostScreen from './Screens/NewPostScreen'
import LogInScreen from './Screens/LogInScreen'
import SignUpScreen from './Screens/SignUpScreen'


const Stack = createStackNavigator()

const screenOptions = {
    headerShown: false
}

export const SignedInStack = () => (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName='HomeScreen'
       screenOptions={screenOptions}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )


export const SignedOutStack = () =>(
  <NavigationContainer>
      <Stack.Navigator
       initialRouteName='LogInScreen'
       screenOptions={screenOptions}>
        <Stack.Screen name='LogInScreen' component={LogInScreen} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
)