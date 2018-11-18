import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Rating } from 'react-native-ratings';
let workingNowImg = 'http://www.myiconfinder.com/uploads/iconsets/256-256-d24fd0303074bded268334939fdc34bf.png';
let notWorkingNowImg = 'http://www.myiconfinder.com/uploads/iconsets/256-256-d24fd0303074bded268334939fdc34bf.png';
const ListItemReview = ({isWorking, imgStyle, containerStyle}) => (
  <View style={containerStyle}>
    <Image
      style={imgStyle}
      source={isWorking ? require('../../../imgs/sat-radi.png') : require('../../../imgs/sat-neradi.png') } />
  </View>
);

export default ListItemReview;
