import React from 'react';
import {
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';

const HeaderForSearched = ({headerText}) => (
  <View
    style={{
      backgroundColor: 'rgb(43, 157, 157)',
      height: responsiveHeight(7),
      justifyContent: 'center',
      paddingLeft: 5,
    }}
  >
    <TextFont
      style={{
        color: '#fff',
        fontSize: responsiveFontSize(1.7),
      }}
    >
      {headerText}
    </TextFont>
  </View>
);

export default HeaderForSearched;

