import React from 'react';
import {View, Text} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ListItemSub = ({ categoryName, locations }) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <Text
        style={{
          fontSize: 8,
          textAlignVertical: 'center',
          fontFamily: 'OpenSans-Regular',
        }}
      >
        {categoryName}, {locations.address}, {locations.city}
      </Text>
      <Text
        style={{
          fontSize: 10,
          textAlignVertical: 'center',
          fontFamily: 'OpenSans-Regular',
        }}
      >
        {categoryName}
      </Text>
    </View>
  );
};


export default ListItemSub;
