import {
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import React from 'react';
import ThreeImg from './ThreeImg';


export default class DifferentImages extends React.Component {
  render() {
    if(this.props.maping.length == 3)
    {
      return (
        <ThreeImg imgs={this.props.maping} myFunction={this.props.imageSetState}/>
      );
    }
    if(this.props.maping.length < 3)
    {
      return(
        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
        {
          this.props.maping.map((item,key) => (
            <View key={key} style={{flexDirection: 'column',}}>
              <TouchableHighlight
               onPress={()=> {
                this.props.imageSetState(true, item.fileUrl, key)
               }}>
                <Image
                  style={{width: responsiveWidth(32.3), height: responsiveHeight(20),margin: responsiveWidth(0.5)}}
                  source={{uri: item.fileUrl}} />
              </TouchableHighlight>
            </View>
          ))
        }
        </View>
      );
    }
    if(this.props.maping.length > 3) {
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
        <ThreeImg imgs={this.props.maping.slice(0,3)} myFunction={this.props.imageSetState} />
        {
          this.props.maping.slice(3, this.props.maping.length).map((item,key) => (
            <View key={key} style={{flexDirection: 'column',}}>
              <TouchableHighlight
               onPress={()=> {
                 this.props.imageSetState(true,item.fileUrl, key + 3)
               }}>
                <Image
                  style={{width: responsiveWidth(32.3), height: responsiveHeight(20),margin: responsiveWidth(0.5)}}
                  source={{uri: item.fileUrl}} />
              </TouchableHighlight>
            </View>
          ))
        }
      </View>
      );
    }
    if(this.props.maping.length == 0) {
      return(
        <View>
          <Text>
            Nema slika za ovaj objekat
          </Text>
        </View>
      );
    }
  }
}