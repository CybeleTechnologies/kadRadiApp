import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const IconItem = ({imageUrl, iconText, clickProp}) => (
  <TouchableOpacity
    onPress={() => clickProp ? clickProp() : console.log("NEMAMO AKCIJU")}
    style={{
      width: responsiveWidth(25),
      height: responsiveWidth(20),
    }}
  >
    <View 
      style={{
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(25),
        height: responsiveWidth(20),
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          alignSelf: 'center',
        }}
        source={imageUrl}
      />
      <Text
        style={{
          paddingTop: 3,
          fontSize: responsiveFontSize(1.4),
          fontFamily: 'OpenSans-Regular',
        }}
      >
        {iconText}
      </Text>
    </View>
  </TouchableOpacity>
);

export default IconItem;
