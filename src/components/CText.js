import { Text } from 'react-native';
import React from 'react';
import { COLOR, TEXT } from '../configs/styles';

const CText = ({
  children,
  size,
  color = COLOR.BLACK,
  text = TEXT.REGULAR,
  textAlign = 'left',
  style = {},
  numberOfLines = null,
  onPress,
}) => {
  const fontSize = size ? { fontSize: size } : {};
  const textStyles = {
    color,
    textAlign,
    ...text,
    ...fontSize,
    ...style,
  };
  return (
    <Text
      style={[textStyles, fontSize]}
      numberOfLines={numberOfLines}
      onPress={onPress}>
      {children}
    </Text>
  );
};

export default CText;
