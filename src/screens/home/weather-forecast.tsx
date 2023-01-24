import moment from 'moment';
import React, { FC } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { appSelectors } from '../../redux/slices/app.slice';

type Props = {
  cityId: string;
};

const WeatherForecast: FC<Props> = ({ cityId }) => {
  const forecasts = useAppSelector(
    appSelectors.fiveDayForecastsByCityId(cityId),
  );

  return (
    <View style={styles.root}>
      {forecasts?.map((forecast, index) => {
        const date = moment(new Date(forecast.date));
        return (
          <View key={index} style={styles.card}>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`,
                width: 60,
                height: 60,
              }}
            />
            <View style={styles.date}>
              <Text style={styles.dateWeekday}>{date.format('ddd')}</Text>
              <Text style={styles.dateDayMonth}>{date.format('DD MMM')}</Text>
            </View>
            <View>
              <Text>{`${forecast.tempMin?.toFixed(0)}°`}</Text>
              <Text>{`${forecast.tempMax?.toFixed(0)}°`}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default WeatherForecast;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: 60,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  date: {
    flex: 0.4,
  },
  dateWeekday: {
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 16,
  },
  dateDayMonth: {
    textTransform: 'uppercase',
    fontSize: 16,
  },
});
