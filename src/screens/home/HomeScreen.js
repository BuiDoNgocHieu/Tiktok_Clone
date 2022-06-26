import { FlatList, View, StatusBar } from 'react-native';
import React, { useRef } from 'react';
import VideoItem from './components/VideoItem';
import { HEIGHT } from '../../configs/constant';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const HomeScreen = () => {
  const bottomHeight = useBottomTabBarHeight();

  const HEIGHT_ITEM = HEIGHT - bottomHeight - StatusBar.currentHeight;
  const cellRefs = useRef({});

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

  const onViewableItemsChanged = useRef(props => {
    const changed = props.changed;
    changed.forEach(item => {
      const cell = cellRefs.current[item.key];
      if (cell) {
        if (item.isViewable) {
          cell.playVideo();
        } else {
          cell.pauseVideo();
        }
      }
    });
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  return (
    <View>
      <FlatList
        data={data}
        pagingEnabled
        renderItem={({ index }) => {
          return (
            <VideoItem
              ref={ref => (cellRefs.current[index] = ref)}
              index={index}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
        windowSize={5}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_data, index) => ({
          length: HEIGHT_ITEM,
          offset: HEIGHT_ITEM * index,
          index,
        })}
      />
    </View>
  );
};

export default HomeScreen;
