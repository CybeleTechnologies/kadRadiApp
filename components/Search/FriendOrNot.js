import React from 'react';
import {
  View,
  Image,
} from 'react-native';
const FriendOrNot = ({isFriend, imgStyle, containerStyle, friendRequest}) => (
  <View style={containerStyle}>
    {
      isFriend?
        <Image 
          style={imgStyle}
          source={require('../../imgs/prijateljdodat.png')}
        />
      :
        <Image
          style={imgStyle}
          source={friendRequest == 0 ? require('../../imgs/dodajprijatelja.png') : friendRequest == 1 ? require('../../imgs/cekanjeprijatelja.png') : require('../../imgs/cekanjeprijatelja.png')} 
        />
    }
  </View>
);

export default FriendOrNot;