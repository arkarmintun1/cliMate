import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Screens } from '../../navigator/enums';
import { RootStackParamList } from '../../navigator/types';
import { appSelectors } from '../../redux/slices/app.slice';
import { useAppSelector } from '../../redux/hooks';
import NoCity from './no-city';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Cities>;

const CitiesScreen = ({ navigation }: Props) => {
  const cities = useAppSelector(appSelectors.cities);
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: props => (
        <TouchableOpacity onPress={() => navigation.navigate(Screens.Home)}>
          <Icon name="align-left" size={18} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate(Screens.FindCity)}>
          <Icon name="search" size={18} />
        </TouchableOpacity>
      ),
      animation: 'slide_from_left',
    });
  }, []);

  return (
    <View style={[styles.root, { marginTop: headerHeight }]}>
      {cities && cities.length ? <Text>CitiesScreen</Text> : <NoCity />}
    </View>
  );
};

export default CitiesScreen;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
