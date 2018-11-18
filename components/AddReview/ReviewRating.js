import React from 'react';
import {View, Text} from 'react-native';
import AddReviewRating from './AddReviewRating';
import WorkTimeComponent from './WorkTimeComponent';

const ReviewRating = props => (
  <View>
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <WorkTimeComponent {...props} />
      <View
        style={{
          width: '60%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: '#fff',
          }}
        >
          Da li je radno vreme tačno?
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddReviewRating 
          starSize={40} 
          onStarRatingPress={props.priceRatingChange} 
          starsDefault={props.ratingPrice}
        />
        <Text
          style={{
            fontSize: 15,
            color: '#fff',
          }}
        >
          Cena
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddReviewRating 
          onStarRatingPress={props.reviewRatingChange} 
          starsDefault={props.ratingReview}
        />
        <Text
          style={{
            fontSize: 15,
            color: '#fff',
          }}
        >
          Dodaj ocenu
        </Text>
      </View>
    </View>
  </View>
);

export default ReviewRating;