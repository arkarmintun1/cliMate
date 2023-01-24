import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Screens } from '../../navigator/enums';
import { RootStackParamList } from '../../navigator/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { appActions, appSelectors } from '../../redux/slices/app.slice';
import CityWeather from './city-weather';

const headerHeight = Dimensions.get('window').height * 0.2;
const bodyHeight = Dimensions.get('window').height * 0.8;

type Props = NativeStackScreenProps<RootStackParamList, Screens.Home>;

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const cityIds = useAppSelector(appSelectors.cityIds);

  useEffect(() => {
    dispatch(appActions.getWeathers());
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate(Screens.Cities)}>
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
    <View style={{ backgroundColor: 'white' }}>
      <View style={styles.header}></View>
      <View>
        <FlatList
          data={cityIds}
          style={styles.cityDisplay}
          renderItem={info => <CityWeather cityId={info.item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item}
          snapToInterval={bodyHeight}
          decelerationRate={0}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    height: headerHeight,
  },
  cityDisplay: {
    height: bodyHeight,
  },
});
