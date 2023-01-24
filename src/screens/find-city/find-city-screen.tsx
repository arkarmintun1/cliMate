import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screens } from '../../navigator/enums';
import { RootStackParamList } from '../../navigator/types';
import { appActions, appSelectors } from '../../redux/slices/app.slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import FindCityItem from './find-city-item';

type Props = NativeStackScreenProps<RootStackParamList, Screens.FindCity>;

const FindCityScreen = ({ navigation }: Props) => {
  const headerHeight = useHeaderHeight();
  const dispatch = useAppDispatch();
  const suggestions = useAppSelector(appSelectors.suggestions);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search && search.length) {
      console.log({ search });
      dispatch(appActions.findCity(search));
    }
  }, [search]);

  return (
    <View style={[styles.root, { marginTop: headerHeight }]}>
      <TextInput
        style={styles.textInput}
        onChangeText={text => setSearch(text)}
      />
      <View style={styles.flatListContainer}>
        <FlatList
          style={styles.flatList}
          data={suggestions}
          renderItem={info => <FindCityItem {...info.item} />}
        />
      </View>
    </View>
  );
};

export default FindCityScreen;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  flatList: {
    height: '100%',
  },
});
