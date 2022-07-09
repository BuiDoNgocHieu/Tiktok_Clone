import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { COLOR, SPACING } from '../../../configs/styles';
import IteamSearchHashTag from '../../../components/item/IteamSearchHashTag';
import ListView from '../../../components/ListView';
import { useIsFocused } from '@react-navigation/native';

const Hashtag = () => {
  const data = [
    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '4' },
    { key: '5' },
    { key: '6' },
    { key: '7' },
    { key: '8' },
    { key: '9' },
    { key: '10' },
    { key: '11' },
    { key: '6' },
    { key: '7' },
    { key: '8' },
    { key: '9' },
    { key: '10' },
  ];

  const isFocusTab = useIsFocused();

  useEffect(() => {
    console.log('hashtag', isFocusTab);
  }, [isFocusTab]);
  return (
    <View style={styles.container}>
      <ListView
        data={data}
        renderItem={item => <IteamSearchHashTag item={item} />}
      />
    </View>
  );
};

export default Hashtag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    paddingTop: SPACING.S2,
  },
});
