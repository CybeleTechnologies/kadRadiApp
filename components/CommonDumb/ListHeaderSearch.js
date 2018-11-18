import React from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import TextFont from 'TextFont';

const ListHeaderSearch = props => (
  <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
    <View style={{ width: '50%', height: responsiveHeight(6), alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center', }}>
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
    <View style={{
      width: '50%',
      height: responsiveHeight(6),
      alignItems: 'flex-end',
      flexDirection: 'column',
      justifyContent: 'center',
     }}
    >
      {
      props.objectCl.length?
        <TouchableOpacity
          onPress={() => {
            props.viewDropdown();
          }}
        >
          <View
            style={{
              width: '50%',
              justifyContent: 'flex-end',
              flexDirection: 'row',
              alignItems: 'center', 
            }}
          >
            <TextFont
              style={{
                color: 'rgb(43, 157, 157)',
              }}
            >
              Poređaj po
            </TextFont>
            <Image
              source={require('../../imgs/openDropdownSort.png')}
              style={{
                marginTop: 2,
                width: 10,
                height: 10,
              }}
            />
          </View>
        </TouchableOpacity>
      :null
    }
    </View>
  </View>
);

export default ListHeaderSearch;