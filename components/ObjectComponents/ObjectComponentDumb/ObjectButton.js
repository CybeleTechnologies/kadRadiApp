import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { withRouter } from 'react-router-dom';

const ObjectButton = (props) => {
  let indexTrue = props.index == props.current ? true : false;
  return (
    <TouchableOpacity
      onPress={
        () => {
          props.onSelect(props.index)
        }
      }
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text 
          style={{
            fontFamily: 'OpenSans-Bold',
            fontSize: responsiveFontSize(1.8),
            color: indexTrue ? '#019f9f' : '#4d4d4d',
          }}
        >
          {props.itemName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default ObjectButton;
