import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { appSelectors } from '../../redux/slices/app.slice';
import Icon from 'react-native-vector-icons/Feather';
import { getTemperatureUnit, getWindSpeedUnit } from '../../utils/unit';

type Props = {
  cityId: string;
};

const WeatherToday: FC<Props> = ({ cityId }) => {
  const weather = useAppSelector(appSelectors.weather(cityId));
  const unit = useAppSelector(appSelectors.unit);
  const today = weather[unit][0];

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${today.icon}@2x.png`,
            width: 100,
            height: 100,
          }}
        />
        <View style={styles.tempContainer}>
          <Text style={styles.temp}>{today.temp}</Text>
          <Text style={styles.tempUnit}>{getTemperatureUnit(unit)}</Text>
        </View>
        <Text style={styles.status}>{today.status}</Text>
        <View style={styles.tempVariation}>
          <Text style={styles.tempMin}>{`${today.tempMin}° `}</Text>
          <Text>{`${today.tempMax}°`}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.info}>
          <Icon name="umbrella" style={styles.infoIcon} />
          <Text style={styles.infoText}>{`${today.precipitation}%`}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="droplet" style={styles.infoIcon} />
          <Text style={styles.infoText}>{`${today.humidity}%`}</Text>
        </View>
        <View style={styles.info}>
          <Icon name="wind" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            {`${today.windSpeed} ${getWindSpeedUnit(unit)}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WeatherToday;

const styles = StyleSheet.create({
  root: {
    width: Dimensions.get('screen').width,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  temp: {
    fontSize: 70,
    fontWeight: '200',
  },
  tempUnit: {
    fontSize: 20,
    paddingTop: 10,
  },
  status: {
    textTransform: 'capitalize',
    marginTop: 10,
    fontSize: 18,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    marginBottom: 60,
  },
  info: {
    display: 'flex',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 25,
    color: 'grey',
  },
  infoText: {
    fontSize: 18,
    marginTop: 8,
    color: 'black',
  },
  tempVariation: {
    display: 'flex',
    flexDirection: 'row',
  },
  tempMin: {
    fontWeight: 'bold',
  },
});
