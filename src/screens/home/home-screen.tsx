import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Screens } from '../../navigator/enums';
import { RootStackParamList } from '../../navigator/types';

const headerHeight = Dimensions.get('window').height * 0.2;
const bodyHeight = Dimensions.get('window').height * 0.8;

type Props = NativeStackScreenProps<RootStackParamList, Screens.Home>;

const HomeScreen = ({ navigation }: Props) => {
  const cities = [
    'New York',
    'Budapast',
    'Florida',
    'Miami',
    'Test 1',
    'Test 2',
  ];

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
  }, []);

  return (
    <View>
      <View style={styles.header}></View>
      <View>
        <FlatList
          data={cities}
          style={styles.cityDisplay}
          renderItem={info => (
            <View style={styles.cityDisplay}>
              <Text>{info.item + info.index}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item}
          snapToInterval={bodyHeight}
          snapToAlignment="start"
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
