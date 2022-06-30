import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { BORDER, COLOR, SPACING } from '../../configs/styles';
import { HEIGHT } from '../../configs/constant';

import { Container, ListView } from '..';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const BottomSheet = React.forwardRef(
  ({ HeaderComponent, FooterComponent, children }, ref) => {
    const [heightLayout, setHeightLayout] = useState(0);

    const translateY = useSharedValue(0);
    const active = useSharedValue(false);
    const context = useSharedValue({ y: 0 });

    const scrollTo = useCallback(destination => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    const heightLayoutCurrent = useCallback(() => {
      return heightLayout;
    }, [heightLayout]);

    useImperativeHandle(
      ref,
      () => ({ scrollTo, isActive, heightLayoutCurrent }),
      [scrollTo, isActive, heightLayoutCurrent],
    );

    const gesture = Gesture.Pan()
      .onStart(e => {
        context.value = { y: translateY.value };
      })
      .onUpdate(e => {
        translateY.value = e.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, -heightLayout);
      })
      .onEnd(() => {
        if (translateY.value > -heightLayout + 100) {
          scrollTo(0);
        } else {
          scrollTo(-heightLayout);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    }, []);

    const rBottomSheetContainerStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          translateY.value,
          [-heightLayout, 0],
          ['#00000060', COLOR.TRANSPARENT],
        ),
        zIndex: interpolate(translateY.value, [-heightLayout, 0], [100, -1]),
      };
    }, []);

    const getHeightLayout = useCallback(e => {
      const { height } = e.nativeEvent.layout;
      setHeightLayout(height);
    }, []);

    return (
      <Animated.View style={[styles.container, rBottomSheetContainerStyle]}>
        <Text>adadadad</Text>
        <Pressable onPress={() => scrollTo(0)}>
          <Container width={'100%'} height={'100%'} />
        </Pressable>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View onLayout={getHeightLayout}>
            {HeaderComponent ? (
              <GestureDetector gesture={gesture}>
                {HeaderComponent}
              </GestureDetector>
            ) : (
              <></>
            )}
            {children}
            {FooterComponent}
          </View>
        </Animated.View>
      </Animated.View>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bottomSheetContainer: {
    backgroundColor: COLOR.WHITE,
    borderTopLeftRadius: BORDER.MEDIUM,
    borderTopRightRadius: BORDER.MEDIUM,

    position: 'absolute',
    top: HEIGHT,
    left: 0,
    right: 0,
  },
  inputComment: {
    flexGrow: 1,
    paddingLeft: SPACING.S2,

    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    backgroundColor: COLOR.TRANSPARENT,
  },
});
