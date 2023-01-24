import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NoCity = () => {
  return (
    <View style={styles.root}>
      <Text>No cities has been selected.</Text>
      <Text>Please search and select the city.</Text>
    </View>
  );
};

export default NoCity;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});
