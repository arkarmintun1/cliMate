import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewabilityConfigCallbackPairs,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Screens } from '../../navigator/enums';
import { RootStackParamList } from '../../navigator/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { appActions, appSelectors } from '../../redux/slices/app.slice';
import NoCity from '../cities/no-city';
import CityWeather from './city-weather';

const headerHeight = Dimensions.get('window').height * 0.2;
const bodyHeight = Dimensions.get('window').height * 0.8;

type Props = NativeStackScreenProps<RootStackParamList, Screens.Home>;

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const cityIds = useAppSelector(appSelectors.cityIds);
  const cities = useAppSelector(appSelectors.cities);
  const currentCityId = useAppSelector(appSelectors.currentCityId);
  const [imageUrl, setImageUrl] = useState(
    'https://picsum.photos/seed/city/500',
  );

  useEffect(() => {
    dispatch(appActions.getWeathers());
  }, [dispatch]);

  useEffect(() => {
    const city = cities[currentCityId];
    if (city) {
      const url = `https://picsum.photos/seed/${city.id}/500`;
      setImageUrl(url);
    }
  }, [cities, currentCityId]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: any }) => {
      const cityId = viewableItems[0].key;
      dispatch(appActions.setCurrentCityId(cityId));
    },
    [dispatch],
  );

  const viewabilityConfigCallbackPairs = useRef<ViewabilityConfigCallbackPairs>(
    // @ts-ignore
    [{ onViewableItemsChanged }],
  );

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
      animation: 'slide_from_right',
    });
  }, [navigation]);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image source={{ uri: imageUrl }} style={styles.image} blurRadius={5} />
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.imageCircle} />
        </View>
      </View>
      <View>
        {cityIds && cityIds.length ? (
          <FlatList
            data={cityIds}
            style={styles.cityDisplay}
            renderItem={info => <CityWeather cityId={info.item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item}
            pagingEnabled
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
          />
        ) : (
          <View style={styles.cityDisplay}>
            <NoCity />
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  header: {
    height: headerHeight,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1,
  },
  imageContainer: {
    position: 'absolute',
    borderRadius: 50,
    bottom: -50,
    left: Dimensions.get('window').width / 2 - 50,
    shadowColor: 'grey',
    shadowOffset: {
      width: -4,
      height: 20,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  imageCircle: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  cityDisplay: {
    height: bodyHeight,
  },
});
