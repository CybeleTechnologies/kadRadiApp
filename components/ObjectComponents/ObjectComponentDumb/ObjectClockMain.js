import React from 'react';
import {View, Image} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const MainClock = ({ isWorking, ...args = {} }) => {
  return (
    <View style={[{width: responsiveWidth(100), flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}, args.styleContainer]}>
      <Image
        style={[{width: 60, height: 60,}, args.styleImage]}
        source={isWorking ? require('../../../imgs/sat-radi.png') : require('../../../imgs/sat-neradi.png')} />
    </View>
  )
}

export default MainClock;
