import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import StarRating from 'react-native-star-rating';
const AddReviewHead = ({avgRating, ratingCount}) => {
  return (
    <View style={{width: '100%', height: responsiveHeight(14), justifyContent: 'center', alignItems: 'center', borderBottomColor: '#e0e0e0', borderBottomWidth: 1}}>
      <View style={{width: '80%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        <View style={{ flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
          <StarRating
            disabled={true}
            emptyStar={require('../../imgs/ratingEmpty.png')}
            fullStar={require('../../imgs/ratingFull.png')}
            halfStar={require('../../imgs/ratingHalf.png')}
            iconSet={'Ionicons'}
            maxStars={5}
            starSize={15}
            rating={avgRating}
          />
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginRight: 10,}}>
          <Image 
            style={{width: 70, height: 70, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}        
            source={require('../../imgs/ikonica-ocena.png')}>
            <Text style={{fontSize: 30, fontWeight: 'bold', color: '#fff', textAlignVertical: 'center'}}>{avgRating}</Text>
          </Image>
        </View>
        <View style={{ flexDirection: 'column',}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fda14c'}}> {ratingCount} utisaka</Text>
          <View style={{ flexDirection: 'row', width: '100%'}} />
        </View>  
      </View>
    </View>
  )
}
export default AddReviewHead;