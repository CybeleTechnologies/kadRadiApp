import React from 'react';
import {View, Text} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
const ObjectName = ({name}) => (
  <View 
    style={{
      width: responsiveWidth(100),
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
    }}
  >
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 15,
        paddingBottom: 0,
        color: '#000',
        fontFamily: 'OpenSans-Regular',
      }}
    >
      {name}
    </Text>
  </View>
);
export default ObjectName;
