import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Screens } from '../../navigator/enums';
import { RootStackParamList } from '../../navigator/types';
import { useAppSelector } from '../../redux/hooks';
import { appSelectors } from '../../redux/slices/app.slice';
import CityWeather from './city-weather';
import NoCity from './no-city';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Cities>;

const CitiesScreen = ({ navigation }: Props) => {
  const cityIds = useAppSelector(appSelectors.cityIds);
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
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
  }, [navigation]);

  return (
    <View style={[styles.root, { marginTop: headerHeight }]}>
      {cityIds && cityIds.length ? (
        <FlatList
          data={cityIds}
          style={styles.flatList}
          renderItem={info => (
            <CityWeather cityId={info.item} index={info.index} />
          )}
        />
      ) : (
        <NoCity />
      )}
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
    backgroundColor: 'white',
  },
  flatList: {
    width: '100%',
  },
});
