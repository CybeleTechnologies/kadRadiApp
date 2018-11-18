import React from 'react';
import {
  Image,
} from 'react-native';
const ImageChat = ({src, styles}) => (
  <Image
    source={{ uri: src }}
    style={styles}
    resizeMode={'center'}
  >
    <Image
      source={require('../../imgs/red-scope.png')}
      resizeMode={'contain'}
      style={styles}
    />
  </Image>
);
export default ImageChat;