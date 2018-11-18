import React from 'react';
import Swiper from 'react-native-swiper';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import {
  View,
  Image,
  Dimensions,
} from 'react-native';
const { width } = Dimensions.get('window');



export default class SwiperImage extends React.Component {
  render() {
    if(this.props.view === 'all') {
      return ( 
          <Swiper style={{}} height={240} loop index={this.props.index}>
              {
              this.props.all.map((item,key) => (
              <View key={key} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Image resizeMode='center' style={{width, height: responsiveHeight(80)}} source={{uri: item.fileUrl}} />
              </View>
              ))
              }
          </Swiper>
      );
    }
    if(this.props.view === 'eksterijer') {
      return(
          <Swiper style={{}} height={240} loop index={this.props.index}>
            {
            this.props.ex.map((item,key) => (
              <View key={key} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Image resizeMode='center' style={{width, height: responsiveHeight(80)}} source={{uri: item.fileUrl}} />
              </View>
              ))
            }
          </Swiper>
      );
    }
    if(this.props.view === 'enterijer') {
      return(
          <Swiper style={{}} height={240} loop index={this.props.index}> 
            {
            this.props.in.map((item,key) => (
              <View key={key} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Image resizeMode='center' style={{width, height: responsiveHeight(80)}} source={{uri: item.fileUrl}} />
              </View>
              ))
            }
          </Swiper>
      );
    }
    if(this.props.view === 'food') {
      return (
        <Swiper style={{}} height={240} loop index={this.props.index}>
          {
          this.props.food.map((item,key) => (
            <View key={key} style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Image resizeMode='center' style={{width, height: responsiveHeight(80)}} source={{uri: item.fileUrl}} />
            </View>
            ))
          }
        </Swiper>
      );
    }
  }
}