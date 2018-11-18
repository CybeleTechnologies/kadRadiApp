import React from 'react';
import {View, Text} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const ObjectWorkingHours = ({workingTimes}) => (
  <View style={{width: responsiveWidth(60), flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignItems: 'center',  borderBottomWidth: 1, borderBottomColor: '#d3d3d3', borderTopWidth: 1, borderTopColor: '#d3d3d3'}}>
    <Text style={{fontWeight: 'bold', fontSize: 18,}}>
      Radno vreme
    </Text>
    <Text style={{fontSize: 13}}>
      Pon-Pet Od 01:00 Do 22:00
    </Text>
    <Text style={{fontSize: 13}}>
      Vikend Od 01:00 Do 22:00
    </Text>
  </View>
)

export default ObjectWorkingHours;
