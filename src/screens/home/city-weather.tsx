import React, { FC } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { appSelectors } from '../../redux/slices/app.slice';
import WeatherForecast from './weather-forecast';
import WeatherToday from './weather-today';

const bodyHeight = Dimensions.get('window').height * 0.8;

type Props = {
  cityId: string;
};

const CityWeather: FC<Props> = ({ cityId }) => {
  const city = useAppSelector(appSelectors.cityById(cityId));

  return (
    <View style={styles.root}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city.name}</Text>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          horizontal={true}
          snapToInterval={Dimensions.get('screen').width}
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}>
          <WeatherToday cityId={cityId} />
          <WeatherForecast cityId={cityId} />
        </ScrollView>
      </View>
    </View>
  );
};

export default CityWeather;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    height: bodyHeight,
  },
  city: {
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});
