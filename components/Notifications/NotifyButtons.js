import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const NotifyButtons = ({ show, state }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    }}
  >
    <TouchableHighlight
      onPress={() => show(true, false)}
      style={state.me
      ?
      {
        width: responsiveWidth(50),
        backgroundColor: '#f03434',
        height: responsiveHeight(7),
        borderColor: '#f03434',
        borderWidth: 1,
      }
      :
      {
        width: responsiveWidth(50),
        backgroundColor: 'white',
        height: responsiveHeight(7),
        borderColor: '#f03434',
        borderWidth: 1,
      }}
    >
      <Text style={
        state.me
        ?
        {
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 18,
          color: 'white',
          paddingTop: responsiveHeight(1.5),
        }
        :
        {
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 18,
          color: '#f03434',
          paddingTop: responsiveHeight(1.5),
        }
      }
      >Ja
      </Text>
    </TouchableHighlight>
    <TouchableHighlight
      onPress={() => show(false, true)}
      style={state.friends
      ?
      {
        width: responsiveWidth(50),
        backgroundColor: '#f03434',
        height: responsiveHeight(7),
        borderColor: '#f03434',
        borderWidth: 1,
      }
      :
      {
        width: responsiveWidth(50),
        backgroundColor: 'white',
        height: responsiveHeight(7),
        borderColor: '#f03434',
        borderWidth: 1,
      }}
    >
      <Text
        style={
          state.friends
          ?
          {
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 18,
            color: 'white',
            paddingTop: responsiveHeight(1.5),
          }
          :
          {
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 18,
            color: '#f03434',
            paddingTop: responsiveHeight(1.5),
          }
        }
      >Prijatelji
      </Text>
    </TouchableHighlight>
  </View>
);
export default NotifyButtons;
