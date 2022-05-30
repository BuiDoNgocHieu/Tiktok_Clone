import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../../configs/styles';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

const BACKGROUND_COLOR = COLOR.LIGHT_GRAY;
const BACKGROUND_STROKE_COLOR = COLOR.setOpacity(COLOR.DANGER, 0.6);
const STROKE_COLOR = COLOR.DANGER;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
  widthButton = 120,
  second = 3000,
  camera,
  setPathVideo,
}) => {
  const SIZE_MORE = 15;
  // circle radius
  const R = widthButton / 2 - SIZE_MORE;

  const CIRCLE_LENGTH = 2 * Math.PI * R;

  const [isRecord, setIsRecord] = useState(true);

  const progress = useSharedValue(0);
  const borderRadiusButtonRecord = useSharedValue(50);
  const widthButtonRecord = useSharedValue(widthButton - 40);

  const animatedProps = useAnimatedProps(() => ({
    //   2 * Math.PI * (R + 10) is 2PI*R
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const styleAnimated = useAnimatedStyle(() => {
    const timer = 200;
    const borderRadius = withTiming(borderRadiusButtonRecord.value, {
      duration: timer,
      easing: Easing.linear,
    });
    const width = withTiming(widthButtonRecord.value, {
      duration: timer,
      easing: Easing.linear,
    });
    return {
      borderRadius,
      width,
      height: width,
    };
  });

  const startRecording = async () => {
    const { uri, codec = 'mp4' } = await camera.current.recordAsync();
    if (uri) {
      console.log(uri);
      setPathVideo(uri);
    }
  };

  const stopRecording = () => {
    camera.current.stopRecording();
  };

  const updateState = () => {
    setIsRecord(true);
    stopRecording();
  };

  const handleClick = () => {
    if (isRecord) {
      progress.value = withTiming(
        1,
        {
          duration: (1 - progress.value) * second,
          easing: Easing.linear,
        },
        isFinished => {
          if (isFinished) {
            runOnJS(updateState)();
            progress.value = 0;
            borderRadiusButtonRecord.value = 50;
            widthButtonRecord.value = widthButton - 40;
          }
        },
      );

      borderRadiusButtonRecord.value = 10;
      widthButtonRecord.value = widthButton - 80;
      startRecording();
    } else {
      cancelAnimation(progress);
      borderRadiusButtonRecord.value = 50;
      widthButtonRecord.value = widthButton - 40;
      stopRecording();
    }
    setIsRecord(!isRecord);
  };

  const styles = StyleSheet.create({
    container: {
      width: widthButton,
      height: widthButton,
    },
    containerButton: {
      position: 'absolute',
      width: widthButton,
      height: widthButton,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: COLOR.DANGER,

      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Svg style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx={widthButton / 2}
          cy={widthButton / 2}
          r={R}
          strokeWidth={6}
          stroke={isRecord ? BACKGROUND_STROKE_COLOR : BACKGROUND_COLOR}
          fill={BACKGROUND_COLOR}
        />
        <AnimatedCircle
          cx={widthButton / 2}
          cy={widthButton / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={6}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={styles.containerButton}>
        <TouchableOpacity activeOpacity={1} onPress={handleClick}>
          <Animated.View style={[styles.button, styleAnimated]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CircularProgress;
