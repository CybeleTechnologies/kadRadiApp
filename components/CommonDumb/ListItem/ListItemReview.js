import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import StarRating from 'react-native-star-rating';
import TextFont from 'TextFont';
const ListItemReview = ({ styleProp, reviewNumber, avg }) => (
  <View style={[{ flexDirection: 'row' }, { ...styleProp }]}>
    <StarRating 
      disabled={true}
      emptyStar={require('../../../imgs/ratingEmpty.png')}
      fullStar={require('../../../imgs/ratingFull.png')}
      halfStar={require('../../../imgs/ratingHalf.png')}
      iconSet={'Ionicons'}
      maxStars={5}
      starSize={15}
      rating={parseFloat(avg)}
    />
    <TextFont
      style={{
        fontSize: 10,
        marginLeft: 3,
        textAlignVertical: 'center',
      }}
    >
      {reviewNumber} Reviews
    </TextFont>
  </View>
);

export default ListItemReview;
