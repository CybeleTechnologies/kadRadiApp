import React from 'react';
import { 
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { 
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ReviewIcons from '../../CommonDumb/ReviewIcons';
import TextFont from 'TextFont';

const styled = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: '#019f9f',
  },
  imagePrice: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    marginLeft: 5,
  },
  priceProp: {
    fontSize: 19,
    color: '#fff'
  },
});

const ObjectRating = ({ objectClRating }) => (
  <View style={styled.container}>
    <Text style={styled.price}>
        Ocena: 
    </Text>
    <ReviewIcons avg={objectClRating}/>
    <Image
      source={require('../../../imgs/ikonica-ocena.png')}
      style={styled.imagePrice} 
    >
      <TextFont
        semiBold
        style={styled.priceProp}>
        { objectClRating }
      </TextFont>
    </Image>
    {/* <View style={{flexDirection: 'row', borderBottomColor: '#e6e6e6', borderBottomWidth: 0.55, width: responsiveWidth(60)}}></View> */}
  </View>
);

export default ObjectRating;
