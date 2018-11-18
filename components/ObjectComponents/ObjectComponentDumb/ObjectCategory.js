import React from 'react';
import {View, Text} from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
const ObjectCategory = ({category}) => (
  <View style={{width: responsiveWidth(60), paddingBottom: 5, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', borderBottomColor: '#e6e6e6', borderBottomWidth: 0.55, marginBottom: 1}}>
    <Text 
      style={{
        fontSize: 13,
        color: "#1a1a1a",
        fontFamily: 'OpenSans-Regular',
      }}
    >
      {category}
    </Text>
  </View>
);
export default ObjectCategory;
