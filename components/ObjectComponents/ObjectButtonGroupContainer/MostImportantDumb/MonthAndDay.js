import React from 'react';
import {View, Text} from 'react-native';
import TextFont from 'TextFont';

const MonthAndDay = ({month, day}) => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      height: 30,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }}
  >
    <View
      style={{
        padding: 4,
        backgroundColor: '#e2303d',
        flex: 7,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextFont
        style={{
          fontSize: 13,
          color: '#fff',
        }}
      >
        MART
      </TextFont>
    </View>
    <View
      style={{
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 5,
      }}
    >
      <TextFont
        bold
        style={{
          color: '#fff',
          fontSize: 21,
          fontWeight: 'bold',
        }}
      >
        3
      </TextFont>
    </View>
  </View>
);
export default MonthAndDay;