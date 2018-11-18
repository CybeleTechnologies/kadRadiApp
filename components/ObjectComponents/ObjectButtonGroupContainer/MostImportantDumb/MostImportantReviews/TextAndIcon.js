import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  profIco: {
    width: 14,
    height: 11,
  },
  numbers: {
    color: '#ff0000', 
    paddingLeft: 1,
    fontSize: 11,
  },
});

const TextAndIcon = ({
  imageUrl,
  numbers,
  containerStyle,
  imageStyle,
  numbersStyle,
}) => (
  <View style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }, containerStyle]}>
    <Image
      style={[styles.profIco, imageStyle]} 
      source={imageUrl} 
    />
    {
      typeof numbers !== 'undefined' ?
        <Text
          style={[
            styles.numbers,
            numbersStyle,
          ]}
        >
          {numbers}
        </Text> : null
    }
  </View>
);

export default TextAndIcon;
