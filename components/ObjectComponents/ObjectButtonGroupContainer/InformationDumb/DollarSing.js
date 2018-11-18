import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

const styled = StyleSheet.create({
  titleFont: {
    fontSize: 15,
    color: 'rgb(156, 155, 156)',
  },
  dollarCont: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
});

const DollarSign = ({price, title}) => (
  <View style={styled.dollarCont}>
    <Text style={styled.titleFont}>
      {title}
    </Text>
    <Image
      source={price > 0 ? require('../../../../imgs/dollars.png') : require('../../../../imgs/dollars-disable.png')}
      style={styled.imageStyle}
    />
    <Image
      source={price > 1 ? require('../../../../imgs/dollars.png') : require('../../../../imgs/dollars-disable.png')}
      style={styled.imageStyle}
    />
    <Image
      source={price > 2 ? require('../../../../imgs/dollars.png') : require('../../../../imgs/dollars-disable.png')}
      style={styled.imageStyle}
    />
    <Image
      source={price > 3 ? require('../../../../imgs/dollars.png') : require('../../../../imgs/dollars-disable.png')}
      style={styled.imageStyle}
    />
  </View>
);


export default DollarSign;
