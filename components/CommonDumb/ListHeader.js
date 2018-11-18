import React from 'react';
import { View } from 'react-native';
import TextFont from 'TextFont';
import { responsiveHeight } from 'react-native-responsive-dimensions';
const ListHeader = props => (
  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
    <View style={{flex: 1, width: 190, justifyContent: 'center', alignItems: 'flex-start', height: responsiveHeight(6) }}>
      <TextFont
        bold
        style={{
          fontSize: 16, 
          paddingLeft: 15,
          color: '#000',
          textAlignVertical: 'center',
        }}
      >
        {props.textHeader}
      </TextFont>
    </View>
  </View>
);

export default ListHeader;
