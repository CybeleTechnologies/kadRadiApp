import React from 'react';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native';

export default class Buttons extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight
          style={{backgroundColor: 'red', borderWidth: 1, borderRadius: 5, borderColor: 'red',margin: responsiveWidth(0.5)}}
          onPress={()=> {
            this.props.setView('all');
          }}
          >
          <Text style={{color: 'white', fontSize: 16}}>Sve slike ({this.props.allImg.length})</Text>
        </TouchableHighlight> 
        <TouchableHighlight
          style={{backgroundColor: 'red', borderWidth: 1, borderRadius: 5, borderColor: 'red',margin: responsiveWidth(0.5)}}
          onPress={()=> {
            this.props.setView('eksterijer');
          }}
          >
          <Text style={{color: 'white', fontSize: 16}}>Eksterijer ({this.props.images.exteriorImage.length})</Text>
        </TouchableHighlight> 
        <TouchableHighlight
          style={{backgroundColor: 'red', borderWidth: 1, borderRadius: 5, borderColor: 'red',margin: responsiveWidth(0.5)}}
          onPress={()=> {
            this.props.setView('enterijer');
          }}
          >
          <Text style={{color: 'white', fontSize: 16}}>Enterijer ({this.props.images.interiorImage.length})</Text>
        </TouchableHighlight> 
        <TouchableHighlight
          style={{backgroundColor: 'red', borderWidth: 1, borderRadius: 5, borderColor: 'red',margin: responsiveWidth(0.5)}}
          onPress={()=> {
            this.props.setView('food');
          }}
          >
          <Text style={{color: 'white', fontSize: 16}}>Hrana ({this.props.images.foodImage.length})</Text>
        </TouchableHighlight> 
      </View>
    );
  }
}