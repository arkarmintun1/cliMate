import _ from 'lodash';
import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { City } from '../../models/city';
import { useAppDispatch } from '../../redux/hooks';
import { appActions } from '../../redux/slices/app.slice';

const FindCityItem: FC<City> = (city: City) => {
  const dispatch = useAppDispatch();

  const addCity = async () => {
    dispatch(appActions.addCity(city));
  };

  return (
    <View style={styles.root}>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {city.name}
        </Text>
        <Text style={styles.location}>
          {`lat: ${_.round(city.lat, 2)}, long: ${_.round(city.lon, 2)}`}
        </Text>
        <Text>{`${city.state}, ${city.country}`}</Text>
      </View>
      <Button onPress={addCity} title="Select" />
    </View>
  );
};

export default FindCityItem;

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    display: 'flex',
  },
  name: {
    fontSize: 20,
  },
  location: {
    paddingVertical: 8,
  },
});
