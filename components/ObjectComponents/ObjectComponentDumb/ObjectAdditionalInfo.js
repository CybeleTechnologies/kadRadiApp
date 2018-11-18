import React from 'react';
import {View, Text} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const ObjectAdditionalInfo = ({additionalInfos, fav, checkIn, count}) => (
  <View style={{width: responsiveWidth(60), flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingBottom: 5, borderTopColor: '#e6e6e6', borderTopWidth: 0.55, paddingTop: 7}}>
    <Text
      style={{
        fontSize: 12, 
        marginLeft: 3,
        color: '#666',
        fontFamily: 'OpenSans-Light',
        textAlignVertical: 'center',
      }}
    >
      {count} Ocena 
    </Text>
    <Text 
      style={{
        fontSize: 12, 
        marginLeft: 3,
        color: '#666',
        fontFamily: 'OpenSans-Light',
        textAlignVertical: 'center',
      }}
    >
      {fav} Favorit
    </Text>
    <Text 
      style={{
        fontSize: 12, 
        marginLeft: 3,
        color: '#666',
        fontFamily: 'OpenSans-Light',
        textAlignVertical: 'center',
      }}
    >
      {checkIn} je bilo ovde
    </Text>
  </View>
)
export default ObjectAdditionalInfo;
