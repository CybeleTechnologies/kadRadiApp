import React from 'react';
import { View, Text } from 'react-native';
import AddReviewRating from './AddReviewRating';

const AddReviewTitle = ({objectCl, priceRatingChange}) => (
  <View style={{width: '100%', backgroundColor: '#fff', justifyContent: 'flex-start',}}>
    <View style={{paddingLeft: 10}}>
      <Text style={{fontSize: 21, fontWeight: 'bold'}}>{objectCl.name}</Text>
    </View>
    <View style={{paddingLeft: 7}}>
      <AddReviewRating
        containerStyle={{justifyContent: 'flex-start', alignItems: 'flex-start'}} 
        starSize={25} 
        onStarRatingPress={priceRatingChange} 
        starsDefault={objectCl.avgRating} 
        disabled
      />
    </View>
  </View>
);

export default AddReviewTitle;