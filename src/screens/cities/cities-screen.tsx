/* eslint-disable react-native/no-inline-styles */
import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Screens } from '../../navigator/enums';
import { RootStackParamList } from '../../navigator/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { appActions, appSelectors } from '../../redux/slices/app.slice';
import { getTemperatureUnit } from '../../utils/unit';
import CityWeather from './city-weather';
import NoCity from './no-city';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Cities>;

const CitiesScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const cityIds = useAppSelector(appSelectors.cityIds);
  const headerHeight = useHeaderHeight();
  const unit = useAppSelector(appSelectors.unit);

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

  const setImperialUnit = () => {
    dispatch(appActions.updateUnit('imperial'));
  };

  const setMetricUnit = () => {
    dispatch(appActions.updateUnit('metric'));
  };

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
      <View style={styles.units}>
        <Text
          onPress={setImperialUnit}
          style={[
            styles.unit,
            {
              fontWeight: unit === 'imperial' ? 'bold' : 'normal',
              paddingLeft: 25,
            },
          ]}>
          {getTemperatureUnit('imperial')}
        </Text>
        <Text
          onPress={setMetricUnit}
          style={[
            styles.unit,
            {
              fontWeight: unit === 'metric' ? 'bold' : 'normal',
              paddingRight: 25,
            },
          ]}>
          {getTemperatureUnit('metric')}
        </Text>
      </View>
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
  units: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 40,
    shadowColor: 'grey',
    shadowOffset: {
      width: -4,
      height: 20,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  unit: {
    padding: 15,
    fontSize: 18,
  },
});
