import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

//Screens
import SplashScreen from '../screens/splashScreen';
import SignupScreen from '../screens/signupScreen';
import LoginScreen from '../screens/loginScreen';
import HomeScreen from '../screens/HomeScreen';
import PastGameScreen from '../screens/PastGamesScreen';
import NewGameScreen from '../screens/NewGameScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PhoneSync from '../screens/PhoneSync';

const AppStack = createStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="SplashScreen">
        {/* Screens */}
        <AppStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
          }}
        />
         <AppStack.Screen
          name="PastGameScreen"
          component={PastGameScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
          }}
        />
        <AppStack.Screen
          name="NewGameScreen"
          component={NewGameScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
          }}
        />
         <AppStack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
          }}
        />
         <AppStack.Screen
          name="PhoneSync"
          component={PhoneSync}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            headerShown: false,
          }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
//PhoneSync
export default AppContainer;
