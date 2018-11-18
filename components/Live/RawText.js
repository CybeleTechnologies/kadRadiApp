import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import TextFont from 'TextFont';

const textForNotice =
`Treba vam pomoć od ljudi koji žive ili su
posetili mesto u kome se nalazite,
postavite im pitanje i ulepšajte svoje putovanje!`;

const RawText = ({hideRaw}) => (
  <View
    style={{
      padding: 0,
      margin: 0,
      height: responsiveHeight(17.5),
      justifyContent: 'center',
    }}
  >
    
    <View>
      <TextFont></TextFont>
    </View>
    <View
      style={{
        backgroundColor: '#f3f3f2',
        height: responsiveHeight(6.5),
        // marginTop: -13,
        // paddingLeft: 5,
        borderBottomColor: '#c9c8c8',
        borderBottomWidth: 0.8,
        flexDirection: 'row',
      }}
    >
      <TextFont
        semiBold
        style={{
          fontSize: responsiveFontSize(2),
          color: '#666',
          width: responsiveWidth(50),
        }}
      >
        Treba Vam pomoć
      </TextFont>
      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          paddingRight: 10,
          justifyContent: 'flex-end',
          width: responsiveWidth(50),
        }}
        onPress={() => hideRaw()}
      >
        <TextFont
          style={{
          }}
        >
          X
        </TextFont>
      </TouchableOpacity>
    </View>
    <View
      style={{
        height: responsiveHeight(9),
        paddingLeft: 5,
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <TextFont></TextFont>
    
      <TextFont
        style={{
          color: '#666',
          fontSize: responsiveFontSize(1.6),
          textAlignVertical: 'center',
        }}
      >
        {textForNotice}
      </TextFont>
    </View>
  </View>
);

export default RawText;

