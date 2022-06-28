import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Container, Icon } from '../../../components';
import { PLAY_ICON_IMG } from '../../../configs/source';
import { TapGestureHandler } from 'react-native-gesture-handler';
import ItemLikeDoubleTap from './ItemLikeDoubleTap';

const PressContainer = ({ isActive, pauseVideo, playVideo }) => {
  const [showIcon, setShowIcon] = useState(false);
  const [listLikeDoubleTap, setListLikeDoubleTap] = useState([]);

  const doubleTapRef = useRef();

  const iconPlayVideoValue = useSharedValue(1);
  const iconPlayVideoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withSpring(iconPlayVideoValue.value, { damping: 50 }) },
      ],
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      iconPlayVideoValue.value = 1;
    }
  }, [isActive, iconPlayVideoValue]);

  const onDoubleTap = useCallback(
    e => {
      const { x, y } = e.nativeEvent;
      setListLikeDoubleTap([...listLikeDoubleTap, { x, y, status: true }]);
    },
    [listLikeDoubleTap],
  );

  const onSingleTap = useCallback(() => {
    if (isActive) {
      pauseVideo();
      setShowIcon(true);
      iconPlayVideoValue.value = 0.3333333333;
    } else {
      playVideo();
      setShowIcon(false);
      cancelAnimation(iconPlayVideoValue);
    }
  }, [isActive, iconPlayVideoValue, pauseVideo, playVideo]);

  return (
    <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
      <TapGestureHandler
        maxDelayMs={150}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={onDoubleTap}>
        <View>
          <Container height="100%" justifyContent="center" alignItems="center">
            {showIcon && (
              <Animated.View style={[styles.iconPlay, iconPlayVideoStyle]}>
                <Icon
                  source={PLAY_ICON_IMG}
                  width={'100%'}
                  height={'100%'}
                  activeOpacity={0.5}
                  onPress={null}
                />
              </Animated.View>
            )}
            {listLikeDoubleTap.map((item, index) => {
              return (
                <ItemLikeDoubleTap key={JSON.stringify(item)} item={item} />
              );
            })}
          </Container>
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
};

export default PressContainer;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlay: {
    width: 120,
    height: 120,
  },
});
