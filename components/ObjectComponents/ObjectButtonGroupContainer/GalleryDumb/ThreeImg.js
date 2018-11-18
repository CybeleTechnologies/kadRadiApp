import React from 'react';
import {
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class ThreeImg extends React.Component {
  render(){
    return(
    <View style={{flexDirection: 'row'}}> 
        <View style={{flexDirection: 'column'}}>
          <TouchableHighlight 
            onPress={() => {
             this.props.myFunction(true,this.props.imgs[0].fileUrl,0)
            }}>
            <Image
              style={{width: responsiveWidth(65.6), height: responsiveHeight(40.5), margin: responsiveWidth(0.5)}}
              source={{uri: this.props.imgs[0].fileUrl}} />
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'column'}}>
            <TouchableHighlight
              onPress={() => {
                this.props.myFunction(true,this.props.imgs[1].fileUrl,1)
              }}>
              <Image
                style={{width: responsiveWidth(32.3), height: responsiveHeight(20), margin: responsiveWidth(0.5)}}
                source={{uri: this.props.imgs[1].fileUrl}} />
            </TouchableHighlight>
            <TouchableHighlight 
              onPress={() => {
                this.props.myFunction(true,this.props.imgs[2].fileUrl,2)
              }}>
              <Image
                style={{width: responsiveWidth(32.3), height: responsiveHeight(20), margin: responsiveWidth(0.5)}}
                source={{uri: this.props.imgs[2].fileUrl}} />  
            </TouchableHighlight>
        </View>
      </View> 
    )
  }
}