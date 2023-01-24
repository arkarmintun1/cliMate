import React, { FC, useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { appSelectors } from '../../redux/slices/app.slice';

type Props = {
  cityId: string;
  index: number;
};

const CityWeather: FC<Props> = ({ cityId, index }) => {
  const weather = useAppSelector(appSelectors.todayForecastByCityId(cityId));
  const city = useAppSelector(appSelectors.cityById(cityId));
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('screen').width),
  ).current;

  useEffect(() => {
    const slideIn = () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: 100 * index,
        useNativeDriver: false,
      }).start();
    };

    slideIn();
  }, [index, slideAnim]);

  return (
    <Animated.View style={{ left: slideAnim }}>
      <View style={styles.root}>
        <Text style={styles.temp}>{`${weather?.temp?.toFixed(0)}°`}</Text>
        <View style={styles.cityStatus}>
          <Text style={styles.city}>{city.name}</Text>
          <Text style={styles.status}>{weather?.status}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather?.icon}@2x.png`,
              width: 45,
              height: 45,
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default CityWeather;

const styles = StyleSheet.create({
  root: {
    margin: 8,
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temp: {
    fontSize: 50,
    color: 'grey',
  },
  cityStatus: {
    textAlign: 'left',
    flex: 1,
    paddingLeft: 20,
  },
  city: {
    fontWeight: '500',
    fontSize: 16,
  },
  status: {
    paddingTop: 2,
    textTransform: 'capitalize',
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 23,
    shadowColor: 'lightblue',
    shadowOffset: {
      width: -4,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
});
