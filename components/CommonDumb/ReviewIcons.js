import React from 'react';
import {
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating';

const arr = [0, 1, 2, 3, 4];

const ReviewIcons = ({avg, count, imgStyle, contStyle, ...args}) => (
  <View
    style={[
      {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
      }, contStyle]}
  >
    <StarRating 
      disabled={true}
      emptyStar={require('../../imgs/ratingEmpty.png')}
      fullStar={require('../../imgs/ratingFull.png')}
      halfStar={require('../../imgs/ratingHalf.png')}
      iconSet={'Ionicons'}
      maxStars={5}
      starSize={18}
      rating={parseFloat(avg)}
    />
  </View>
);
export default ReviewIcons;