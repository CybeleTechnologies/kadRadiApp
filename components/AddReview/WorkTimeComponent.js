import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const WorkTimeComponent = props => (
  <View 
    style={{
      width: '45%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
    }}
  >
    <TouchableOpacity 
      disabled={props.showActiveFalse}
      onPress={() => {
        props.workTimeChange(true, 'first')
      }}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={props.showActiveTrue ? require('../../imgs/trueWorkingTime.png') : require('../../imgs/tacno.png')} />
    </TouchableOpacity>
    <TouchableOpacity 
      disabled={props.showActiveTrue}
      onPress={() => {
        props.workTimeChange(false, 'secound')
      }}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={props.showActiveFalse ? require('../../imgs/falseWorkingTime.png') : require('../../imgs/nijetacno.png')} />
    </TouchableOpacity>
  </View>
);

export default WorkTimeComponent;