import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const ImageForNotify = ({src, styles}) => (
  <Image
    source={{ uri: src }}
    style={{
      width: 50,
      height: 50,
    }}
  >
    <Image
      source={require('../../imgs/scope-white.png')}
      resizeMode={'contain'}
      style={styles}
    />
  </Image>
);
export default ImageForNotify;