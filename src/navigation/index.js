import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

//Screens
import SplashScreen from '../screens/splashScreen';
import LoginScreen from '../screens/loginScreen';
import HomeScreen from '../screens/HomeScreen';

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
          name="HomeScreen"
          component={HomeScreen}
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

export default AppContainer;
