import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { name as appName } from '../../app.json';
import CitiesScreen from '../screens/cities/cities-screen';
import FindCityScreen from '../screens/find-city/find-city-screen';
import HomeScreen from '../screens/home/home-screen';
import { Screens } from './enums';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const mainNavigatorRoute = 'MainNavigator';

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName={Screens.Home}
    screenOptions={{
      headerTitleAlign: 'center',
      headerTransparent: true,
      headerShown: true,
      title: appName,
    }}>
    <Stack.Screen name={Screens.Home} component={HomeScreen} />
    <Stack.Screen name={Screens.Cities} component={CitiesScreen} />
    <Stack.Screen name={Screens.FindCity} component={FindCityScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
